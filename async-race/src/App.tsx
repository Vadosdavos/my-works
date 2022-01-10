import { Header } from './components/Header/Header';
import { Garage } from './pages/garagePage/garage/Garage';
import './style.css';

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Garage />
      </main>
    </>
  );
};
