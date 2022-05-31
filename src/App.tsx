import {
  Login,
  Registration,
  Reset,
  NewPassword,
  Confirmation,
  Recovery,
} from 'pages';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="h-full">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/recovery" element={<Recovery />} />
      </Routes>
    </div>
  );
}

export default App;
