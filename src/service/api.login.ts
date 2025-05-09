interface LoginResponse {
  status: string;
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) {
      const errorMessage =
        data.message || data.error || "Error en la autenticación";
      throw new Error(errorMessage);
    }

    return data;
  } catch (error: string | unknown) {
    console.error("Error en la autenticación:", error);
    throw error;
  }
};

export const saveToken = (token: string): void => {
  localStorage.setItem("auth_token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const logout = (): void => {
  localStorage.removeItem("auth_token");
};
