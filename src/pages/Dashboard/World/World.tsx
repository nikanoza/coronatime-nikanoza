import {
  Statistic,
  CasesSvg,
  RecoveredSvg,
  DeathSvg,
} from 'pages/Dashboard/World/components';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { CountryType } from 'types';

const World = () => {
  const { t } = useTranslation();
  const { statState } = useOutletContext<{ statState: CountryType[] | null }>();
  const casesAmount = statState
    ? statState.reduce(
        (a: number, b: CountryType) => a + b.statistics.confirmed,
        0
      )
    : 0;
  const recoveredAmount = statState
    ? statState.reduce(
        (a: number, b: CountryType) => a + b.statistics.recovered,
        0
      )
    : 0;
  const deathAmount = statState
    ? statState.reduce(
        (a: number, b: CountryType) => a + b.statistics.deaths,
        0
      )
    : 0;
  return (
    <div className="w-full mt-5 md:mt-6 grid grid-cols-2 justify-items-center md:grid-cols-3 gap-3 text-xs md:text-base 2xl:text-lg p-5">
      <Statistic
        img={<CasesSvg />}
        text={t('new cases')}
        amount={casesAmount}
        className="bg-[#2029F3] col-span-2 md:col-span-1"
        textColor="text-[#2029F3]"
      />
      <Statistic
        img={<RecoveredSvg />}
        text={t('recovered')}
        amount={recoveredAmount}
        className="bg-[#0FBA68] text-[8px] md:text-base 2xl:text-lg"
        textColor="text-[#0FBA68]"
      />
      <Statistic
        img={<DeathSvg />}
        text={t('death')}
        amount={deathAmount}
        className="bg-[#EAD621]"
        textColor="text-[#EAD621]"
      />
    </div>
  );
};

export default World;
