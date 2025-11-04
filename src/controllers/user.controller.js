import { userService } from "../services/user.service.js";

export const login = async (req, res) => {
  try {
    const { login_id, password } = req.body;
    const result = await userService.login(login_id, password);
    if (!result) return res.status(401).json({ error: "invalid_credentials" });

    res.json({
      token: result.token,
      user: {
        id: result.user._id,
        name: result.user.name,
        email: result.user.email,
        roles: result.user.roles,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "server_error", detail: err.message });
  }
};

export const getSelf = async (req, res) => {
  try {
    const self = await userService.getSelf(req.user.id);
    if (!self) return res.status(404).json({ error: "user_not_found" });
    res.json(self);
  } catch (err) {
    res.status(500).json({ error: "server_error", detail: err.message });
  }
};
