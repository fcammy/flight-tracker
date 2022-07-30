import "./App.css";
import Departure from "./components/Departure";
import armoirie from "./armoirie.png";

function App() {
  return (
    <div className="App container mt-3">
      <h2 className="display-5">
        <img src={armoirie} alt="armoirie" className="armoirie" />
        Ahmed Sekou Toure Airport Departure & Arrival
      </h2>
      <Departure />
    </div>
  );
}

export default App;
