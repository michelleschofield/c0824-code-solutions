import { Link } from 'react-router-dom';
import { type MenuItem } from './AppDrawer';

type Props = {
  menuItem: MenuItem;
  isOpen: boolean;
};

export function MenuItem({ menuItem, isOpen }: Props) {
  const { name, path, iconUrl } = menuItem;
  return (
    <li className="inline-block py-2 w-full ">
      <Link className="w-full flex items-center" to={path}>
        <img className="w-8 h-8" src={iconUrl} />
        {isOpen && <p className="px-2">{name}</p>}
      </Link>
    </li>
  );
}
