import { FaChevronRight } from 'react-icons/fa';

type Props = {
  onNext: () => void;
};

export function NextButton({ onNext }: Props) {
  return (
    <button onClick={onNext} className="arrow-button">
      <FaChevronRight />
    </button>
  );
}
