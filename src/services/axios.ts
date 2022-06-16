import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://coronatime-api.devtest.ge/api/',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default instance;
