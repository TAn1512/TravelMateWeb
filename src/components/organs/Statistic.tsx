import { useEffect, useState } from "react";
import { db } from "../../config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Statistic: React.FC = () => {
  const [viewMode, setViewMode] = useState("week"); // "week", "month", "year"
  const [chartData, setChartData] = useState<
    { name: string; value: number; revenue: number }[]
  >([]);
  const [userStats, setUserStats] = useState({
    users: 0,
    premiumUsers: 0,
    posts: 0,
    userTrips: 0,
    revenue: 0,
  });
  const [pieData, setPieData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    fetchData();
  }, [viewMode]);

  const fetchData = async () => {
    try {
      const now = new Date();
      const usersSnapshot = await getDocs(collection(db, "users"));
      const postsSnapshot = await getDocs(collection(db, "posts"));
      const tripsSnapshot = await getDocs(collection(db, "UserTrips"));
      const premiumSnapshot = await getDocs(collection(db, "PremiumStatistic"));

      let totalUsers = usersSnapshot.size;
      let totalPosts = postsSnapshot.size;
      let totalTrips = tripsSnapshot.size;
      let premiumUsers = 0;
      let revenue = 0;
      let dataMap: { [key: string]: { value: number; revenue: number } } = {};
      let rangeKeys = generateRangeKeys(now, viewMode);
      let planCount: { [key: string]: number } = { month: 0, year: 0 };

      premiumSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data.status === "confirmed") {
          const createdAt = new Date(data.date);
          let key = getTimeKey(createdAt, viewMode);
          if (rangeKeys.includes(key)) {
            if (!dataMap[key]) {
              dataMap[key] = { value: 0, revenue: 0 };
            }
            dataMap[key].value += 1;
            dataMap[key].revenue +=
              data.selectedPlan === "month" ? 19000 : 169000;
            if (data.status === "confirmed") {
              planCount[data.selectedPlan] =
                (planCount[data.selectedPlan] || 0) + 1;
            }
          }
          premiumUsers++;
          revenue += data.selectedPlan === "month" ? 19000 : 169000;
        }
      });

      rangeKeys.forEach((key) => {
        if (!dataMap[key]) dataMap[key] = { value: 0, revenue: 0 };
      });

      setUserStats({
        users: totalUsers,
        premiumUsers,
        posts: totalPosts,
        userTrips: totalTrips,
        revenue,
      });
      setChartData(
        rangeKeys.map((key) => ({
          name: key,
          value: dataMap[key].value,
          revenue: dataMap[key].revenue,
        }))
      );

      setPieData([
        { name: "Gói tháng", value: planCount.month },
        { name: "Gói năm", value: planCount.year },
      ]);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thống kê:", error);
    }
  };

  const generateRangeKeys = (now: Date, mode: string) => {
    let keys: string[] = [];
    if (mode === "week") {
      for (let i = -2; i <= 2; i++) {
        let weekDate = new Date(now);
        weekDate.setDate(now.getDate() + i * 7);
        keys.push(`Tuần ${getWeekNumber(weekDate)}`);
      }
    } else if (mode === "month") {
      for (let i = -2; i <= 2; i++) {
        let month = new Date(now);
        month.setMonth(now.getMonth() + i);
        keys.push(`Tháng ${month.getMonth() + 1}`);
      }
    } else if (mode === "year") {
      for (let i = -2; i <= 2; i++) {
        let year = now.getFullYear() + i;
        keys.push(`${year}`);
      }
    }
    return keys;
  };

  const getTimeKey = (date: Date, mode: string) => {
    if (mode === "week") return `Tuần ${getWeekNumber(date)}`;
    if (mode === "month") return `Tháng ${date.getMonth() + 1}`;
    return `${date.getFullYear()}`;
  };

  const getWeekNumber = (date: Date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDays = Math.floor(
      (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
  };

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4">Thống kê</h2>

      {/* Thống kê chung */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded shadow">
          <h3 className="text-lg font-bold">Tổng Users</h3>
          <p className="text-2xl">{userStats.users}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <h3 className="text-lg font-bold">Tổng Premium Users</h3>
          <p className="text-2xl">{userStats.premiumUsers}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow">
          <h3 className="text-lg font-bold">Tổng số bài Post</h3>
          <p className="text-2xl">{userStats.posts}</p>
        </div>
        <div className="p-4 bg-purple-100 rounded shadow">
          <h3 className="text-lg font-bold">Tống số chuyến đi đã tạo</h3>
          <p className="text-2xl">{userStats.userTrips}</p>
        </div>
        <div className="p-4 bg-red-100 rounded shadow">
          <h3 className="text-lg font-bold">Tổng doanh thu</h3>
          <p className="text-2xl">{userStats.revenue.toLocaleString()} đ</p>
        </div>
      </div>

      <div className="flex gap-3 mb-6 sticky">
        {["week", "month", "year"].map((mode) => (
          <button
            key={mode}
            className={`px-4 py-2 rounded ${
              viewMode === mode
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setViewMode(mode)}
          >
            {mode === "week" ? "Tuần" : mode === "month" ? "Tháng" : "Năm"}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4">
          Số Premium Users theo{" "}
          {viewMode === "week"
            ? "Tuần"
            : viewMode === "month"
            ? "Tháng"
            : "Năm"}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">
          Doanh thu theo{" "}
          {viewMode === "week"
            ? "Tuần"
            : viewMode === "month"
            ? "Tháng"
            : "Năm"}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Biểu đồ tròn */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4">Tỷ lệ gói Premium</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={100} label>
              <Cell fill="#8884d8" />
              <Cell fill="#82ca9d" />
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistic;
