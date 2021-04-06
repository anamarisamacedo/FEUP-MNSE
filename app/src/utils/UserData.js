const USERNAME_KEY = 'username';

export const setUsername = (username) => {
  localStorage.setItem(USERNAME_KEY, username);
};

export const clearUsername = () => {
  localStorage.removeItem(USERNAME_KEY);
};

export const getUsername = () => localStorage.getItem(USERNAME_KEY);
