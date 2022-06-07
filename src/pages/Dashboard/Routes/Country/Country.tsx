import axios from 'axios';
import { useEffect, useState } from 'react';
import { TableCol } from 'pages/Dashboard/Routes/Country/components';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

let firstly = true;

type CountryType = {
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

const Country = () => {
  const language = i18next.language;
  const { t } = useTranslation();
  const [statistics, setStatistics] = useState([]);
  const [statisticsClone, setStatisticsClone] = useState([]);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRvbm92YW5pIiwiZW1haWwiOiJkb25vdmFuaXNhbUBnbWFpbC5jb20iLCJpYXQiOjE2NTQ1MDcxODJ9.NXyZJb-5-nKQCmBH9XTZTg3EwizZI_-x6IDn3m0PVV4';
  setTimeout(() => console.log(1), 20000);
  const getStatistic = async () => {
    try {
      const response = await axios.get(
        'https://coronatime-api.devtest.ge/api/countries/',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatistics(response.data);
      setStatisticsClone(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  };
  useEffect(() => {
    if (firstly) {
      getStatistic();
      firstly = false;
    }
  }, []);

  const sortNameAsc = () => {
    const newArray = statistics
      .slice()
      .sort((a: CountryType, b: CountryType) =>
        language === 'en'
          ? a.name.en.localeCompare(b.name.en)
          : a.name.ka.localeCompare(b.name.ka)
      );
    setStatisticsClone(newArray);
  };

  const sortNameDsc = () => {
    const newArray = statistics
      .slice()
      .sort((a: CountryType, b: CountryType) =>
        language === 'en'
          ? b.name.en.localeCompare(a.name.en)
          : b.name.ka.localeCompare(a.name.ka)
      );
    setStatisticsClone(newArray);
  };
  const sortationFc = (property: string, asc: boolean) => {
    const newArray = statistics
      .slice()
      .sort((a, b) =>
        asc
          ? a['statistics'][property] - b['statistics'][property]
          : b['statistics'][property] - a['statistics'][property]
      );
    setStatisticsClone(newArray);
  };

  const countryFilterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newArray = statistics.slice().filter((country: CountryType) => {
      return language === 'en'
        ? country.name.en.toLowerCase().startsWith(e.target.value.toLowerCase())
        : country.name.ka
            .toLowerCase()
            .startsWith(e.target.value.toLowerCase());
    });
    setStatisticsClone(newArray);
  };

  return (
    <div className="h-1/2">
      <input
        type="text"
        placeholder={t('Search by country')}
        className="border rounded-md pt-3 pb-3 pl-6 mt-10 w-1/4"
        onChange={countryFilterHandler}
      />
      <div className="mt-2 w-full border-[#F6F6F7] border rounded-lg h-full">
        <div className="grid grid-cols-4">
          <TableCol
            text={t('location')}
            sortAsc={sortNameAsc}
            sortDsc={sortNameDsc}
          />
          <TableCol
            text={t('new cases')}
            sortAsc={() => sortationFc('confirmed', true)}
            sortDsc={() => sortationFc('confirmed', false)}
          />
          <TableCol
            text={t('death')}
            sortAsc={() => sortationFc('deaths', true)}
            sortDsc={() => sortationFc('deaths', false)}
          />
          <TableCol
            text={t('recovered')}
            sortAsc={() => sortationFc('recovered', true)}
            sortDsc={() => sortationFc('recovered', false)}
          />
        </div>
        <div className="mt-2 w-full h-full overflow-y-scroll">
          {statistics.length > 0 &&
            statisticsClone.map((country: CountryType, index) => (
              <div key={index} className="grid grid-cols-4">
                <div className="flex pt-5 pb-5 pl-8 pr-8 items-center justify-center border-b whitespace-nowrap">
                  {language === 'en' ? country.name.en : country.name.ka}
                </div>
                <div className="flex pt-5 pb-5 pl-8 pr-8 items-center justify-center border-b">
                  {country.statistics.confirmed}
                </div>
                <div className="flex pt-5 pb-5 pl-8 pr-8 items-center justify-center border-b">
                  {country.statistics.deaths}
                </div>
                <div className="flex pt-5 pb-5 pl-8 pr-8 items-center justify-center border-b">
                  {country.statistics.recovered}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Country;
