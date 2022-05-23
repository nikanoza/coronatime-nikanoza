import { Login } from 'pages';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="h-full">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
