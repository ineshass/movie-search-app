function Inputs({ email, setEmail, pswd, setPswd, isPasswordShown, setIsPasswordShown }) {
  return (
    <>
      <div className="input-wrapper">
        <input
          type="email"
          placeholder="Enter your e-mail"
          className="input-field"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <i className="material-symbols-rounded">mail</i>
      </div>

      <div className="input-wrapper">
        <input
          type={isPasswordShown ? "text" : "password"}
          placeholder="Enter your password"
          className="input-field"
          required
          value={pswd}
          onChange={(e) => setPswd(e.target.value)}
        />
        <i className="material-symbols-rounded">lock</i>
        <i
          onClick={() => setIsPasswordShown(prev => !prev)}
          className="material-symbols-rounded eye-icon"
        >
          {isPasswordShown ? "visibility_off" : "visibility"}
        </i>
      </div>
    </>
  );
}

export default Inputs;
