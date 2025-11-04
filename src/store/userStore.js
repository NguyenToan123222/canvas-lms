import { User } from "../models/user.model";

export const userStore = {
  async findById(id) {
    try {
      return await User.findById(id).lean();
    } catch {
      return null;
    }
  },

  async findByLoginId(loginId) {
    return await User.findOne({ login_id: loginId }).lean();
  },

  async create(data) {
    const user = new User(data);
    await user.save();
    return user.toObject();
  },

  async update(id, updates) {
    return await User.findByIdAndUpdate(id, updates, { new: true }).lean();
  },

  async delete(id) {
    return await User.findByIdAndDelete(id).lean();
  },

  async all() {
    return await User.find({}).lean();
  },
};
