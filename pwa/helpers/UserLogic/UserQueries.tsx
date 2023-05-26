import {
  AuthenticatedUserInterface,
  CreateUserInterface,
  LoginUserInterface,
} from "../../interfaces/UserInterface";

export function logInUser({ email, password }: LoginUserInterface) {
  return fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export async function logOutUser() {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
  });
}

export async function createUser(user: CreateUserInterface) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return (await response.json()) as Promise<AuthenticatedUserInterface>;
}
