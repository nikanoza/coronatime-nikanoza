import { Cases, Death, Recovered } from 'assets';
import { Statistic } from 'pages/Dashboard/World/components';
import { useTranslation } from 'react-i18next';

const World = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full mt-5 md:mt-24 grid grid-cols-2 justify-items-center md:grid-cols-3 xl:mt-20 gap-3 text-xs md:text-base 2xl:text-lg p-5">
      <Statistic
        img={Cases}
        text={t('new cases')}
        amount="715,523"
        className="bg-[#2029F3] col-span-2 md:col-span-1"
        textColor="text-[#2029F3]"
      />
      <Statistic
        img={Recovered}
        text={t('recovered')}
        amount="715,523"
        className="bg-[#0FBA68] text-[8px] md:text-base 2xl:text-lg"
        textColor="text-[#0FBA68]"
      />
      <Statistic
        img={Death}
        text={t('death')}
        amount="715,523"
        className="bg-[#EAD621]"
        textColor="text-[#EAD621]"
      />
    </div>
  );
};

export default World;
