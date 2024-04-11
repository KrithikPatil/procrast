import './App1.css';
import { useLocation } from 'react-router-dom';
import Landing from "./components/timermain/Landing"
import DigitalClock from "./components/timermain/DigitalClock"
import Timer from "./components/timermain/Timer"
import Tnavbar from './components/timermain/Tnavbar';

function App1() {
  const location = useLocation();
  const email = location.state.email;
  const name = location.state.id;
  return (
    <div className="App1">
      <Tnavbar email = {email} displayName = {name}/>
      {/* <Landing /> */}
      <DigitalClock />
      <Timer email = {email} displayName = {name} />

    </div>
  );
}

export default App1;
