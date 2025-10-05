import { useState } from 'react';
import { motion } from 'framer-motion';

const ResourceCard = ({ icon, title, description, tips, color }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-l-4 ${color} cursor-pointer transition-all duration-300`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-3">{description}</p>
          
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-2"
            >
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Quick Tips:</h4>
              <ul className="space-y-2">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-pink-500 mt-1">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          
          <button className="text-pink-600 dark:text-pink-400 text-sm font-medium mt-2 hover:underline">
            {isExpanded ? 'Show less' : 'Learn more →'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const MythFactCard = ({ myth, fact }) => (
  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-md">
    <div className="mb-4">
      <span className="inline-block bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm font-semibold mb-2">
        ❌ MYTH
      </span>
      <p className="text-gray-700 dark:text-gray-300 italic">"{myth}"</p>
    </div>
    <div>
      <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm font-semibold mb-2">
        ✓ FACT
      </span>
      <p className="text-gray-800 dark:text-gray-200 font-medium">{fact}</p>
    </div>
  </div>
);

const StudyTechniqueCard = ({ title, description, steps, icon }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center gap-3 mb-4">
      <span className="text-3xl">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
    </div>
    <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
    <div className="space-y-2">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start gap-3">
          <span className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
            {index + 1}
          </span>
          <p className="text-sm text-gray-700 dark:text-gray-300">{step}</p>
        </div>
      ))}
    </div>
  </div>
);

const ADHDHub = () => {
  const [activeTab, setActiveTab] = useState('understanding');

  const resources = [
    {
      icon: '🧠',
      title: 'Focus & Concentration',
      description: 'Strategies to improve attention span and minimize distractions',
      color: 'border-blue-500',
      tips: [
        'Use the Pomodoro Technique (25 min work, 5 min break)',
        'Create a distraction-free workspace',
        'Use noise-canceling headphones or white noise',
        'Break large tasks into smaller, manageable chunks',
        'Use visual timers to track time'
      ]
    },
    {
      icon: '📝',
      title: 'Organization & Planning',
      description: 'Keep track of tasks, deadlines, and important information',
      color: 'border-purple-500',
      tips: [
        'Use color-coding for different subjects/projects',
        'Set up daily routines and stick to them',
        'Keep a master to-do list and update it daily',
        'Use apps with reminders and notifications',
        'Prepare the night before (pack bag, choose clothes)'
      ]
    },
    {
      icon: '⚡',
      title: 'Energy Management',
      description: 'Work with your natural energy levels, not against them',
      color: 'border-yellow-500',
      tips: [
        'Identify your peak focus times and schedule hard tasks then',
        'Take regular breaks to prevent burnout',
        'Include physical movement throughout the day',
        'Maintain consistent sleep schedule',
        'Eat regular, balanced meals'
      ]
    },
    {
      icon: '🎯',
      title: 'Memory Techniques',
      description: 'Methods to improve retention and recall of information',
      color: 'border-green-500',
      tips: [
        'Use mnemonics and acronyms for complex info',
        'Create mind maps for visual learning',
        'Teach concepts to someone else',
        'Use spaced repetition for long-term retention',
        'Record voice notes for audio learners'
      ]
    },
    {
      icon: '😌',
      title: 'Stress & Anxiety',
      description: 'Manage overwhelming feelings and emotional regulation',
      color: 'border-pink-500',
      tips: [
        'Practice deep breathing exercises (4-7-8 technique)',
        'Use grounding techniques when feeling overwhelmed',
        'Exercise regularly to release endorphins',
        'Maintain a worry journal',
        'Seek support from friends, family, or professionals'
      ]
    },
    {
      icon: '🎨',
      title: 'Creativity & Hyperfocus',
      description: 'Harness your ADHD superpowers for productive outcomes',
      color: 'border-indigo-500',
      tips: [
        'Channel hyperfocus into passion projects',
        'Use fidget tools to maintain focus',
        'Embrace creative problem-solving approaches',
        'Work on multiple projects when needed (task switching)',
        'Celebrate your unique way of thinking'
      ]
    }
  ];

  const myths = [
    {
      myth: "ADHD is just laziness or lack of discipline",
      fact: "ADHD is a neurodevelopmental disorder with real differences in brain structure and chemistry. It's not a character flaw or choice."
    },
    {
      myth: "Only kids have ADHD, you grow out of it",
      fact: "While symptoms may change, 60% of children with ADHD continue to have symptoms into adulthood."
    },
    {
      myth: "ADHD medication is dangerous and addictive",
      fact: "When prescribed and monitored by professionals, ADHD medications are safe and effective. They don't lead to addiction when used properly."
    },
    {
      myth: "People with ADHD can't focus on anything",
      fact: "ADHD affects the ability to regulate attention. People with ADHD can hyperfocus intensely on things they find interesting."
    }
  ];

  const studyTechniques = [
    {
      icon: '🍅',
      title: 'Pomodoro Technique',
      description: 'Time-boxing method perfect for ADHD brains',
      steps: [
        'Set timer for 25 minutes and focus on one task',
        'Take a 5-minute break when timer rings',
        'Repeat 4 times, then take a longer 15-30 min break',
        'Use breaks for movement, snacks, or quick fun activities'
      ]
    },
    {
      icon: '🗺️',
      title: 'Mind Mapping',
      description: 'Visual learning technique for better retention',
      steps: [
        'Write main topic in the center of page',
        'Branch out with related subtopics',
        'Use colors, drawings, and symbols',
        'Connect related ideas with lines'
      ]
    },
    {
      icon: '🎯',
      title: 'Body Doubling',
      description: 'Work alongside others for accountability',
      steps: [
        'Find a study partner or join virtual study sessions',
        'Work on separate tasks in the same space',
        'Use the presence of others to stay focused',
        'Take synchronized breaks together'
      ]
    },
    {
      icon: '🔄',
      title: 'Active Recall',
      description: 'Test yourself instead of passive reading',
      steps: [
        'Read material once, then close the book',
        'Write down everything you remember',
        'Check what you missed and review',
        'Repeat after increasing time intervals'
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">ADHD Resource Hub</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Your comprehensive guide to understanding, managing, and thriving with ADHD
            </p>
          </motion.div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 bg-white dark:bg-gray-800 shadow-md z-10">
        <div className="container mx-auto px-8">
          <div className="flex overflow-x-auto gap-2 py-4">
            {[
              { id: 'understanding', label: '🧠 Understanding ADHD', emoji: '🧠' },
              { id: 'strategies', label: '📚 Study Strategies', emoji: '📚' },
              { id: 'myths', label: '💡 Myths vs Facts', emoji: '💡' },
              { id: 'tools', label: '🛠️ Helpful Tools', emoji: '🛠️' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-16">
        {/* Understanding ADHD Tab */}
        {activeTab === 'understanding' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">What is ADHD?</h2>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  Attention-Deficit/Hyperactivity Disorder (ADHD) is a neurodevelopmental condition that affects 
                  how the brain processes information, regulates attention, and controls impulses. It's not about 
                  being lazy or unmotivated—it's about having a brain that works differently.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">Inattentive Type</h3>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li>• Difficulty focusing</li>
                      <li>• Easily distracted</li>
                      <li>• Forgetfulness</li>
                      <li>• Trouble organizing</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">Hyperactive Type</h3>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li>• Restlessness</li>
                      <li>• Excessive talking</li>
                      <li>• Fidgeting</li>
                      <li>• Difficulty sitting still</li>
                    </ul>
                  </div>
                  <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-pink-600 dark:text-pink-400 mb-3">Combined Type</h3>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li>• Mix of both types</li>
                      <li>• Most common</li>
                      <li>• Symptoms vary</li>
                      <li>• Individual experience</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Essential Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <ResourceCard key={index} {...resource} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Study Strategies Tab */}
        {activeTab === 'strategies' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">ADHD-Friendly Study Techniques</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {studyTechniques.map((technique, index) => (
                <StudyTechniqueCard key={index} {...technique} />
              ))}
            </div>

            <div className="mt-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">💪 Remember: Your Brain is NOT Broken</h3>
              <p className="text-lg opacity-90">
                ADHD brains think differently, and that's a strength! With the right strategies and tools, 
                you can achieve anything. Focus on progress, not perfection, and celebrate small wins along the way.
              </p>
            </div>
          </motion.div>
        )}

        {/* Myths vs Facts Tab */}
        {activeTab === 'myths' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Debunking ADHD Myths</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {myths.map((item, index) => (
                <MythFactCard key={index} {...item} />
              ))}
            </div>

            <div className="mt-12 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-3">
                🌟 ADHD Superpowers
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                While ADHD comes with challenges, it also brings unique strengths:
              </p>
              <ul className="grid md:grid-cols-2 gap-3">
                <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-yellow-500">⭐</span>
                  <span>Creativity and out-of-the-box thinking</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-yellow-500">⭐</span>
                  <span>Hyperfocus on interesting topics</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-yellow-500">⭐</span>
                  <span>High energy and enthusiasm</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-yellow-500">⭐</span>
                  <span>Ability to see connections others miss</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-yellow-500">⭐</span>
                  <span>Resilience and adaptability</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-yellow-500">⭐</span>
                  <span>Spontaneity and sense of adventure</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Helpful Tools & Apps</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: '⏱️', title: 'Focus Timers', apps: ['Forest', 'Brain Focus', 'Pomodoro Timer'] },
                { icon: '📝', title: 'Task Management', apps: ['Todoist', 'Notion', 'Trello'] },
                { icon: '🎧', title: 'Focus Sounds', apps: ['Brain.fm', 'Noisli', 'Coffitivity'] },
                { icon: '🧘', title: 'Mindfulness', apps: ['Headspace', 'Calm', 'Insight Timer'] },
                { icon: '📚', title: 'Note Taking', apps: ['OneNote', 'Evernote', 'Notion'] },
                { icon: '🎯', title: 'Habit Tracking', apps: ['Habitica', 'Streaks', 'Loop'] }
              ].map((category, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.apps.map((app, i) => (
                      <li key={i} className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <span className="text-pink-500">•</span>
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🚨 When to Seek Professional Help</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">• ADHD symptoms are significantly impacting your daily life</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">• You're struggling with anxiety or depression</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">• Academic performance is consistently suffering</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">• You need guidance on medication options</p>
                </div>
              </div>
              <p className="mt-6 text-gray-700 dark:text-gray-300 font-medium">
                Remember: Seeking help is a sign of strength, not weakness. A professional can provide personalized 
                strategies and support tailored to your unique needs.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ADHDHub;