import { cookies } from "next/headers"

export async function getUser() {
  const token = cookies().get("token")?.value

  if (!token) {
    return null
  }

  try {
    const response = await fetch(`${process.env.FLASK_API_URL}/validate-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
      cache: "no-store",
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.user
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await fetch(`${process.env.FLASK_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Login failed")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

export async function logout() {
  try {
    cookies().delete("token")
    return true
  } catch (error) {
    console.error("Logout error:", error)
    return false
  }
}
