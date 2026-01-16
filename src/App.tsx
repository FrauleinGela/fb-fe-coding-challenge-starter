import "./App.css";
import { Outlet } from "react-router";

function App() {
  return (
    <main className="app">
      <h1>Team Incident Dashboard - Starter Project</h1>
      <Outlet />
    </main>
  );
}

export default App;
