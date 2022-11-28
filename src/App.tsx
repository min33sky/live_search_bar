import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

export default function App() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-tr from-indigo-500 to-indigo-300">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
