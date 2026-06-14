import { Outlet } from "react-router-dom";
import { Navbar } from "../components/common/Navbar.jsx";
import { Footer } from "../components/common/Footer.jsx";
import "../styles/mainLayout.scss";
import { Banner } from "../components/common/Banner.jsx";
const MainLayout = () => {
  return (
    <>
      <div className="mainLayoutContainer">
        <header className="headerContainer">
          <Banner />
          <Navbar />
        </header>
        <main className="mainContainer">
          <Outlet />
        </main>
        <footer className="footerContainer">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default MainLayout;
