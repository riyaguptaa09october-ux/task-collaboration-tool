import { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    try {
      if (isRegister) {
        await axios.post("http://localhost:5000/api/auth/register", {
          name,
          email,
          password,
        });

        alert("Registration successful! Please login.");
        setIsRegister(false);
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      onLogin(res.data.token);
    } catch (err) {
      console.log(err);
      alert("Authentication failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{isRegister ? "Register" : "Login"} 🔐</h1>

      {isRegister && (
        <>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />
        </>
      )}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={submitHandler}>
        {isRegister ? "Register" : "Login"}
      </button>

      <br />
      <br />

      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister
          ? "Already have an account? Login"
          : "Create new account"}
      </button>
    </div>
  );
}