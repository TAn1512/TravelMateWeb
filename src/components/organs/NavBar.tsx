import { useState, useEffect } from "react";
import { Image } from "../atoms/Image";
import { Button } from "../atoms/Button";
import Logo from "../../assets/logo1.png";
import { NavButtons, NavLinks } from "../particles/DataLists";
import { List } from "../atoms/List";
import { NavLink } from "react-router-dom";
// import { ArrowCircleRight, CirclesFour } from "@phosphor-icons/react";
import { Slide } from "react-awesome-reveal";
import LoginModal from "../organs/LoginModal";
import DownloadModal from "../organs/DownloadModal";

// interface User {
//   avatar: string;
//   fullName: string;
// }

const NavBar = () => {
  // const navigate = useNavigate();
  const [navBarColor, setNavBarColor] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleLoginClick = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);
  const handleDownloadClick = () => setShowDownload(true);
  const closeDownload = () => setShowDownload(false);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    closeLogin();
  };

  const handleClick = (e: any, url: any) => {
    if (url.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const listenScrollEvent = () => {
    window.scrollY > 10 ? setNavBarColor(true) : setNavBarColor(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <header className="w-full h-auto bg-transparent overflow-x-hidden fixed z-50 top-0 left-0">
      <Slide direction="down">
        <nav
          className={`w-full md:h-24 h-20 ${
            navBarColor ? "bg-white" : "bg-transparent"
          } lg:px-24 md:px-12 px-8 flex justify-between items-center`}
        >
          <Image
            as="a"
            href="/"
            className="md:h-12 h-12"
            image={Logo}
            alt="Logo"
          />
          <div className="lg:flex hidden items-center gap-20">
            <ul className="flex items-center justify-center gap-8">
              {NavLinks.map((navlink, index) => (
                <li key={index} className="w-full text-base">
                  <NavLink
                    to={navlink.url.startsWith("#") ? "/" : navlink.url}
                    onClick={(e) => handleClick(e, navlink.url)}
                    className="relative inline-block overflow-hidden pt-2 pl-2 before:w-2 before:h-2 before:bg-blue-600 before:absolute before:top-2 before:-left-10 before:rounded-full before:transition-all before:duration-200 before:ease-in hover:before:left-0.5 after:w-0.5 after:h-3 after:bg-blue-600 after:absolute after:left-1 after:-top-10 hover:after:top-3.5 after:transition-all after:duration-200 after:ease-in"
                  >
                    {navlink.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <ul className="flex items-center justify-center gap-6">
              {user ? (
                <div className="flex items-center gap-4">
                  <Image
                    className="h-10 w-10 rounded-full"
                    image={user.avatar}
                    alt="Avatar"
                  />
                  <span className="text-base">{user.fullName}</span>
                </div>
              ) : (
                NavButtons.map((navbutton, index) => (
                  <List className="w-full" key={index}>
                    <Button
                      onClick={
                        navbutton.name === "Login"
                          ? handleLoginClick
                          : handleDownloadClick
                      }
                      type="button"
                      className=" py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-blue-600 before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base"
                    >
                      {navbutton.name}
                    </Button>
                  </List>
                ))
              )}
            </ul>
          </div>
        </nav>
      </Slide>
      <LoginModal
        isLogin={showLogin}
        onClose={closeLogin}
        handleLoginSuccess={handleLoginSuccess}
      />
      {showDownload && <DownloadModal onClose={closeDownload} />}
    </header>
  );
};

export default NavBar;
