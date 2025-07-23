import { useState } from "react";
import "./Login.css";
import Googlelogin from "./logincomponents/Googlelogin.jsx";
import Inputs from "./logincomponents/Inputs.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "test@gmail.com" && pswd === "azerty") {
      localStorage.setItem("emailData", email);
      localStorage.setItem("pswdData", pswd);
      window.location.reload();
    } else {
      alert("❌Incorrect email or password❌");
    }
  };

  const getEmail = localStorage.getItem("emailData");
  const getPswd = localStorage.getItem("pswdData");

  if (isLoggedIn || (getEmail && getPswd)) {
    return null; // App.jsx will show <Home />
  }

  return (
    <div className="body">
      <div className="login-container">
        <h2 className="form-title">Sign In</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <Inputs
            email={email}
            setEmail={setEmail}
            pswd={pswd}
            setPswd={setPswd}
            isPasswordShown={isPasswordShown}
            setIsPasswordShown={setIsPasswordShown}
          />
          <button type="submit" className="login-button">Log In</button>
          <a href="#" className="forgot-pass-link">Forgot Password?</a>
        </form>
        <Googlelogin />
        <p className="signup-txt">
          Don't have an account? <a href="#">Sign up now</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
