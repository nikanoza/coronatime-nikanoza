import { Coronatime } from 'assets';
import { Language } from 'components';
import React, { MouseEventHandler, useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { getCountriesStatistics } from 'services';
import { CountryType } from 'types';

let firstly = true;

const Dashboard = () => {
  const { category } = useParams();
  const [collapseMenu, setCollapseMenu] = useState(true);
  const [statState, setStatsState] = useState<CountryType[] | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  let user: { login: string; username: string } = {
    login: 'false',
    username: '',
  };
  const menuRef = React.createRef<HTMLMenuElement>();
  const storage = localStorage.getItem('user');
  if (storage) {
    user = JSON.parse(storage);
  }
  let token = localStorage.getItem('token');
  useEffect(() => {
    if (firstly && token) {
      const data = getCountriesStatistics(
        process.env.REACT_APP_API_URL + '/countries' || '',
        token
      );
      const getData = async () => {
        const statsData = await data;
        localStorage.setItem('statistics', JSON.stringify(statsData));
        setStatsState(statsData);
      };
      getData();
      firstly = false;
    }
  }, [token]);
  const toggleMenu = () => {
    setCollapseMenu(!collapseMenu);
  };

  const logoutHandler = () => {
    navigate('/login');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('statistics');
  };
  const closeMenu: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target !== menuRef.current && !collapseMenu) {
      setCollapseMenu(true);
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col p-1 md:p-10"
      onClick={closeMenu}
    >
      <header className="w-full flex items-center justify-between">
        <img src={Coronatime} alt="" />
        <div className={!collapseMenu ? 'ml-auto mr-24' : 'ml-auto mr-3'}>
          <Language />
        </div>
        <menu
          className={`gap-10 ${
            collapseMenu
              ? 'hidden'
              : 'border p-2 absolute right-1 top-1 bg-slate-200'
          } md:flex`}
          ref={menuRef}
        >
          {!collapseMenu && (
            <button className="text-red-700 text-lg" onClick={toggleMenu}>
              X
            </button>
          )}
          <div className="flex items-center">{user.username}</div>
          <button className="capitalize" type="button" onClick={logoutHandler}>
            {t('log out')}
          </button>
        </menu>
        <button
          className={`flex ${
            !collapseMenu ? 'hidden' : ''
          } md:hidden bg-white-400`}
          onClick={toggleMenu}
        >
          <div className="space-y-2" id="h-menu">
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
          id="country_btn"
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
      <Outlet context={{ statState }} />
    </div>
  );
};

export default Dashboard;
