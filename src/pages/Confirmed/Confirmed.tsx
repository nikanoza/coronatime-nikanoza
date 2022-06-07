import { Coronatime, Success } from 'assets/images';
import { Button } from 'components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Confirmed = () => {
  const { t } = useTranslation();
  return (
    <div className="h-full">
      <div className="flex flex-col w-full h-full justify-start items-center xl:text-lg">
        <img src={Coronatime} alt="" className="mt-3" />
        <div className="flex flex-col items-center justify-end h-1/3">
          <img src={Success} alt="" />
          <div>{t('Your account is confirmed, you can sign in')}</div>
        </div>
        <Button id="confirm-btn" type="button" className="w-5/6 lg:w-1/3">
          <Link to={'/login'}>{t('sign in')}</Link>
        </Button>
      </div>
    </div>
  );
};

export default Confirmed;
