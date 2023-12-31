import { Outlet } from "react-router-dom";
import Header from "./components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default App;
