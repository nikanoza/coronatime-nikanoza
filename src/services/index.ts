import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://coronatime-api.devtest.ge/api',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const onAccountConfirm = (data: { hash: string }) => {
  return instance.post('/confirm-account', data);
};

export const getCountriesStatistics = (token: string) => {
  return instance.get('/countries', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const login = (data: { username: string; password: string }) => {
  return instance.post('/login', data);
};

export const recovery = (data: { email: string; backlink: string }) => {
  return instance.post('/password/send-recovery-link', data);
};

export const onRegistration = (data: {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  redirectOnConfirm: string;
}) => {
  return instance.post('/register', data);
};

export const setNewPassword = (data: {
  hash: string;
  password: string;
  repeatPassword: string;
}) => {
  return instance.post('/password/recover', data);
};
