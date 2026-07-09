package com.landveda.backend.service;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class OtpService {

    private static final SecureRandom RANDOM = new SecureRandom();
    private static final Duration OTP_TTL = Duration.ofMinutes(10);

    private final HttpClient httpClient;
    private final Map<String, OtpEntry> otpStore;
    private final String apiKey;

    public OtpService(@Value("${fast2sms.api.key:}") String apiKey) {
        this.apiKey = apiKey;
        this.httpClient = HttpClient.newHttpClient();
        this.otpStore = new ConcurrentHashMap<>();
    }

    public String generateOtp() {
        return String.valueOf(100000 + RANDOM.nextInt(900000));
    }

    public boolean sendOtp(String mobile) {
        String otp = generateOtp();
        otpStore.put(mobile, new OtpEntry(otp, Instant.now().plus(OTP_TTL)));

        // If API key is not configured or is a placeholder/mock key, run in Mock Mode for local development
        if (!StringUtils.hasText(apiKey) || apiKey.equals("mockFast2SmsKey") || apiKey.contains("yournew")) {
            System.out.println("\n------------------------------------------------");
            System.out.println("⚠️  [FAST2SMS MOCK MODE] API key is not configured.");
            System.out.println("📱  Sent OTP to mobile: " + mobile);
            System.out.println("🔑  Your OTP Code is: " + otp);
            System.out.println("------------------------------------------------\n");
            return true;
        }

        String message = "Your LandVeda login OTP is " + otp + ". Valid for 10 minutes. Do not share with anyone.";
        String url = "https://www.fast2sms.com/dev/bulkV2"
            + "?authorization=" + encode(apiKey)
            + "&route=q"
            + "&message=" + encode(message)
            + "&flash=0"
            + "&numbers=" + encode(mobile);

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .header("cache-control", "no-cache")
            .GET()
            .build();

        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            return response.statusCode() == 200;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return false;
        } catch (IOException e) {
            return false;
        }
    }

    public boolean verifyOtp(String mobile, String otp) {
        OtpEntry storedOtp = otpStore.get(mobile);
        if (storedOtp == null || storedOtp.expiresAt().isBefore(Instant.now())) {
            otpStore.remove(mobile);
            return false;
        }

        if (storedOtp.value().equals(otp)) {
            otpStore.remove(mobile);
            return true;
        }
        return false;
    }

    private String encode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }

    private record OtpEntry(String value, Instant expiresAt) {
    }
}
