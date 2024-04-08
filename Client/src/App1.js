import './App1.css';
import Landing from "./components/timermain/Landing"
import DigitalClock from "./components/timermain/DigitalClock"
import Timer from "./components/timermain/Timer"

function App1() {
  return (
    <div className="App1">
      <Landing />
      <DigitalClock />
      <Timer />

    </div>
  );
}

export default App1;
