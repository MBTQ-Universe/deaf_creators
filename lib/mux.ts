import type { MuxAsset, MuxUpload } from "../types/mux"

// Function to create a new upload URL
export async function createUploadUrl(): Promise<{ url: string; uploadId: string }> {
  const response = await fetch("/api/mux/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to create upload URL")
  }

  const data = await response.json()
  return {
    url: data.uploadUrl,
    uploadId: data.uploadId,
  }
}

// Function to check the status of an upload
export async function checkUploadStatus(uploadId: string): Promise<MuxUpload> {
  const response = await fetch(`/api/mux/uploads/${uploadId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to check upload status")
  }

  return response.json()
}

// Function to get asset details
export async function getAsset(assetId: string): Promise<MuxAsset> {
  const response = await fetch(`/api/mux/assets/${assetId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to get asset")
  }

  return response.json()
}

// Function to delete an asset
export async function deleteAsset(assetId: string): Promise<void> {
  const response = await fetch(`/api/mux/assets/${assetId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to delete asset")
  }
}
