type Topic = {
  id: number;
  title: string;
  content: string;
};

type Props = {
  topic: Topic;
  active: boolean;
  onSelected: (id: number) => void;
  onClosed: () => void;
};

export function TopicCard({ topic, active, onSelected, onClosed }: Props) {
  function handleClick() {
    if (active) {
      onClosed();
    } else {
      onSelected(topic.id);
    }
  }

  return (
    <>
      <div onClick={handleClick} className="topic-header">
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
