import { userService } from '../services/user.service.js';

export const getSelf = async (req, res) => {
  try {
    const self = await userService.getSelf(Number(req.user.id));
    if (!self) return res.status(404).json({ error: 'user_not_found' });
    return res.json(self);
  } catch (err) {
    return res.status(500).json({ error: 'server_error', detail: err.message });
  }
};
