import { userStore } from '../store/userStore.js';

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    const userId = Number(req.user?.id);
    if (!userId) return res.status(401).json({ error: 'invalid_user' });

    const user = userStore.findById(userId);
    if (!user) return res.status(404).json({ error: 'user_not_found' });

    const userRoles = user.roles || [];
    const ok = userRoles.some((r) => allowedRoles.includes(r));
    if (!ok) {
      return res.status(403).json({ error: 'forbidden', require: allowedRoles });
    }
    return next();
  };
}
