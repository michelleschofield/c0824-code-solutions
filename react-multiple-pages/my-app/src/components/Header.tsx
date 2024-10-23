import { Link, Outlet } from 'react-router-dom';

export function Header() {
  return (
    <div>
      <nav className="px-4 text-white bg-gray-900">
        <ul>
          <li className="inline-block py-2 px-4">
            <Link to="about">About</Link>
          </li>
          <li className="inline-block py-2 px-4">
            <Link to="dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
