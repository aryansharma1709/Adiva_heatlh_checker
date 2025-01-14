import { useMemo } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Heart, User, Weight, Ruler, Target } from 'lucide-react';

function Dashboard() {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const rawHealthScore = parseInt(localStorage.getItem('healthScore'));
  // Convert health score to percentage (150 -> 100)
  const healthScore = Math.round((rawHealthScore / 150) * 100);
  const { weight, height } = userDetails;
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Underweight', color: '#3B82F6' };
    if (bmi < 24.9) return { category: 'Normal', color: '#10B981' };
    if (bmi < 29.9) return { category: 'Overweight', color: '#F59E0B' };
    return { category: 'Obese', color: '#EF4444' };
  };

  const getHealthScoreCategory = (score) => {
    if (score >= 80) return { category: 'Excellent', color: '#10B981' };
    if (score >= 60) return { category: 'Good', color: '#3B82F6' };
    if (score >= 40) return { category: 'Fair', color: '#F59E0B' };
    return { category: 'Poor', color: '#EF4444' };
  };

  const bmiData = useMemo(() => {
    const bmiValue = parseFloat(bmi);
    return [
      { name: 'BMI', value: bmiValue },
      { name: 'Remaining', value: 40 - bmiValue }
    ];
  }, [bmi]);

  const healthScoreData = useMemo(() => {
    return [
      { name: 'Your Score', value: healthScore },
      { name: 'Remaining', value: 100 - healthScore }
    ];
  }, [healthScore]);

  const bmiCategory = getBMICategory(bmi);
  const healthCategory = getHealthScoreCategory(healthScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-4 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center mb-4">
                <User className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{userDetails.name}</h2>
              <p className="text-gray-500 mb-4">{userDetails.gender}, {userDetails.age} years</p>
              
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Weight className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-600">Weight</span>
                  </div>
                  <span className="font-semibold">{userDetails.weight} kg</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Ruler className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600">Height</span>
                  </div>
                  <span className="font-semibold">{userDetails.height} cm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BMI Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">BMI Score</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bmiData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill={bmiCategory.color} />
                      <Cell fill="#E5E7EB" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-4">
                <p className="text-3xl font-bold" style={{ color: bmiCategory.color }}>{bmi}</p>
                <p className="text-gray-500">{bmiCategory.category}</p>
              </div>
            </div>

            {/* Health Score Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Health Score</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={healthScoreData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill={healthCategory.color} />
                      <Cell fill="#E5E7EB" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-4">
                <p className="text-3xl font-bold" style={{ color: healthCategory.color }}>{healthScore}%</p>
                <p className="text-gray-500">{healthCategory.category}</p>
              </div>
            </div>
          </div>

          {/* Health Tips Section */}
          <div className="md:col-span-12 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <Activity className="w-8 h-8 text-blue-500 mb-2" />
                <h4 className="font-semibold mb-2">Physical Activity</h4>
                <p className="text-gray-600 text-sm">Aim for at least 30 minutes of moderate exercise daily.</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-xl">
                <Heart className="w-8 h-8 text-green-500 mb-2" />
                <h4 className="font-semibold mb-2">Healthy Diet</h4>
                <p className="text-gray-600 text-sm">Include more fruits, vegetables, and whole grains in your diet.</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-xl">
                <Target className="w-8 h-8 text-purple-500 mb-2" />
                <h4 className="font-semibold mb-2">Regular Check-ups</h4>
                <p className="text-gray-600 text-sm">Schedule regular health check-ups and screenings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;