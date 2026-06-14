import { useAuth } from '../context/AuthContext';
import { FaCalendarAlt, FaMailBulk, FaShieldAlt, FaUser } from "react-icons/fa";

const Dashboard = () => {
  const { user } = useAuth();
  const infoCards = [
    {
      icon: <FaUser className="text-2xl" />,
      label: 'Full Name',
      value: user?.name || 'N/A',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <FaMailBulk className="text-2xl" />,
      label: 'Email Address',
      value: user?.email || 'N/A',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      label: 'Account Status',
      value: 'Active & Verified',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <FaCalendarAlt className="text-2xl" />,
      label: 'Member Since',
      value: user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : 'N/A',
      color: 'bg-yellow-100 text-yellow-600',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold"> Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
        <p className="mt-2 text-blue-100">
          Here is your account overview. Everything looks great!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {
            infoCards.map((card, index) => (
            <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start gap-4 
                hover:shadow-md transition"
            >
                <div className={`p-3 rounded-lg ${card.color}`}>{card.icon}</div>
                <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    {card.label}
                </p>
                <p className="text-gray-800 font-semibold mt-0.5">{card.value}</p>
                </div>
            </div>
            ))
        }
      </div>
    </div>
  );
};

export default Dashboard;