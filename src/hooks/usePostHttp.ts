import axios from 'axios';

type RequestObject = {
  obj: {
    link: string;
    body: object;
  };
  applyData: (param: string) => object;
  errorFc: (register: string) => void;
};

type ErrorType = [
  {
    message: string;
    path: string[];
    type: string;
    context: { label: string; value: string; key: string };
  }
];
const usePostHttp = (param: RequestObject) => {
  const postData = async () => {
    try {
      const response = await axios.post(param.obj.link, param.obj.body, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const data = JSON.stringify(response.data, null, 4);
      param.applyData(data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const register = (err.response.data as ErrorType)[0].context.label;
        param.errorFc(register);
      }
    }
  };

  return { requestFc: postData };
};
export default usePostHttp;
