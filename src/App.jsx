import { Routes, Route } from 'react-router-dom';
import Home from './pages/user/Home';
import Listing from './pages/user/Listing';
import DetailedView from './pages/user/DetailedView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/listing" element={<Listing />} />
      <Route path="/hotel/:id" element={<DetailedView />} />
    </Routes>
  );
}

export default App;
