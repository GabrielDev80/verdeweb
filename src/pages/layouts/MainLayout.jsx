import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/common/Navbar.jsx";
import { Footer } from "../../components/common/Footer.jsx";
import { Banner } from "../../components/common/Banner.jsx";

import "../styles/mainLayout.scss";

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
