import { Dashboard } from 'assets/images';
import { Button } from 'components';
import { useTranslation } from 'react-i18next';

const Recovery = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center w-full xl:text-lg">
      <img src={Dashboard} alt="" className="w-5/6 mt-6 lg:w-1/3" />
      <div className="font-bold mt-2 text-base capitalize">
        {t('recover password')}
      </div>
      <div className="text-sm mt-2 text-center">
        {t('click this button to recover a password')}
      </div>
      <div className="w-5/6 lg:w-1/3">
        <Button type="button" id="recovery-btn" className="w-full">
          {t('recovery password')}
        </Button>
      </div>
    </div>
  );
};

export default Recovery;
