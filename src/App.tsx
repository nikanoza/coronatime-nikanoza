import {
  Login,
  Registration,
  Reset,
  NewPassword,
  Confirmation,
  SentInfo,
  Dashboard,
} from 'pages';
import { Navigate, Route, Routes } from 'react-router-dom';
import { World, Country } from 'pages/Dashboard';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import common_geo from 'locales/geo.json';

i18next.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: false,
  resources: {
    geo: { translation: common_geo },
  },
});

function App() {
  const language = localStorage.getItem('language');
  if (language) {
    i18next.changeLanguage(language);
  }
  // const loginStatus = JSON.parse(localStorage.getItem('user') || '').login;
  return (
    <div className="h-full">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/sent-info" element={<SentInfo />} />
        <Route key="/dashboard" path="/dashboard" element={<Dashboard />}>
          <Route path="world" element={<World />} />
          <Route key="country" path="country" element={<Country />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
