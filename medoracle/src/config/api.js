// Centralized API and Backend URL configuration
// Automatically connects to Render in production and localhost:5000 in local development

const isProduction =
  import.meta.env.PROD ||
  (typeof window !== "undefined" &&
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1");

const defaultUrl = isProduction
  ? "https://medoracle-backend.onrender.com"
  : "http://localhost:5000";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || defaultUrl;

// Ensure no trailing slash
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

/**
 * Returns full URL for uploaded assets (profile pictures, reports, etc.)
 */
export const getUploadUrl = (filename) => {
  if (!filename) return null;
  if (filename.startsWith("http://") || filename.startsWith("https://")) {
    return filename;
  }
  return `${API_BASE_URL}/uploads/${filename}`;
};

export default API_BASE_URL;
