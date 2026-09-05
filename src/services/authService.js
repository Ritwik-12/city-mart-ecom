import api from "./api";

export const signIn = async (payload) => {
  const { data } = await api.post("/api/auth/signin", payload);
  return data;
};

export const signUp = async (payload) => {
  const { data } = await api.post("/api/auth/signup", payload);
  return data;
};

export const signOut = async () => {
  const { data } = await api.post("/api/auth/signout");
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/api/auth/user");
  return data;
};

export const getCurrentUsername = async () => {
  const { data } = await api.get("/api/auth/username");
  return data;
};
