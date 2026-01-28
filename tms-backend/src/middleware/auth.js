const requireAuth = (user) => {
  if (!user) throw new Error("Not authenticated");
};

const requireRole = (user, role) => {
  requireAuth(user);
  if (user.role !== role) throw new Error("Not authorized");
};

module.exports = { requireAuth, requireRole };
