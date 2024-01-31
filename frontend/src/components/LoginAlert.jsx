import { useNavigate } from "react-router-dom";

const LoginAlert = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="login-alert">
        Log in for additional features.
        <br />
        {/* <button className="login-btn" onClick={navigateToLogin}>
          Login
        </button> */}
        <div className="btn btn__secondary" onClick={navigateToLogin}>
          <p>Login</p>
        </div>
      </div>
    </>
  );
};

export default LoginAlert;
