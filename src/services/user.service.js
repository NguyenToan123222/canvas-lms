import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userStore } from "../store/userStore.js";

const JWT_SECRET = process.env.JWT_SECRET || "demo_secret";

export const userService = {
  async login(login_id, password) {
    const user = await userStore.findByLoginId(login_id);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    const token = jwt.sign({ id: user._id, login_id: user.login_id, roles: user.roles }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return { token, user };
  },

  async getSelf(userId) {
    const user = await userStore.findById(userId);
    if (!user) return null;

    const nameParts = user.name.trim().split(" ");
    const lastName = nameParts.slice(-1)[0];
    const firstNames = nameParts.slice(0, -1).join(" ");

    return {
      id: user._id.toString(),
      name: user.name,
      sortable_name: `${lastName}, ${firstNames}`.trim(),
      short_name: user.name,
      login_id: user.login_id,
      email: user.email,
      roles: user.roles,
    };
  },
};
