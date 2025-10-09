import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Brain, Sparkles, Target, Zap, Calendar, Bell } from "lucide-react";


const Home = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Memory",
      description: "Smart algorithms that adapt to your learning style"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Focus Tools",
      description: "Break tasks into manageable, achievable chunks"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Smart Scheduling",
      description: "Automatic reminders that work with your brain"
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Gentle Nudges",
      description: "Non-intrusive notifications at the right time"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 min-h-screen flex items-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 right-20 w-72 h-72 bg-pink-300/30 dark:bg-pink-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 left-20 w-96 h-96 bg-purple-300/30 dark:bg-purple-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-8 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left section: Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-4 py-2 rounded-full text-sm font-medium"
              >
                <Sparkles className="w-4 h-4" />
                AI-Powered Learning Assistant
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Your Brain's
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 text-transparent bg-clip-text"> Best Friend</span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                An intelligent memory aid designed specifically for students with ADHD. 
                Stay organized, focused, and on track with AI that understands how your brain works.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Get Started Free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700"
                >
                  <NavLink to="/about-us">Learn More</NavLink>
                </motion.button>
              </div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex gap-8 pt-8"
              >
                <div>
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">5K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">95%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">AI Support</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right section: Animated illustration */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <img
                  src="/adhd-banner.png"
                  alt="ADHD Memory Aid"
                  className="w-full rounded-3xl shadow-2xl"
                />
                {/* Floating card elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">Task Completed!</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Great job! 🎉</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">Next: Math Quiz</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">In 30 minutes</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-900 py-24">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Built for ADHD Brains
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Features designed with neurodiversity in mind, helping you work with your brain, not against it
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Understanding ADHD Section */}
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 py-24">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Understanding ADHD
            </h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <p>
                Attention Deficit Hyperactivity Disorder (ADHD) is a neurodevelopmental 
                condition that affects both children and adults. It's characterized by 
                difficulties with focus, hyperactivity, and impulsivity.
              </p>
              <p>
                Living with ADHD can be challenging, but with proper support and strategies, 
                individuals can thrive and harness their unique strengths. That's where we come in.
              </p>
              <p className="font-semibold text-pink-600 dark:text-pink-400">
                Our AI-powered tools are specifically designed to work with ADHD brains, 
                turning challenges into superpowers.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <NavLink to="/about-us">Discover How We Help</NavLink>
            </motion.button>
          </motion.div>
        </div>
      </div>

      
    </>
  );
};

export default Home;