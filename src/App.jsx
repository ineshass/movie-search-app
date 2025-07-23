import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";

function App() {
  const user = JSON.parse(localStorage.getItem("googleUser"));
  const email = localStorage.getItem("emailData");
  const pswd = localStorage.getItem("pswdData");

  return (user || (email && pswd)) ? <Home /> : <Login />;

  
}

export default App;
