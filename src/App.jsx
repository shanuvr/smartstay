import { Routes, Route } from 'react-router-dom';
import Home from './pages/user/Home';
import Listing from './pages/user/Listing';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/listing" element={<Listing />} />
    </Routes>
  );
}

export default App;
