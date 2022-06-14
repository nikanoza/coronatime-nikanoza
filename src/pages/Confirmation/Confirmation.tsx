import { Coronatime, Success } from 'assets';
import { Button } from 'components';
import { usePostHttp } from 'hooks';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const hash = params.get('hash');

  const { t } = useTranslation();

  const { requestFc: sentRequest } = usePostHttp({
    obj: {
      link: 'https://coronatime-api.devtest.ge/api/confirm-account',
      body: {
        hash: hash,
      },
    },
    applyData: (param: string) => {
      return JSON.parse(param);
    },
    errorFc: (property) => {},
  });

  useEffect(() => {
    if (hash) {
      sentRequest();
    }
  });
  return (
    <div className="h-full">
      <div className="flex flex-col w-full h-full justify-start items-center xl:text-lg pb-5">
        <img src={Coronatime} alt="" className="mt-3" />
        <div className="flex flex-col items-center justify-center mt-auto md:mt-auto">
          <img src={Success} alt="" />
          <div>{t('Your account is confirmed, you can sign in')}</div>
        </div>
        <Button
          id="confirm-btn"
          type="button"
          className="w-5/6 lg:w-1/3 mt-auto md:mt-5 md:mb-auto"
        >
          <Link to={'/login'}>{t('sign in')}</Link>
        </Button>
      </div>
    </div>
  );
};

export default Confirmation;
