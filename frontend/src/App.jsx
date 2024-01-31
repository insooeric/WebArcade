import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <NavBar />
      <div className="main-content">
        <ToastContainer />
        <div className="main-content-boundary">
          <Outlet />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default App;
