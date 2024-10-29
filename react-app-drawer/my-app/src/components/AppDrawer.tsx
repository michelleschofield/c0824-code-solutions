import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { MenuItemDisplay } from './MenuItemDisplay';

export type MenuItem = {
  name: string;
  iconUrl: string;
  path: string;
};

type Props = {
  menuItems: MenuItem[];
  heading: string;
};
export function AppDrawer({ menuItems, heading }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full">
      <nav
        className={`inline-block py-2 px-4 flex flex-col ${
          isOpen ? 'w-64' : 'w-20'
        }`}>
        <FaBars
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          size="40"
        />
        {isOpen && <h2 className="text-2xl">{heading}</h2>}
        <ul>
          {menuItems.map((menu) => (
            <MenuItemDisplay key={menu.name} menuItem={menu} isOpen={isOpen} />
          ))}
        </ul>
      </nav>
      <div className="grow">
        <Outlet />
      </div>
    </div>
  );
}
