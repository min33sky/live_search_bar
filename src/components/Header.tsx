import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0  mx-auto w-10/12 max-w-2xl py-4">
      <nav className="">
        <ul className="flex space-x-4 text-xl font-bold text-slate-800">
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to={'/about'}>소개</Link>
          </li>
          <li>
            <Link to={'/error-test'}>에러</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
