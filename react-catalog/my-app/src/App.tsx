import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './Header';
import { Catalog } from './Catalog';
import { Details } from './Details';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Catalog />} />
        <Route path="details/:productId" element={<Details />} />
      </Route>
    </Routes>
  );
}

export default App;
