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

  return (
    <div className="accordion">
      {topics.map((topic) => (
        <TopicCard
          active={topic.id === selected}
          topic={topic}
          onSelected={(id) => setSelected(id)}
          onClosed={() => setSelected(undefined)}
          key={topic.id}
        />
      ))}
    </div>
  );
}
