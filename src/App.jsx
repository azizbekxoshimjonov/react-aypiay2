import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Detalpage from './Components/Detalpage/Detalpage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/Detalpage' element={<Detalpage />} />
      </Routes>
    </div>
  );
}

export default App;
