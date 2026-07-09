package com.landveda.backend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    private static final String GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
    private static final String MODEL = "llama-3.3-70b-versatile";
    private static final String SYSTEM_PROMPT = """
        You are LandVeda AI Assistant, a professional property management assistant for LandVeda,
        a PropTech startup based in Bengaluru, Karnataka, India.

        Your role is to answer questions about property management services, explain LandVeda
        services clearly, collect customer name and mobile number for a free consultation, and
        guide customers to contact the LandVeda team.

        LandVeda services include anti-encroachment surveillance, document recovery, property
        registration, building plan sanction, NRI remote property care, agricultural land services,
        buying and selling support, government liaison, property tax services, and a secure digital
        document vault with OTP login.

        Contact details: Phone/WhatsApp +91 87925 78028, alternate +91 99805 34077,
        email niranjanhr79@gmail.com, office No 93/4, Vidhyapeeta Main Road, Kengeri,
        Bengaluru 560060. Working hours are Monday to Saturday, 9 AM to 7 PM.

        Always respond in professional English, keep replies concise, avoid making up information,
        and encourage the customer to contact LandVeda for exact pricing or uncertain details.
        """;

    private final String groqApiKey;
    private final RestTemplate restTemplate;

    public ChatController(@Value("${groq.api.key:}") String groqApiKey) {
        this.groqApiKey = groqApiKey;
        this.restTemplate = new RestTemplate();
    }

    @PostMapping
    public ResponseEntity<?> chat(@RequestBody Map<String, Object> requestBody) {
        if (!StringUtils.hasText(groqApiKey)) {
            return ResponseEntity
                .status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(Map.of("error", "Groq API key is not configured."));
        }

        try {
            Map<String, Object> groqRequest = new HashMap<>();
            groqRequest.put("model", MODEL);
            groqRequest.put("max_tokens", 500);
            groqRequest.put("temperature", 0.7);
            groqRequest.put("messages", buildMessages(requestBody.get("messages")));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(groqApiKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(groqRequest, headers);
            ResponseEntity<Object> response = restTemplate.exchange(
                GROQ_API_URL,
                HttpMethod.POST,
                entity,
                Object.class
            );

            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Chat service failed. Please try again."));
        }
    }

    private List<Map<String, String>> buildMessages(Object messagesObj) {
        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of("role", "system", "content", SYSTEM_PROMPT));

        if (messagesObj instanceof List<?> messageList) {
            for (Object item : messageList) {
                if (item instanceof Map<?, ?> messageMap) {
                    messages.add(Map.of(
                        "role", String.valueOf(messageMap.get("role")),
                        "content", String.valueOf(messageMap.get("content"))
                    ));
                }
            }
        }

        return messages;
    }
}
