import {
  Login,
  Registration,
  Reset,
  NewPassword,
  Confirmation,
  Recovery,
  SentInfo,
  Confirmed,
  Dashboard,
} from 'pages';
import { Navigate, Route, Routes } from 'react-router-dom';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Translations } from 'components';
import { World, Country } from 'pages/Dashboard/Routes';

i18next.use(initReactI18next).init({
  lng: 'en',
  debug: false,
  resources: {
    geo: {
      translation: {
        ...Translations.geo,
      },
    },
  },
});

function App() {
  const changeLanguage = (leng: string) => {
    i18next.changeLanguage(leng);
  };
  return (
    <div className="h-full">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={<Login changeLenguage={changeLanguage} />}
        />
        <Route
          path="/registration"
          element={<Registration changeLenguage={changeLanguage} />}
        />
        <Route path="/reset" element={<Reset />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/sent-info" element={<SentInfo />} />
        <Route path="/confirmed" element={<Confirmed />} />
        <Route
          key="/dashboard"
          path="/dashboard"
          element={<Dashboard changeLenguage={changeLanguage} />}
        >
          <Route path="world" element={<World />} />
          <Route key="country" path="country" element={<Country />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
