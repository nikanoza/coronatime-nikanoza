import { Coronatime } from 'assets/images';
import { Language } from 'components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';

const Dashboard = () => {
  const { category } = useParams();
  const [collapseMenu, setCollapseMenu] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();
  let user: { login: string; username: string } = {
    login: 'false',
    username: '',
  };
  const storage = localStorage.getItem('user');
  if (storage) {
    user = JSON.parse(storage);
  }

  const toggleMenu = () => {
    setCollapseMenu(!collapseMenu);
  };

  const logoutHandler = () => {
    navigate('/login');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('statistics');
  };

  return (
    <div className="w-full h-full flec flex-col p-1 md:p-10">
      <header className="w-full flex items-center justify-between">
        <img src={Coronatime} alt="" />
        <menu
          className={`gap-10 ${
            collapseMenu
              ? 'hidden'
              : 'border p-2 absolute right-1 top-1 bg-slate-200'
          } lg:flex`}
        >
          {!collapseMenu && (
            <button className="text-red-700 text-lg" onClick={toggleMenu}>
              X
            </button>
          )}
          <Language />
          <div className="flex items-center">{user.username}</div>
          <button className="capitalize" type="button" onClick={logoutHandler}>
            {t('log out')}
          </button>
        </menu>
        <button
          className={`flex ${!collapseMenu ? 'hidden' : ''} lg:hidden`}
          onClick={toggleMenu}
        >
          <div className="space-y-2">
            <span className="block w-8 h-0.5 bg-gray-600 animate-pulse"></span>
            <span className="block w-8 h-0.5 bg-gray-600 animate-pulse"></span>
            <span className="block w-8 h-0.5 bg-gray-600 animate-pulse"></span>
          </div>
        </button>
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
