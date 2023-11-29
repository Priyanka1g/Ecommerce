// userService.js
import usersData from '../users.json';

export const users = usersData.users; // Extract the "users" array

export const getUserByEmail = (email) => {
  return users.find(user => user.email === email);
};
