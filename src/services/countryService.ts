import axios from 'axios';

type Country = {
  code: string;
  name: {
    en: string;
    ka: string;
  };
  statistics: {
    confirmed: number;
    critical: number;
    deaths: number;
    recovered: number;
  };
  id: string;
};
const getCountriesStatistics = async (
  url: string,
  token: string
): Promise<Country[]> => {
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    return error.message;
  }
};

export default getCountriesStatistics;
