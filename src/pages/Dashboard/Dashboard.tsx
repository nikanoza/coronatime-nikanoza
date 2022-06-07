import { Coronatime } from 'assets/images';
import { Language } from 'components';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet, useParams } from 'react-router-dom';

const Dashboard: React.FC<{ changeLenguage: Function }> = (props) => {
  const { category } = useParams();
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flec flex-col p-10">
      <header className="w-full flex items-center justify-between">
        <img src={Coronatime} alt="" />
        <menu className="gap-10 hidden lg:flex">
          <Language change={props.changeLenguage} />
          <div className="flex items-center">{t('nikanoza')}</div>
          <button className="capitalize" type="button">
            {t('log out')}
          </button>
        </menu>
        <div className="flex lg:hidden">
          <div className="space-y-2">
            <span className="block w-8 h-0.5 bg-gray-600 animate-pulse"></span>
            <span className="block w-8 h-0.5 bg-gray-600 animate-pulse"></span>
            <span className="block w-8 h-0.5 bg-gray-600 animate-pulse"></span>
          </div>
        </div>
      </header>
      <div className="mt-10 font-bold">
        {category === 'country'
          ? t('Statistics by country')
          : t('Worldwide Statistics')}
      </div>
      <ul className="flex gap-14 mt-5 lg:mt-10">
        <NavLink
          to={'/dashboard/world'}
          className={(link: any) => {
            return `${
              link.isActive
                ? 'border-b-[3px] border-solid border-[#010414]'
                : ''
            } pb-3`;
          }}
        >
          {t('Worldwide')}
        </NavLink>
        <NavLink
          to={'/dashboard/country'}
          className={(link: any) => {
            return `${
              link.isActive
                ? 'border-b-[3px] border-solid border-[#010414]'
                : ''
            } pb-3`;
          }}
        >
          {t('By country')}
        </NavLink>
      </ul>
      <Outlet />
    </div>
  );
};

export default Dashboard;
