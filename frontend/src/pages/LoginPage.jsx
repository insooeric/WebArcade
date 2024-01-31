import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
// import { displaySample } from "../components/dataList";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const [register] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error("Invalid Email or Password");
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        toast.error("Please fill in all of the fields.");
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    // sessionStorage.setItem("activeRoute", "/");
    const loginBtn = document.getElementById("login");
    const signupBtn = document.getElementById("signup");

    loginBtn.addEventListener("click", (e) => {
      let parent = e.target.parentNode.parentNode;
      Array.from(e.target.parentNode.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
          parent.classList.add("slide-up");
        } else {
          signupBtn.parentNode.classList.add("slide-up");
          parent.classList.remove("slide-up");
        }
      });
    });

    signupBtn.addEventListener("click", (e) => {
      let parent = e.target.parentNode;
      Array.from(e.target.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
          parent.classList.add("slide-up");
        } else {
          loginBtn.parentNode.parentNode.classList.add("slide-up");
          parent.classList.remove("slide-up");
        }
      });
    });
  }, []);
  return (
    <div className="login-page">
      <div className="form-structor">
        {/* Sign Up */}
        <div className="signup">
          <h2 className="form-title" id="signup">
            <span>or</span>Sign up
          </h2>
          <form onSubmit={registerHandler}>
            <div className="form-holder">
              <input
                type="text"
                className="input"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {isLoading && <Loader />}
            <button type="submit" className="submit-btn" value="Submit">
              Sign Up
            </button>
          </form>
        </div>
        {/* Sign In */}
        <div className="login slide-up">
          <form className="center" onSubmit={loginHandler}>
            <h2 className="form-title" id="login">
              <span>or</span>Log in
            </h2>
            <div className="form-holder">
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {isLoading && <Loader />}
            <button type="submit" className="submit-btn" value="Submit">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
