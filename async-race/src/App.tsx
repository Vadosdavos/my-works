import { Header } from './components/Header/Header';
import { Garage } from './pages/garagePage/garage/Garage';
import { Route, Routes } from 'react-router-dom';
import './style.css';
import { Winners } from './pages/winnersPage/Winners/Winners';

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Garage />} />
          <Route path='/winners' element={<Winners />} />
        </Routes>
      </main>
    </>
  );
};
