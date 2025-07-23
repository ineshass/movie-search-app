import { jwtDecode } from "jwt-decode";

import { useEffect } from "react";

function Googlelogin() {
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google) {
        clearInterval(interval);

        window.google.accounts.id.initialize({
          client_id: "672820246019-0fgir9tn4o7ffj4581egtnbv315i070d.apps.googleusercontent.com",
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-signin"),
          { theme: "outline", size: "large" }
        );
      }
    }, 100);
  }, []);

  function handleCredentialResponse(response) {
    const user = jwtDecode(response.credential);

    localStorage.setItem("googleUser", JSON.stringify(user));
    alert(`✅ Welcome ${user.name}`);
    window.location.reload(); // refresh to re-render App
  }

  return (
    <div className="social-login">
      <div id="google-signin"></div>
    </div>
  );
}

export default Googlelogin;
