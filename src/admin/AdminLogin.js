import axios from "axios";
import { useState } from "react";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/admin/login",
      { email, password }
    );

    localStorage.setItem("token", res.data.token);
    window.location = "/dashboard";
  };

  return (
    <div>
      <h2>Admin Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default AdminLogin;