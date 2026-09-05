export const hasRole = (user, role) =>
  Boolean(user?.roles?.some((item) => item === role || item === `ROLE_${role}`));

export const isAdmin = (user) => hasRole(user, "ADMIN");
export const isSeller = (user) => hasRole(user, "SELLER");
