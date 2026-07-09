import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const clientAPI = {
  getAll: () => api.get("/clients"),
  register: (data) => api.post("/clients/register", data),
  sendLoginOtp: (mobile) => api.post("/clients/login/otp-send", { mobile }),
  verifyLoginOtp: (mobile, otp) => api.post("/clients/login/otp-verify", { mobile, otp }),
  updateStatus: (id, status) => api.put(`/clients/${id}/status`, { status }),
  updateHandler: (id, handler) =>
    api.put(`/clients/${id}/handler`, { handler }),
  delete: (id) => api.delete(`/clients/${id}`),
};

export const documentAPI = {
  getByClient: (clientId) => api.get(`/documents/client/${clientId}`),
  getDownloadUrl: (id) => api.get(`/documents/${id}/download`),
  upload: (data) => api.post("/documents", data),
  delete: (id) => api.delete(`/documents/${id}`),
};

export const adminAPI = {
  getAll: () => api.get("/admins"),
  login: (username, password) =>
    api.post("/admins/login", { username, password }),
  save: (data) => api.post("/admins", data),
};

export const otpAPI = {
  send: (mobile) => api.post("/otp/send", { mobile }),
  verify: (mobile, otp) => api.post("/otp/verify", { mobile, otp }),
};

export const enquiryAPI = {
  save: (data) => api.post("/enquiries", data),
  getAll: () => api.get("/enquiries"),
  updateStatus: (id, status) => api.put(`/enquiries/${id}/status`, { status }),
  delete: (id) => api.delete(`/enquiries/${id}`),
  getCount: () => api.get("/enquiries/count"),
};

export const chatAPI = {
  send: (messages) => api.post("/chat", { messages }),
};
