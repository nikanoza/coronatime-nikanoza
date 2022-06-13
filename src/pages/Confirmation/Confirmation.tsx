import { Dashboard } from 'assets';
import { Button } from 'components';
import { usePostHttp } from 'hooks';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const hash = params.get('hash');

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { requestFc: sentRequest } = usePostHttp({
    obj: {
      link: 'https://coronatime-api.devtest.ge/api/confirm-account',
      body: {
        hash: hash,
      },
    },
    applyData: (param: string) => {
      navigate('/confirmed');
      return JSON.parse(param);
    },
    errorFc: (property) => {},
  });

  const verify = () => sentRequest();

  return (
    <div className="flex flex-col items-center justify-center w-full xl:text-lg">
      <img src={Dashboard} alt="" className="w-5/6 mt-6 lg:w-1/3" />
      <div className="font-bold mt-2 text-base">{t('Confirmation email')}</div>
      <div className="text-sm mt-2 text-center">
        {t('click this button to verify your email')}
      </div>
      <Button
        type="button"
        id="confirm-btn"
        onClick={verify}
        className="w-5/6 lg:w-1/3"
      >
        {t('verify email')}
      </Button>
    </div>
  );
};

export default Confirmation;
