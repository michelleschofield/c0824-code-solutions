import { Outlet } from 'react-router-dom';

export function Header() {
  return (
    <div>
      Header
      <Outlet />
    </div>
  );
}
