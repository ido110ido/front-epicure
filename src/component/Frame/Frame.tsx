import { Outlet, Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
const Frame = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Frame;
