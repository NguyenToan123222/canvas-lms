import { userStore } from '../store/userStore.js';

export const userService = {
  async getSelf(userId) {
    const user = userStore.findById(userId);
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      sortable_name: `${user.name.split(' ').slice(-1)[0]}, ${user.name.split(' ').slice(0, -1).join(' ')}`.trim(),
      short_name: user.name,
      login_id: user.login_id,
      email: user.email,
      roles: user.roles
    };
  }
};
