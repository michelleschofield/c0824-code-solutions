import { Link, Outlet } from 'react-router-dom';

export function Header() {
  return (
    <>
      <div className="flex border-t-8 border-blue-800 bg-slate-800 text-white p-2">
        <Link className="m-2" to="/about">
          About
        </Link>
        <Link className="m-2" to="/">
          Catalog
        </Link>
      </div>
      <div className="bg-gray-100 h-full">
        <Outlet />
      </div>
    </>
  );
}
