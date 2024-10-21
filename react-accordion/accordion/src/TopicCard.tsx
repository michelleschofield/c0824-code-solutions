type Topic = {
  id: number;
  title: string;
  content: string;
};

type Props = {
  topic: Topic;
  active: boolean;
  onClick: (id: number) => void;
};

export function TopicCard({ topic, active, onClick }: Props) {
  return (
    <>
      <div onClick={() => onClick(topic.id)} className="topic-header">
        <h3>{topic.title}</h3>
      </div>
      {active && (
        <div className="topic-content">
          <p>{topic.content}</p>
        </div>
      )}
    </>
  );
}
