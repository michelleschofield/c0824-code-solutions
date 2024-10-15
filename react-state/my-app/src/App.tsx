import { Header } from './Header';
import { Image } from './Image';
import { ImageCaption } from './ImageCaption';
import { ImageDescription } from './ImageDescription';
import { Button } from './Button';
import './App.css';
import { useState } from 'react';

const headerText = 'React Image Bank';
const imagesAndInfo = [
  {
    src: '/space-image-1.jpeg',
    caption: 'A gorgeous image of space',
    description:
      'A very colorful space photo. Lorem ipsum dolor sit amet. A colorful very a space colorful a colorful space a space colorful a photo colorful a photo photo. A very photo a very very a space colorful a very very a colorful very a photo photo. A photo space a photo space a very colorful a colorful colorful a photo photo. A very colorful a photo very a colorful space a space space a very photo a space colorful.',
  },
  {
    src: 'space-image-2.jpeg',
    caption: 'A nice image of space',
    description:
      'A very nice night sky. Lorem ipsum dolor sit amet. Sky nice nice sky very very sky nice night a night night. A very very a very nice sky night very a night very. Sky nice nice sky night very sky very nice sky night night.',
  },
  {
    src: 'space-image-3.jpeg',
    caption: 'A beautiful image of space',
    description:
      'Aa very nice nebula. Lorem ipsum dolor sit amet. A very very a nice nice a nebula nice a nice nebula? A nebula very a nice nebula a very very a very very a nice nebula a nebula nice a nebula nebula. A nice nebula a very very a nice very.',
  },
];

export function App() {
  const [index, setIndex] = useState(0);

  const { src, caption, description } = imagesAndInfo[index];
  const length = imagesAndInfo.length;

  function nextImage() {
    setIndex(index + 1 >= length ? 0 : index + 1);
  }

  function previousImage() {
    setIndex(index - 1 < 0 ? length - 1 : index - 1);
  }

  return (
    <>
      <Header text={headerText} />
      <Image src={src} />
      <ImageCaption caption={caption} />
      <ImageDescription desc={description} />
      <Button handleClick={nextImage} label="Next Image" />
      <Button handleClick={previousImage} label="Previous Image" />
    </>
  );
}
