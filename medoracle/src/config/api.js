// Centralized API and Backend URL configuration
// In production (Vercel), set VITE_API_BASE_URL=https://<your-render-backend-url>
// In local development, defaults to http://localhost:5000

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

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
