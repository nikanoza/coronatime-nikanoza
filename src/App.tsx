import {
  Login,
  Registration,
  Reset,
  NewPassword,
  Confirmation,
  Recovery,
} from 'pages';
import { Navigate, Route, Routes } from 'react-router-dom';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Translations } from 'components';

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
      </Routes>
    </div>
  );
}

export default App;
