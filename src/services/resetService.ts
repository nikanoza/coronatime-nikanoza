import { AxiosResponse } from 'axios';
import { instance } from 'services';

const setNewPassword = async (
  url: string,
  data: { hash: string; password: string; repeatPassword: string }
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
    return 'invalid data provided.';
  }
};

export default setNewPassword;
