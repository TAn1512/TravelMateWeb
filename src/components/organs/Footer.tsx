import { Image } from "../atoms/Image";
import logo from "../../assets/logo1.png";
import { Text } from "../atoms/Text";
import { FooterTexts } from "../particles/DataLists";
import { List } from "../atoms/List";
import { Link } from "react-router-dom";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
} from "@phosphor-icons/react";
import app from "../../assets/appdownload.png";
import DownloadModal from "./DownloadModal";
import { useState } from "react";
import { Button } from "../atoms/Button";

const Footer = () => {
  const [showDownload, setShowDownload] = useState(false); // Trạng thái mở modal Download
  const handleDownloadClick = () => setShowDownload(true);
  const closeDownload = () => setShowDownload(false);

  const handleClick = (e: any, url: any) => {
    if (url.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <footer className="w-full flex flex-col bg-white">
      <section className="w-full h-auto grid lg:grid-cols-5 md:grid-cols-3 lg:px-20 md:px-12 px-6 py-16 gap-7 md:gap-4 lg:gap-0">
        <div className="flex flex-col items-start gap-4">
          <Image className="w-28" image={logo} alt="Logo" as="a" href="/" />
          <Text className="text-sm text-color4" as="p">
            {FooterTexts.underLogoText}
          </Text>
        </div>

        <div className="flex flex-col md:items-center gap-4 md:mt-8">
          <Text className="text-xl text-color3" as="h2">
            {FooterTexts.quickLinks.caption}
          </Text>
          <ul className="flex flex-col gap-2">
            {FooterTexts.quickLinks.links.map((link, index) => (
              <List key={index} className="text-sm">
                <Link
                  to={link.url.startsWith("#") ? "/" : link.url}
                  onClick={(e) => handleClick(e, link.url)}
                  className="text-color4 transition-all duration-300 hover:underline"
                >
                  {link.name}
                </Link>
              </List>
            ))}
          </ul>
        </div>

        <div className="flex flex-col md:items-center gap-4 md:mt-8">
          <Text className="text-xl text-color3" as="h2">
            {FooterTexts.contacts.caption}
          </Text>
          <ul className="flex flex-col md:ml-12 gap-2">
            {FooterTexts.contacts.links.map((link, index) => (
              <List key={index} className="text-sm">
                <Link
                  to={link.url}
                  className="text-color4 transition-all duration-300 hover:underline"
                >
                  {link.name}
                </Link>
              </List>
            ))}
          </ul>
        </div>

        <div className="flex flex-col lg:items-center gap-4 md:mt-8">
          <Text className="text-xl text-color3" as="h2">
            {FooterTexts.more.caption}
          </Text>
          <ul className="flex flex-col gap-2 lg:ml-10">
            {FooterTexts.more.links.map((link, index) => (
              <List key={index} className="text-sm">
                <Link
                  to={link.url}
                  className="text-color4 transition-all duration-300 hover:underline"
                >
                  {link.name}
                </Link>
              </List>
            ))}
          </ul>
        </div>

        <div className="flex flex-col lg:items-center w-full md:mt-8 gap-4">
          <ul className="w-full flex items-center lg:justify-center gap-4">
            <List>
              <Link
                to={`https://www.facebook.com/profile.php?id=100075936157371`}
                className="text-color3 border-[1px] border-color3/50 p-2.5 flex rounded-full transition-all duration-300 ease-in hover:bg-gradient-to-tr from-color1 to-color2 hover:text-white"
              >
                <FacebookLogo size={15} color="currentColor" weight="fill" />
              </Link>
            </List>
            <List>
              <Link
                to={`https://www.instagram.com/travelmatebusinessvn/`}
                className="text-color3 border-[1px] border-color3/50 p-2.5 flex rounded-full transition-all duration-300 ease-in hover:bg-gradient-to-tr from-color1 to-color2 hover:text-white"
              >
                <InstagramLogo size={15} color="currentColor" weight="fill" />
              </Link>
            </List>
          </ul>

          <Text as="p" className="text-base font-light text-color4">
            Discover Our App
          </Text>
          <Button
            type="button"
            onClick={handleDownloadClick}
            className="outline-none border-none lg:px-7 px-5 py-3 bg-blue-600 text-white font-extralight rounded-lg"
          >
            Get app
          </Button>
        </div>
      </section>
      <Text className="text-center bg-color4 text-white text-xs py-6 font-light">
        Copyright 2025. Travel. All rights reserved.
      </Text>
      {showDownload && <DownloadModal onClose={closeDownload} />}{" "}
    </footer>
  );
};

export default Footer;
