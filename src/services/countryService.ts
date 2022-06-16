// import axios from 'axios';
// import { method } from 'cypress/types/bluebird';
import { AxiosResponse } from 'axios';
import { instance } from 'services';

const getCountriesStatistics = async (url: string, token: string) => {
  try {
    const response = await instance({
      url: url,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res: AxiosResponse<any>) => {
      return res.data;
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

export default getCountriesStatistics;
