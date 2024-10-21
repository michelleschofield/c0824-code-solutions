import { useState } from 'react';
import { TopicCard } from './TopicCard';

type Topic = {
  id: number;
  title: string;
  content: string;
};

type Props = {
  topics: Topic[];
};

export function Accordion({ topics }: Props) {
  const [selected, setSelected] = useState<number>();

  function handleClick(id: number) {
    if (id === selected) {
      setSelected(undefined);
    } else {
      setSelected(id);
    }
  }

  return (
    <div className="accordion">
      {topics.map((topic) => (
        <TopicCard
          active={topic.id === selected}
          topic={topic}
          onClick={handleClick}
          key={topic.id}
        />
      ))}
    </div>
  );
}
