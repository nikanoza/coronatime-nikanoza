import { AxiosResponse } from 'axios';
import { instance } from 'services';

const onAccountConfirm = async (
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
    }).then((res: AxiosResponse<any>) => {
      return res.data;
    });
    return response;
  } catch (err) {
    return err;
  }
};

export default onAccountConfirm;
