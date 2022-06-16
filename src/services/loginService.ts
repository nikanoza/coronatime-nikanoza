import { AxiosResponse } from 'axios';
import { instance } from 'services';

const login = async (
  url: string,
  data: { username: string; password: string }
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
    return 'please, provide correct credentials...';
  }
};

export default login;
