import { FC, useState } from "react";
import { auth, db } from "../../config/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import Logo from "../../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";

interface User {
  avatar: string;
  email: string;
}

interface LoginModalProps {
  isLogin: boolean;
  onClose: () => void;
  handleLoginSuccess: any;
}

const LoginModal: FC<LoginModalProps> = ({
  isLogin,
  onClose,
  handleLoginSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!isLogin) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log(handleLoginSuccess);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      console.log(userId);
      const userDoc = doc(db, "users", userId);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        console.log(userData.isAdmin);
        if (userData.isAdmin) navigate("/dashboard");
        else {
          handleLoginSuccess({
            avatar: userData.avatar,
            fullName: userData.fullName,
          });
        }
      }

      onClose();
    } catch (err) {
      console.error(err);

      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md relative">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500"
        >
          ✖
        </button>

        <div className="text-center">
          <img className="mx-auto w-24" src={Logo} alt="logo" />
          <h4 className="mb-4 mt-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            We are The TravelMate
          </h4>
        </div>

        <form onSubmit={handleLogin}>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Please login to your account
          </p>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full rounded px-6 py-2.5 text-white font-medium uppercase transition bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
