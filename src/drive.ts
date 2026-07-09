import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut
} from "firebase/auth";
import firebaseConfig from "../firebase-applet-config.json";

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Provider with Drive Scopes requested by user
export const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/drive");
provider.addScope("https://www.googleapis.com/auth/drive.file");

let cachedAccessToken: string | null = null;
let isSigningIn = false;

// Initialize Authentication Listener
export const initAuth = (
  onAuthSuccess: (user: User, token: string) => void,
  onAuthFailure: () => void
) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (cachedAccessToken) {
        onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // Token was cleared or expired, but session is active
        cachedAccessToken = null;
        onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      onAuthFailure();
    }
  });
};

// Google Sign In Popup
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("Failed to retrieve Google Drive access token.");
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error("Firebase Google Sign In Error:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

// Logout handler
export const logoutDrive = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// Retrieves active access token
export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

// 📂 Google Drive API Wrappers (v3)

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime: string;
}

/**
 * List files in Google Drive.
 * Filters to code files or folders, and allows search.
 */
export const listDriveFiles = async (
  token: string,
  searchQuery?: string
): Promise<DriveFile[]> => {
  let q = "trashed = false";
  if (searchQuery && searchQuery.trim() !== "") {
    // Sanitize search query quotes
    const sanitized = searchQuery.replace(/'/g, "\\'");
    q += ` and name contains '${sanitized}'`;
  }

  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    q
  )}&fields=files(id,name,mimeType,size,modifiedTime)&orderBy=modifiedTime desc&pageSize=40`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || "Failed to list Google Drive files.");
  }

  const data = await response.json();
  return data.files || [];
};

/**
 * Download a file's raw content.
 */
export const downloadDriveFile = async (token: string, fileId: string): Promise<string> => {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to download file from Google Drive (Status: ${response.status})`);
  }

  return response.text();
};

/**
 * Upload content to Google Drive (create new or update existing).
 * Uses simple media upload flow to update content.
 */
export const uploadDriveFile = async (
  token: string,
  name: string,
  content: string | Blob,
  mimeType: string,
  fileId?: string
): Promise<DriveFile> => {
  if (fileId) {
    // 1. UPDATE EXISTING FILE CONTENT
    const uploadUrl = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`;
    const response = await fetch(uploadUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": mimeType
      },
      body: content
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || "Failed to update Google Drive file content.");
    }

    const fileMeta = await response.json();

    // 2. ALSO UPDATE METADATA (such as name if renamed)
    const metaUrl = `https://www.googleapis.com/drive/v3/files/${fileId}`;
    await fetch(metaUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    });

    return fileMeta;
  } else {
    // CREATE A NEW FILE
    // Step A: Create metadata first
    const createUrl = "https://www.googleapis.com/drive/v3/files";
    const metaResponse = await fetch(createUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, mimeType })
    });

    if (!metaResponse.ok) {
      const err = await metaResponse.json().catch(() => ({}));
      throw new Error(err.error?.message || "Failed to create file on Google Drive.");
    }

    const newFile = await metaResponse.json();
    const newId = newFile.id;

    // Step B: Upload file content
    const uploadUrl = `https://www.googleapis.com/upload/drive/v3/files/${newId}?uploadType=media`;
    const contentResponse = await fetch(uploadUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": mimeType
      },
      body: content
    });

    if (!contentResponse.ok) {
      throw new Error("Failed to upload content for the new Google Drive file.");
    }

    return contentResponse.json();
  }
};

/**
 * Helper to display readable file sizes.
 */
export const formatBytes = (bytesStr?: string): string => {
  if (!bytesStr) return "Unknown size";
  const bytes = parseInt(bytesStr, 10);
  if (isNaN(bytes)) return "Unknown size";
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};
