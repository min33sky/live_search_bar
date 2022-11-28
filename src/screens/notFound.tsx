import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="grid h-screen place-items-center bg-slate-800 text-slate-100">
      <div className="flex flex-col space-y-6">
        <h1 className="text-center text-6xl">404</h1>
        <p className="text-lg">존재하지 않는 페이지입니다...</p>
        <Link
          to={'/'}
          className="w-fit self-center rounded-md bg-slate-600 py-4 px-4 text-center transition hover:bg-slate-700"
        >
          돌아가기
        </Link>
      </div>
    </div>
  );
}
