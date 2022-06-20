import { useEffect, useState } from 'react';
import { TableCol } from 'pages/Dashboard/Country/components';
import { getCountriesStatistics } from 'services';

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
type Statistics = {
  confirmed: number;
  critical: number;
  deaths: number;
  recovered: number;
};
const countryArray: CountryType[] = [];

const sortingState = {
  name: '',
  direction: '',
};

const Country = () => {
  const language = i18next.language;
  const { t } = useTranslation();
  const [statistics, setStatistics] = useState(countryArray);
  const [statisticsClone, setStatisticsClone] = useState(countryArray);
  const [sortOptions, setSortOptions] = useState(sortingState);
  const changeSortation = (name: string, value: string) => {
    setSortOptions({ name: name, direction: value });
  };
  let token = localStorage.getItem('token');
  useEffect(() => {
    const storageStatistics = localStorage.getItem('statistics');
    if (storageStatistics) {
      setStatistics(JSON.parse(storageStatistics));
      setStatisticsClone(JSON.parse(storageStatistics));
    }
  }, []);
  useEffect(() => {
    if (firstly && token) {
      const data = getCountriesStatistics(
        process.env.REACT_APP_API_URL + '/countries' || '',
        token
      );
      const getData = async () => {
        const stats = await data;
        localStorage.setItem('statistics', JSON.stringify(stats));
        setStatistics(stats);
        setStatisticsClone(stats);
      };
      getData();
      firstly = false;
    }
  }, [token]);

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
    type ObjectKey = keyof Statistics;
    const prop = property as ObjectKey;
    const newArray = statistics
      .slice()
      .sort((a: CountryType, b: CountryType) =>
        asc
          ? a['statistics'][prop] - b['statistics'][prop]
          : b['statistics'][prop] - a['statistics'][prop]
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
    <div className="h-1/3 text-xs lg:text-base">
      <input
        type="text"
        placeholder={t('Search by country')}
        className="border rounded-md pt-3 pb-3 pl-6 mt-10 md:w-1/4"
        onChange={countryFilterHandler}
      />
      <div className="mt-2 w-full border-[#F6F6F7] border rounded-lg h-full">
        <div className="grid grid-cols-4 lg:grid-cols-6 bg-[#F6F6F7]">
          <TableCol
            text={t('location')}
            sortAsc={sortNameAsc}
            sortDsc={sortNameDsc}
            btnIds={{ asc: 'name_asc', dsc: 'name_dsc' }}
            changeHandler={changeSortation}
            ifSorted={sortOptions}
          />
          <TableCol
            text={t('new cases')}
            sortAsc={() => sortationFc('confirmed', true)}
            sortDsc={() => sortationFc('confirmed', false)}
            btnIds={{ asc: 'cases_asc', dsc: 'cases_dsc' }}
            changeHandler={changeSortation}
            ifSorted={sortOptions}
          />
          <TableCol
            text={t('death')}
            sortAsc={() => sortationFc('deaths', true)}
            sortDsc={() => sortationFc('deaths', false)}
            btnIds={{ asc: 'death_asc', dsc: 'death_dsc' }}
            changeHandler={changeSortation}
            ifSorted={sortOptions}
          />
          <TableCol
            text={t('recovered')}
            sortAsc={() => sortationFc('recovered', true)}
            sortDsc={() => sortationFc('recovered', false)}
            btnIds={{ asc: 'recovered_asc', dsc: 'recovered_dsc' }}
            changeHandler={changeSortation}
            ifSorted={sortOptions}
          />
        </div>
        <div className="mt-2 w-full h-full overflow-y-scroll">
          {statisticsClone.map((country: CountryType, index) => (
            <div key={index} className="grid grid-cols-4 lg:grid-cols-6">
              <div className="flex items-center justify-center text-center border-b md:whitespace-nowrap">
                <div className="w-1/3 flex justify-start">
                  {language === 'en' ? country.name.en : country.name.ka}
                </div>
              </div>
              <div className="flex items-center justify-center border-b">
                <div className="w-1/3 flex justify-start">
                  {country.statistics.confirmed}
                </div>
              </div>
              <div className="flex items-center justify-center border-b">
                <div className="w-1/3 flex justify-start md:pl-8">
                  {country.statistics.deaths}
                </div>
              </div>
              <div className="flex items-center justify-center border-b lg:col-span-3 lg:justify-start">
                <div className="1/3 flex justify-start lg:pl-24">
                  {country.statistics.recovered}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Country;
