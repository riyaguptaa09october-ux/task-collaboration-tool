import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);

  if (token === undefined) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  if (!token) {
    return <Login onLogin={setToken} />;
  }

  return <Dashboard />;
}

export default App;