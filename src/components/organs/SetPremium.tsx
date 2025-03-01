import { useState } from "react";
import { db } from "../../config/FirebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";

const SetPremium: React.FC = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!code) {
      alert("Vui lòng nhập mã!");
      return;
    }

    setLoading(true);

    try {
      // Truy vấn Firestore để tìm paymentCode trong premiumOrder
      const q = query(
        collection(db, "premiumOrder"),
        where("paymentCode", "==", code)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        const { userId, selectedPlan } = docSnap.data();

        // Cập nhật isPremium thành true cho userId đó
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { isPremium: true });

        // Ghi dữ liệu vào PremiumStatistic
        await addDoc(collection(db, "PremiumStatistic"), {
          userId,
          date: new Date().toISOString(), // Ngày nâng cấp
          selectedPlan, // Gói premium (tháng/năm)
          paymentCode: code, // Mã thanh toán
          status: "confirmed", // Trạng thái xác nhận
        });

        alert("Tài khoản đã được nâng cấp lên Premium!");
      } else {
        alert("Mã không hợp lệ!");
      }
    } catch (error) {
      console.error("Lỗi khi xác nhận mã:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4">Set Premium Account</h2>
      <p className="mb-4">Nhập mã để nâng cấp tài khoản lên Premium.</p>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border p-2 rounded w-full mb-4"
        placeholder="Nhập mã..."
      />
      <button
        onClick={handleConfirm}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Xác nhận"}
      </button>
    </div>
  );
};

export default SetPremium;
