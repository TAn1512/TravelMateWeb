import { FC } from "react";
import QRCode from "../../assets/QR.jpg";
import { List } from "../atoms/List";
import { Link } from "react-router-dom";
import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react";

interface DownloadModalProps {
  onClose: () => void;
}

const DownloadModal: FC<DownloadModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white flex items-center flex-col p-8 rounded-2xl shadow-lg max-w-sm text-center relative">
        {/* Nút Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">Tải Ứng Dụng</h1>
        <p className="text-gray-600 mb-6">
          Quét mã QR bên dưới để tải ứng dụng.
        </p>
        <div className=" h-44 w-44 p-4 bg-white border rounded-xl shadow">
          <img src={QRCode} alt="QR Code" className="w-full h-full" />
        </div>
        <p className="text-gray-600 mt-4">Nếu gặp vấn đề hãy liên hệ:</p>
        <ul className="w-full flex items-center lg:justify-center gap-4 mt-2">
          <List>
            <Link
              to={`https://www.facebook.com/profile.php?id=100075936157371`}
              className="text-color3 border-[1px] border-color3/50 p-2.5 flex rounded-full transition-all duration-300 ease-in hover:bg-gradient-to-tr from-blue-500 to-blue-400 hover:text-white"
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
      </div>
    </div>
  );
};

export default DownloadModal;
