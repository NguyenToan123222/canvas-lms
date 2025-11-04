const users = [
  {
    id: 1,
    login_id: 'studentA',
    name: 'Nguyen Van A',
    email: 'studentA@example.com',
    roles: ['student']
  },
  {
    id: 2,
    login_id: 'teacherB',
    name: 'Le Thi B',
    email: 'teacherB@example.com',
    roles: ['teacher']
  }
];

export const userStore = {
  findById(id) {
    return users.find((u) => u.id === Number(id)) || null;
  }
};
