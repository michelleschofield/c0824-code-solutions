import { FaCircle, FaRegCircle } from 'react-icons/fa';

type Props = {
  active: boolean;
  onClick: () => void;
};

export function DotButton({ active, onClick }: Props) {
  return (
    <button onClick={onClick} className="dot">
      {active ? <FaRegCircle /> : <FaCircle />}
    </button>
  );
}
