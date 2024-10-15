import { Header } from './Header';
import { ImageContainer } from './ImageContainer';
import { ImageCaption } from './ImageCaption';
import { ImageDescription } from './ImageDescription';
import { ButtonContainer } from './ButtonContainer';
import './App.css';

const headerText = 'React Image Bank';
const urls = [
  '/space-image-1.jpeg',
  'space-image-2.jpeg',
  'space-image-3.jpeg',
];
const captions = [
  'A gorgeous image of space',
  'A nice image of space',
  'A beautiful image of space',
];
const descriptions = [
  'a very colorful space photo. Lorem ipsum dolor sit amet. A colorful very a space colorful a colorful space a space colorful a photo colorful a photo photo. A very photo a very very a space colorful a very very a colorful very a photo photo. A photo space a photo space a very colorful a colorful colorful a photo photo. A very colorful a photo very a colorful space a space space a very photo a space colorful.',
  'a very nice night sky. Lorem ipsum dolor sit amet. Sky nice nice sky very very sky nice night a night night. A very very a very nice sky night very a night very. Sky nice nice sky night very sky very nice sky night night.',
  'a very nice nebula. Lorem ipsum dolor sit amet. A very very a nice nice a nebula nice a nice nebula? A nebula very a nice nebula a very very a very very a nice nebula a nebula nice a nebula nebula. A nice nebula a very very a nice very.',
];
const buttonLabel = 'Next Image';

export function App() {
  return (
    <>
      <Header text={headerText} />
      <ImageContainer src={urls} />
      <ImageCaption caption={captions} />
      <ImageDescription desc={descriptions} />
      <ButtonContainer label={buttonLabel} />
    </>
  );
}
