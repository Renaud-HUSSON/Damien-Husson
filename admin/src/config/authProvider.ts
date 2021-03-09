import { AuthProvider } from 'ra-core'

export const authProvider: AuthProvider = {
  login: async (params) => {
    const { username, password } = params

    const body = JSON.stringify({
      email: username,
      password,
    })

    const headers = new Headers({ 'Content-Type': 'application/json' })

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body,
      headers,
    }).then((res) => res.json())

    if (response.error) {
      throw new Error()
    }
  },
  checkError: async (error) => {
    return
  },
  checkAuth: async (_params) => {
    const isAuthenticated = await fetch('/api/auth/authenticated').then((res) =>
      res.json()
    )

    if (isAuthenticated.error) {
      throw new Error()
    }
  },
  logout: async () => {
    await fetch('/api/auth/logout')
  },
  // No permissions system
  getPermissions: async (_params) => {
    return
  },
}
