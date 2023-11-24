import React from 'react';
import './App.css';
import CreateUser from "./components/CreateUser/CreateUser";
import GetUsers from "./components/GetUsers/GetUsers";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <CreateUser />
          <GetUsers/>
      </header>
    </div>
  );
}

export default App;