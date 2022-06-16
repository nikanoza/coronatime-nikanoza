import { AxiosResponse } from 'axios';
import { instance } from 'services';

const onRegistration = async (
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
    }).then((res: AxiosResponse<any>) => {
      return res.data;
    });
    return response;
  } catch (err) {
    return err.response.data[0].context.label;
  }
};
export default onRegistration;
