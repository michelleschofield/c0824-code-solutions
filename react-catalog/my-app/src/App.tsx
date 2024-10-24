import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './Header';
import { Catalog } from './Catalog';
import { Details } from './Details';
import { About } from './About';
import { NotFound } from './NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Catalog />} />
        <Route path="details/:productId" element={<Details />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
