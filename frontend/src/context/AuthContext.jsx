import { createContext, useContext, useState } from "react";
import { TEAM_MEMBERS } from "../data/constants";
import { adminAPI, clientAPI, documentAPI } from "../data/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [currentClient, setCurrentClient] = useState(null);

  async function loginAdmin(username, password) {
    try {
      const res = await adminAPI.login(username, password);
      setCurrentAdmin(res.data);
      return { success: true, admin: res.data };
    } catch {
      return { success: false };
    }
  }

  async function sendClientLoginOtp(mobile) {
    try {
      await clientAPI.sendLoginOtp(mobile);
      return { success: true };
    } catch (err) {
      const msg = typeof err.response?.data === "string"
        ? err.response.data
        : err.response?.data?.message || err.response?.data?.error || "Failed to send OTP.";
      return { success: false, message: msg };
    }
  }

  async function verifyClientLoginOtp(mobile, otp) {
    try {
      const res = await clientAPI.verifyLoginOtp(mobile, otp);
      return { success: true, client: res.data };
    } catch (err) {
      const msg = typeof err.response?.data === "string"
        ? err.response.data
        : err.response?.data?.message || err.response?.data?.error || "Invalid or expired OTP.";
      return { success: false, message: msg };
    }
  }

  function completeClientLogin(client) {
    setCurrentClient(client);
  }

  async function registerClient(data) {
    try {
      await clientAPI.register(data);
      return { success: true };
    } catch (err) {
      const msg = typeof err.response?.data === "string"
        ? err.response.data
        : err.response?.data?.message || err.response?.data?.error || "Registration failed.";
      return {
        success: false,
        message: msg,
      };
    }
  }

  async function loadClients() {
    try {
      const res = await clientAPI.getAll();
      return res.data;
    } catch {
      return [];
    }
  }

  async function loadDocs(clientId) {
    try {
      const res = await documentAPI.getByClient(clientId);
      return res.data;
    } catch {
      return [];
    }
  }

  async function uploadDoc(data) {
    try {
      await documentAPI.upload(data);
      return { success: true };
    } catch {
      return { success: false };
    }
  }

  async function deleteDoc(id) {
    try {
      await documentAPI.delete(id);
      return { success: true };
    } catch {
      return { success: false };
    }
  }

  async function updateClientStatus(id, status) {
    try {
      await clientAPI.updateStatus(id, status);
      return { success: true };
    } catch {
      return { success: false };
    }
  }

  async function updateClientHandler(id, handler) {
    try {
      await clientAPI.updateHandler(id, handler);
      return { success: true };
    } catch {
      return { success: false };
    }
  }

  async function deleteClient(id) {
    try {
      await clientAPI.delete(id);
      return { success: true };
    } catch {
      return { success: false };
    }
  }

  function logout() {
    setCurrentAdmin(null);
    setCurrentClient(null);
  }

  return (
    <AuthContext.Provider
      value={{
        currentAdmin,
        setCurrentAdmin,
        currentClient,
        setCurrentClient,
        ADMINS: TEAM_MEMBERS,
        loginAdmin,
        sendClientLoginOtp,
        verifyClientLoginOtp,
        completeClientLogin,
        registerClient,
        loadClients,
        loadDocs,
        uploadDoc,
        deleteDoc,
        updateClientStatus,
        updateClientHandler,
        deleteClient,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
