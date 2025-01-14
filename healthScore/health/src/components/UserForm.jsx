import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, Ruler, Weight, ChevronRight } from 'lucide-react';

function UserForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Female', // Fixed as Female
    weight: '',
    height: ''
  });

  const fields = [
    { name: 'name', type: 'text', icon: User, placeholder: 'Your full name', unit: '' },
    { name: 'age', type: 'number', icon: Calendar, placeholder: 'Your age', unit: 'years' },
    { name: 'weight', type: 'number', icon: Weight, placeholder: 'Your weight', unit: 'kg' },
    { name: 'height', type: 'number', icon: Ruler, placeholder: 'Your height', unit: 'cm' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userDetails', JSON.stringify(formData));
    navigate('/questionnaire');
  };

  const renderField = ({ name, type, icon: Icon, placeholder, unit }) => {
    const commonClasses = "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200";

    return (
      <div key={name} className="mb-6 relative">
        <label className="block text-gray-700 text-sm font-medium mb-2 capitalize">
          {name}
        </label>
        <div className="relative">
          <Icon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
          <div className="relative">
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className={commonClasses}
              required
              min={type === 'number' ? "0" : undefined}
            />
            {unit && (
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                {unit}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-pink-400 to-purple-500 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Women's Health Assessment</h1>
            <p className="text-pink-50 mt-2">Please fill in your information to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-2">
              {fields.map(renderField)}
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-6 rounded-xl font-medium
                hover:from-pink-600 hover:to-purple-600 transform hover:scale-[1.02] transition-all duration-200
                flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Continue to Health Assessment</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        </div>
        
        <p className="text-center text-gray-500 text-sm mt-4">
          Your data is securely stored and will only be used for health assessment
        </p>
      </div>
    </div>
  );
}

export default UserForm;