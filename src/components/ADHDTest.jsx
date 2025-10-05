import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    id: 1,
    text: "How often do you have trouble wrapping up final details once the challenging parts of a project are done?",
    category: "Organization"
  },
  {
    id: 2,
    text: "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
    category: "Organization"
  },
  {
    id: 3,
    text: "How often do you have problems remembering appointments or obligations?",
    category: "Memory"
  },
  {
    id: 4,
    text: "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?",
    category: "Attention"
  },
  {
    id: 5,
    text: "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
    category: "Hyperactivity"
  },
  {
    id: 6,
    text: "How often do you feel overly active and compelled to do things, like you were driven by a motor?",
    category: "Hyperactivity"
  },
  {
    id: 7,
    text: "How often do you make careless mistakes when you have to work on a boring or difficult project?",
    category: "Attention"
  },
  {
    id: 8,
    text: "How often do you have difficulty keeping your attention when you are doing boring or repetitive work?",
    category: "Attention"
  },
  {
    id: 9,
    text: "How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?",
    category: "Attention"
  },
  {
    id: 10,
    text: "How often do you misplace or have difficulty finding things at home or at work?",
    category: "Organization"
  },
  {
    id: 11,
    text: "How often are you distracted by activity or noise around you?",
    category: "Attention"
  },
  {
    id: 12,
    text: "How often do you leave your seat in meetings or other situations in which you are expected to remain seated?",
    category: "Hyperactivity"
  },
  {
    id: 13,
    text: "How often do you feel restless or fidgety?",
    category: "Hyperactivity"
  },
  {
    id: 14,
    text: "How often do you have difficulty unwinding and relaxing when you have time to yourself?",
    category: "Hyperactivity"
  },
  {
    id: 15,
    text: "How often do you find yourself talking too much when you are in social situations?",
    category: "Impulsivity"
  }
];

const ADHDTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);

  const options = [
    { label: 'Never', value: 0, emoji: '😊', color: 'from-green-400 to-green-500' },
    { label: 'Sometimes', value: 1, emoji: '🙂', color: 'from-yellow-400 to-yellow-500' },
    { label: 'Often', value: 2, emoji: '😐', color: 'from-orange-400 to-orange-500' },
    { label: 'Very Often', value: 3, emoji: '😟', color: 'from-red-400 to-red-500' }
  ];

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => answers.reduce((sum, answer) => sum + (answer || 0), 0);

  const getCategoryScores = () => {
    const categories = {};
    answers.forEach((answer, index) => {
      const category = questions[index].category;
      if (!categories[category]) {
        categories[category] = { score: 0, max: 0 };
      }
      categories[category].score += answer || 0;
      categories[category].max += 3;
    });
    return categories;
  };

  const getResult = (score) => {
    const maxScore = questions.length * 3;
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 70) {
      return {
        level: "High Likelihood",
        color: "from-red-500 to-pink-500",
        icon: "⚠️",
        description: "Your responses suggest a high likelihood of ADHD symptoms. We strongly recommend consulting with a healthcare professional for a comprehensive evaluation.",
        recommendations: [
          "Schedule an appointment with a psychiatrist or psychologist",
          "Keep a journal of your symptoms and their impact",
          "Explore our ADHD Resource Hub for management strategies",
          "Consider joining support groups or communities"
        ]
      };
    }
    if (percentage >= 50) {
      return {
        level: "Moderate Likelihood",
        color: "from-orange-500 to-yellow-500",
        icon: "⚡",
        description: "Your responses indicate moderate ADHD symptoms. While not definitive, it may be helpful to discuss these results with a healthcare provider.",
        recommendations: [
          "Monitor your symptoms over the next few weeks",
          "Try implementing ADHD management strategies",
          "Consider scheduling a consultation with a professional",
          "Use our AI Memory Aid to help with organization"
        ]
      };
    }
    return {
      level: "Low Likelihood",
      color: "from-green-500 to-blue-500",
      icon: "✓",
      description: "Your responses suggest a low likelihood of ADHD symptoms. However, if you're experiencing difficulties, it's always good to seek professional guidance.",
      recommendations: [
        "Continue monitoring any changes in symptoms",
        "Practice healthy study and work habits",
        "Use productivity tools to stay organized",
        "Reach out if symptoms worsen or change"
      ]
    };
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(null));
    setShowResult(false);
    setStarted(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const score = calculateScore();
  const maxScore = questions.length * 3;
  const result = getResult(score);

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl w-full"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="text-6xl mb-4"
              >
                🧠
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                ADHD Self-Assessment
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                A confidential screening tool to help understand your symptoms
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 mb-8 rounded-lg">
              <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                <span>ℹ️</span> Before You Begin
              </h3>
              <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-2">
                <li>• This is a screening tool, not a diagnostic test</li>
                <li>• Answer honestly based on how you've felt recently</li>
                <li>• Takes about 5-7 minutes to complete</li>
                <li>• Your responses are private and not stored</li>
                <li>• Based on the Adult ADHD Self-Report Scale (ASRS)</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 p-6 rounded-xl text-center">
                <div className="text-3xl mb-2">📝</div>
                <div className="font-bold text-gray-900 dark:text-white">15 Questions</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Quick & comprehensive</div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl text-center">
                <div className="text-3xl mb-2">🔒</div>
                <div className="font-bold text-gray-900 dark:text-white">100% Private</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">No data collection</div>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20 p-6 rounded-xl text-center">
                <div className="text-3xl mb-2">📊</div>
                <div className="font-bold text-gray-900 dark:text-white">Instant Results</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">With recommendations</div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStarted(true)}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Assessment
            </motion.button>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              Remember: This tool provides guidance, not a diagnosis. Always consult healthcare professionals for proper evaluation.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (showResult) {
    const categoryScores = getCategoryScores();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="text-7xl mb-4"
              >
                {result.icon}
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Your Results
              </h2>
              <div className={`inline-block bg-gradient-to-r ${result.color} text-white px-8 py-3 rounded-full text-2xl font-bold shadow-lg`}>
                {result.level}
              </div>
            </div>

            {/* Score Visualization */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall Score</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{score} / {maxScore}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / maxScore) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${result.color} rounded-full`}
                />
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 mb-8">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {result.description}
              </p>
            </div>

            {/* Category Breakdown */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Category Breakdown</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(categoryScores).map(([category, data]) => {
                  const percentage = (data.score / data.max) * 100;
                  const getColor = () => {
                    if (percentage >= 70) return 'bg-red-500';
                    if (percentage >= 50) return 'bg-orange-500';
                    if (percentage >= 30) return 'bg-yellow-500';
                    return 'bg-green-500';
                  };
                  
                  return (
                    <div key={category} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{category}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{data.score}/{data.max}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-full ${getColor()} rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span>💡</span> Next Steps
              </h3>
              <ul className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{rec}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Important Disclaimer */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
                <span>⚠️</span> Important Disclaimer
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-200">
                This self-assessment is a screening tool based on established ADHD criteria, but it is 
                <strong> NOT a diagnostic test</strong>. Only qualified healthcare professionals can provide 
                an official ADHD diagnosis. If you're concerned about your symptoms, please schedule an 
                appointment with a psychiatrist, psychologist, or your primary care provider.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetTest}
                className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Take Test Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300"
              >
                Explore Resources
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12"
        >
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-bold text-pink-600 dark:text-pink-400">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
              />
            </div>
          </div>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-full text-sm font-semibold">
              {questions[currentQuestion].category}
            </span>
          </div>

          {/* Question */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 leading-relaxed">
            {questions[currentQuestion].text}
          </h2>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {options.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option.value)}
                onMouseEnter={() => setHoveredOption(option.value)}
                onMouseLeave={() => setHoveredOption(null)}
                className={`w-full p-5 rounded-2xl transition-all duration-300 flex items-center justify-between ${
                  answers[currentQuestion] === option.value
                    ? `bg-gradient-to-r ${option.color} text-white shadow-lg scale-105`
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{option.emoji}</span>
                  <span className="text-lg font-semibold">{option.label}</span>
                </div>
                {answers[currentQuestion] === option.value && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-2xl"
                  >
                    ✓
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            {currentQuestion > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevQuestion}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-4 rounded-full font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>←</span> Previous
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextQuestion}
              disabled={answers[currentQuestion] === null}
              className={`flex-1 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                answers[currentQuestion] === null
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'} <span>→</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ADHDTest;