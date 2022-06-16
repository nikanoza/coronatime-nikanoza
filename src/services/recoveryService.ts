import { AxiosResponse } from 'axios';
import { instance } from 'services';

const recovery = async (
  url: string,
  data: { email: string; backlink: string }
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
    return 'email not fount';
  }
};

export default recovery;
