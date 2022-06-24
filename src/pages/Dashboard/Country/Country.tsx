import { useEffect, useState } from 'react';
import { TableCol } from 'pages/Dashboard/Country/components';
import { CountryType, Statistics } from 'types';

import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { Search } from 'assets';

const sortingState = {
  name: '',
  direction: '',
};

const countryArray: CountryType[] = [];

const Country = () => {
  const language = i18next.language;
  const { t } = useTranslation();
  const [statistics, setStatistics] = useState(countryArray);
  const [statisticsClone, setStatisticsClone] = useState(countryArray);
  const [sortOptions, setSortOptions] = useState(sortingState);
  const changeSortation = (name: string, value: string) => {
    setSortOptions({ name: name, direction: value });
  };
  useEffect(() => {
    const storageStatistics = localStorage.getItem('statistics');
    if (storageStatistics) {
      setStatistics(JSON.parse(storageStatistics));
      setStatisticsClone(JSON.parse(storageStatistics));
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
    <div className="h-1/3 md:h-1/2 lg:h-3/4 text-xs lg:text-base">
      <div className="flex">
        <img
          src={Search}
          alt=""
          className="absolute mt-[3.25rem] lg:mt-14 ml-4"
        />
        <input
          type="text"
          placeholder={t('Search by country')}
          className="border rounded-md pt-3 pb-3 pl-12 mt-10 md:w-1/4"
          onChange={countryFilterHandler}
          id="filter_countries"
        />
      </div>
      <div className="mt-2 w-full border-[#F6F6F7] border rounded-lg h-40 md:h-1/2 lg:h-5/6">
        <div className="flex bg-[#F6F6F7] flex-shrink-0">
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
        <div className="mt-2 w-full h-4/5 overflow-y-scroll">
          {statisticsClone.map((country: CountryType, index) => (
            <div key={index} className="flex">
              <div className="w-1/4 lg:w-1/6 flex items-center justify-start pl-1 md:pl-3 lg:pl-5 text-center pt-1 md:pt-3 pb-1 md:pb-3 border-b md:whitespace-nowrap">
                <div className="flex justify-start w-2/3 md:w-1/3">
                  {language === 'en' ? country.name.en : country.name.ka}
                </div>
              </div>
              <div className="w-1/4 lg:w-1/6 flex items-center justify-start pl-1 md:pl-5 lg:pl-7 pt-1 md:pt-3 pb-1 md:pb-3 border-b">
                <div className="flex justify-start">
                  {country.statistics.confirmed}
                </div>
              </div>
              <div className="w-1/4 lg:w-1/6 flex items-center justify-start pl-1 md:pl-5 lg:pl-7 pt-1 md:pt-3 pb-1 md:pb-3 border-b">
                <div className="flex justify-start">
                  {country.statistics.deaths}
                </div>
              </div>
              <div className="w-1/4 lg:w-1/6 flex items-center justify-start pl-1 md:pl-5 lg:pl-7 pt-1 md:pt-3 pb-1 md:pb-3 border-b">
                <div className="flex justify-start">
                  {country.statistics.recovered}
                </div>
              </div>
              <div className="w-1/6 border-b hidden lg:flex"></div>
              <div className="w-1/6 border-b hidden lg:flex"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Country;
