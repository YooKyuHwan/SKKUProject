import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import TeamStat from './components/TeamStat';
import BarChart from './components/BarChart';
import HexagonalChart from './components/PlayerChart';
import PlayerChart from './components/PlayerChart';

function App() {
  return (
    <div className="App">
      <Header className='header_app'></Header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/team/stat' element={<TeamStat></TeamStat>}></Route>
          <Route path='/barchart' element={<BarChart></BarChart>}></Route>
          <Route path='/playerchart' element={<PlayerChart></PlayerChart>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
