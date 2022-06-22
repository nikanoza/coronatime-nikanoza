import { Coronatime, Success } from 'assets';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const SentInfo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    const loginStatus = localStorage.getItem('user') || '';
    if (loginStatus && JSON.parse(loginStatus).login === true) {
      navigate('/dashboard/world');
    }
  });
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
