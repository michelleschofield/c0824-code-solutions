type Image = {
  src: string;
  alt: string;
};

type Props = {
  image: Image;
};

export function ImageDisplay({ image }: Props) {
  const { src, alt } = image;
  return (
    <div className="image-wrapper">
      <img src={src} alt={alt} />
    </div>
  );
}
