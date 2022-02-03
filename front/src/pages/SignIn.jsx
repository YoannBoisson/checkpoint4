import React, {useState} from 'react';
import axios from "axios";
import "./signin.css";

export default function SignIn() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState("");

console.log(email, password)

  function handleConnection(email, password) {
    console.log(email, password)
    axios.post(
      "/auth/checkCredentials", { email: email, password: password }
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }

  return (
    <div className="box">
      <h2>Connexion</h2>
      <form>
        <div className="inputBox">
          <input
            type="email"
            name="email"
            required
            onkeyup="this.setAttribute('value', this.value);"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
        </div>
        <div className="inputBox">
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onkeyup="this.setAttribute('value', this.value);"
            //pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            //title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          />
          <label>Mot de passe</label>
        </div>
        <input
          type="submit"
          name="sign-in"
          value="Se connecter"
          onSubmit={handleConnection}
        />
      </form>
    </div>
  );
}
