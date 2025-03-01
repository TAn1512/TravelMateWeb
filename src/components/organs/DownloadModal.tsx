import { FC } from "react";
import QRCode from "../../assets/QR.jpg";

interface DownloadModalProps {
  onClose: () => void;
}

const DownloadModal: FC<DownloadModalProps> = ({ onClose }) => {
  const appDownloadLink =
    "https://www.facebook.com/profile.php?id=100075936157371"; // Link tải app

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
        <a
          href={appDownloadLink}
          className="text-blue-500 font-medium hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {appDownloadLink}
        </a>
      </div>
    </div>
  );
};

export default DownloadModal;
