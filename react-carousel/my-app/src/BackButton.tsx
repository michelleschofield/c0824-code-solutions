import { FaChevronLeft } from 'react-icons/fa6';

type Props = {
  onBack: () => void;
};

export function BackButton({ onBack }: Props) {
  return (
    <button onClick={onBack} className="arrow-button">
      <FaChevronLeft />
    </button>
  );
}
