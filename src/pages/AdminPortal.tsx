
import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

import { Pie, Doughnut } from "react-chartjs-2";
import { ArcElement } from "chart.js";
ChartJS.register(ArcElement);

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);
import AdminHomeManager from "../components/admin/AdminHomeManager";
import AdminBlogManager from "../components/admin/AdminBlogManager";
import AdminShopManager from "../components/admin/AdminShopManager";
import AdminSupportManager from "../components/admin/AdminSupportManager";
import AdminSettingsManager from "../components/admin/AdminSettingsManager";
import AdminReferringManager from "../components/admin/AdminReferringManager";
import AdminInvestmentManager from "../components/admin/AdminInvestmentManager";
import AdminFeedbackManager from "../components/admin/AdminFeedbackManager";
import AdminEmploymentManager from "../components/admin/AdminEmploymentManager";
import AdminBuyCryptoManager from "../components/admin/AdminBuyCryptoManager";
import "../i18n";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

const screens = [
  { label: "Dashboard", key: "dashboard", icon: "📊" },
//   { label: "Home", key: "home", icon: "🏠" },
//   { label: "Blog", key: "blog", icon: "📝" },
  { label: "Shop", key: "shop", icon: "🛒" },
  { label: "Support", key: "support", icon: "💬" },
  { label: "Settings", key: "settings", icon: "⚙️" },
  { label: "Referring", key: "referring", icon: "🔗" },
  { label: "Investment", key: "investment", icon: "💹" },
  { label: "Feedback", key: "feedback", icon: "⭐" },
  { label: "Employment", key: "employment", icon: "👔" },
  { label: "BuyCrypto", key: "buycrypto", icon: "💰" },
];

const AdminPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { t } = useTranslation();

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        // Example data
        const barData = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "New Users",
              data: [65, 59, 80, 81, 56, 55],
              backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
            {
              label: "Active Users",
              data: [40, 45, 60, 70, 50, 48],
              backgroundColor: "rgba(255, 206, 86, 0.6)",
            },
          ],
        };
        const lineData = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Revenue ($)",
              data: [1200, 1900, 1700, 2200, 2000, 2500],
              fill: false,
              borderColor: "rgba(255, 99, 132, 1)",
              tension: 0.1,
            },
            {
              label: "Expenses ($)",
              data: [800, 1200, 1100, 1500, 1300, 1600],
              fill: false,
              borderColor: "rgba(54, 162, 235, 1)",
              tension: 0.1,
            },
          ],
        };
        const pieData = {
          labels: ["Bitcoin", "Ethereum", "USDT", "Other"],
          datasets: [
            {
              label: "Crypto Distribution",
              data: [40, 30, 20, 10],
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)"
              ],
            },
          ],
        };
        const doughnutData = {
          labels: ["Completed", "Pending", "Failed"],
          datasets: [
            {
              label: "Transactions",
              data: [70, 20, 10],
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(255, 99, 132, 0.6)"
              ],
            },
          ],
        };
        return (
          <div>
            <h2 className="text-2xl bg-background text-foreground font-semibold mb-4">Site Analytics Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-background text-foreground rounded shadow p-4">
                <h3 className="text-lg font-bold mb-2">New vs Active Users</h3>
                <Bar data={barData} />
              </div>
              <div className="bg-background text-foreground rounded shadow p-4">
                <h3 className="text-lg font-bold mb-2">Revenue & Expenses Over Time</h3>
                <Line data={lineData} />
              </div>
              <div className="bg-background text-foreground rounded shadow p-4">
                <h3 className="text-lg font-bold mb-2">Crypto Distribution</h3>
                <Pie data={pieData} />
              </div>
              <div className="bg-background text-foreground rounded shadow p-4">
                <h3 className="text-lg font-bold mb-2">Transaction Status</h3>
                <Doughnut data={doughnutData} />
              </div>
            </div>
          </div>
        );
      case "home":
        return <AdminHomeManager />;
      case "blog":
        return <AdminBlogManager />;
      case "shop":
        return <AdminShopManager />;
      case "support":
        return <AdminSupportManager />;
      case "settings":
        return <AdminSettingsManager />;
      case "referring":
        return <AdminReferringManager />;
      case "investment":
        return <AdminInvestmentManager />;
      case "feedback":
        return <AdminFeedbackManager />;
      case "employment":
        return <AdminEmploymentManager />;
      case "buycrypto":
        return <AdminBuyCryptoManager />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-background text-foreground shadow-lg flex flex-col py-8 px-4">
        <h1 className="text-2xl font-bold mb-8 text-blue-700">{t('dashboard')}</h1>
        <LanguageSwitcher />
        <nav className="flex-1">
          {screens.map((screen) => (
            <button
              key={screen.key}
              className={`w-full flex bg-gray-700 items-center gap-3 px-4 py-3 mb-2 rounded-lg text-left transition-all duration-150 font-medium ${activeTab === screen.key ? "bg-yellow-600 text-white" : "bg-gray-100 text-gray-200 hover:bg-blue-100"}`}
              onClick={() => setActiveTab(screen.key)}
            >
              <span className="text-xl text-white">{screen.icon}</span>
              {t(screen.key)}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default AdminPortal;
