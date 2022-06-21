import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://coronatime-api.devtest.ge/api/',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const onAccountConfirm = async (
  url: string,
  data: {
    hash: string;
  }
) => {
  try {
    const response = await instance({
      url: url,
      method: 'POST',
      data: data,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getCountriesStatistics = async (url: string, token: string) => {
  try {
    const response = await instance({
      url: url,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const login = async (
  url: string,
  data: { username: string; password: string }
) => {
  try {
    const response = await instance({
      url: url,
      method: 'POST',
      data: data,
    });
    return response.data;
  } catch (err) {
    return 'please, provide correct credentials...';
  }
};

export const recovery = async (
  url: string,
  data: { email: string; backlink: string }
) => {
  try {
    const response = await instance({
      url: url,
      method: 'POST',
      data: data,
    });
    return response.data;
  } catch (err) {
    return 'email not fount';
  }
};

export const onRegistration = async (
  url: string,
  data: {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
    redirectOnConfirm: string;
  }
) => {
  try {
    const response = await instance({
      url: url,
      method: 'POST',
      data: data,
    });
    return response.data;
  } catch (err) {
    return err.response.data[0].context.label;
  }
};

export const setNewPassword = async (
  url: string,
  data: { hash: string; password: string; repeatPassword: string }
) => {
  try {
    const response = await instance({
      url: url,
      method: 'POST',
      data: data,
    });
    return response.data;
  } catch (err) {
    return 'invalid data provided.';
  }
};
