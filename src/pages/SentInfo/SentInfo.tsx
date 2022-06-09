import { Coronatime, Success } from 'assets/images';
import { useTranslation } from 'react-i18next';

const SentInfo = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full h-full justify-start items-center xl:text-lg">
      <img src={Coronatime} alt="" className="mt-3" />
      <div className="flex flex-col items-center justify-end h-1/2">
        <img src={Success} alt="" />
        <div>{t('We have sent you a confirmation email')}</div>
      </div>
    </div>
  );
};

export default SentInfo;