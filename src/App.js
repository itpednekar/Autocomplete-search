import logo from "./logo.svg";
import "./App.css";
import Search from "./Search";

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React Auto-Complete Search Box!</h2>
      <div className="app-component">
        <Search />
      </div>
    </div>
  );
}

export default App;
