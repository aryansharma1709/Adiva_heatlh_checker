import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react';

const getGenderSpecificQuestions = (gender) => {
  const femaleSpecificQuestions = {
    "Menstrual Health": [
      {
        question: "How regular is your menstrual cycle?",
        options: ["Regular (28-30 days)", "Somewhat irregular", "Very irregular"],
        scores: [10, 5, 0]
      },
      {
        question: "How do you manage your menstrual hygiene?",
        options: [
          "Change products every 4-6 hours & use proper products",
          "Change products every 6-8 hours",
          "Change products less frequently"
        ],
        scores: [10, 5, 0]
      },
      {
        question: "How do you manage menstrual pain?",
        options: [
          "Mild/No pain or proper management",
          "Moderate pain with some management",
          "Severe pain with poor management"
        ],
        scores: [10, 5, 0]
      }
    ],
    "Personal Care": [
      {
        question: "How often do you maintain personal hygiene?",
        options: [
          "Daily bath with clean water and soap",
          "Skip occasionally",
          "Irregular bathing habits"
        ],
        scores: [10, 5, 0]
      },
      {
        question: "What are your hand washing habits?",
        options: [
          "Always use soap and water",
          "Sometimes use soap and water",
          "Rarely use soap and water"
        ],
        scores: [10, 5, 0]
      },
      {
        question: "How much water do you consume daily?",
        options: [
          "8 or more glasses daily",
          "5-7 glasses daily",
          "Less than 5 glasses daily"
        ],
        scores: [10, 5, 0]
      }
    ],
    "Lifestyle": [
      {
        question: "How often do you exercise?",
        options: [
          "Regular exercise (3+ times/week)",
          "Occasional exercise (1-2 times/week)",
          "Rarely or never exercise"
        ],
        scores: [10, 5, 0]
      },
      {
        question: "What is your sleep pattern?",
        options: [
          "7-9 hours regularly",
          "5-7 hours or irregular",
          "Less than 5 hours"
        ],
        scores: [10, 5, 0]
      },
      {
        question: "How would you rate your diet quality?",
        options: [
          "Balanced diet with fruits and vegetables daily",
          "Moderately balanced diet",
          "Poor diet with frequent junk food"
        ],
        scores: [10, 5, 0]
      }
    ],
    "Healthcare": [
      {
        question: "How often do you have health check-ups?",
        options: [
          "Annual gynecological check-up",
          "Occasional check-ups",
          "No regular check-ups"
        ],
        scores: [10, 5, 0]
      },
      {
        question: "How would you describe your mental health?",
        options: [
          "Rarely stressed/anxious",
          "Sometimes stressed/anxious",
          "Often stressed/anxious"
        ],
        scores: [10, 5, 0]
      }
    ],
    "Hygiene & Prevention": [
      {
        question: "What are your sanitation practices?",
        options: [
          "Access to clean, private toilet and proper disposal",
          "Shared facilities with decent hygiene",
          "Poor sanitation facilities"
        ],
        scores: [10, 5, 0]
      },
      {
        question: "How do you monitor your reproductive health?",
        options: [
          "Regular self-examinations and awareness of changes",
          "Occasional awareness and checks",
          "No self-monitoring"
        ],
        scores: [10, 5, 0]
      },
      {
        question: "What are your intimate hygiene practices?",
        options: [
          "Regular cleaning with appropriate products",
          "Basic cleaning without specific products",
          "Poor intimate hygiene practices"
        ],
        scores: [10, 5, 0]
      },
      {
        question: "How do you approach preventive healthcare?",
        options: [
          "Regular breast self-exams and vaccinations up to date",
          "Occasional self-exams and some vaccinations",
          "No preventive care practices"
        ],
        scores: [10, 5, 0]
      }
    ]
  };

  // Return only female questions since we're focusing on female health assessment
  return femaleSpecificQuestions;
};

const Questionnaire = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [expandedSection, setExpandedSection] = useState(null);
  const [questions, setQuestions] = useState({});
  
  useEffect(() => {
    const questions = getGenderSpecificQuestions('Female');
    setQuestions(questions);
    setExpandedSection("Menstrual Health");
  }, []);

  const handleAnswer = (section, questionIndex, score) => {
    setAnswers(prev => ({
      ...prev,
      [`${section}-${questionIndex}`]: score
    }));
  };

  const calculateScore = () => {
    const scores = Object.values(answers);
    return scores.reduce((sum, score) => sum + score, 0);
  };

  const handleSubmit = () => {
    const totalScore = calculateScore();
    localStorage.setItem('healthScore', totalScore);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Women's Health Assessment</h1>
          
          {Object.entries(questions).map(([section, sectionQuestions]) => (
            <div key={section} className="mb-6">
              <button
                onClick={() => setExpandedSection(expandedSection === section ? null : section)}
                className="w-full flex items-center justify-between p-4 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors"
              >
                <span className="text-xl font-semibold text-gray-700">{section}</span>
                {expandedSection === section ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
              </button>
              
              {expandedSection === section && (
                <div className="mt-4 space-y-6 p-4">
                  {sectionQuestions.map((q, qIndex) => (
                    <div key={qIndex} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-lg font-medium text-gray-700 mb-3">{q.question}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {q.options.map((option, i) => (
                          <button
                            key={i}
                            onClick={() => handleAnswer(section, qIndex, q.scores[i])}
                            className={`p-3 rounded-lg transition-colors ${
                              answers[`${section}-${qIndex}`] === q.scores[i]
                                ? 'bg-pink-500 text-white'
                                : 'bg-white border border-gray-200 hover:bg-pink-50'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors shadow-md"
          >
            Submit Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;