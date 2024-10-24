import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './Header';
import { Catalog } from './Catalog';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Catalog />} />
      </Route>
    </Routes>
  );
}

export default App;
