import React, { useState } from 'react';
import { 
  Brain, CheckCircle, Calendar, Clock, Pill, TrendingUp, 
  Zap, Target, Award, AlertCircle, BarChart3, Activity,
  MessageSquare, Plus, ChevronRight, Star, Flame
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function MemoryDashboard() {
  const [greeting, setGreeting] = useState(getGreeting());

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }

  // Sample data
  const memoryScoreData = [
    { day: 'Mon', score: 65 },
    { day: 'Tue', score: 72 },
    { day: 'Wed', score: 68 },
    { day: 'Thu', score: 78 },
    { day: 'Fri', score: 85 },
    { day: 'Sat', score: 82 },
    { day: 'Sun', score: 88 }
  ];

  const taskCompletionData = [
    { name: 'Completed', value: 34, color: '#10b981' },
    { name: 'Pending', value: 12, color: '#f59e0b' },
    { name: 'Missed', value: 4, color: '#ef4444' }
  ];

  const categoryData = [
    { category: 'Work', count: 15 },
    { category: 'Personal', count: 12 },
    { category: 'Health', count: 8 },
    { category: 'Social', count: 6 }
  ];

  const todayTasks = [
    { id: 1, title: 'Take morning medication', time: '9:00 AM', completed: true, priority: 'high' },
    { id: 2, title: 'Call dentist for appointment', time: '10:30 AM', completed: false, priority: 'high' },
    { id: 3, title: 'Submit project report', time: '2:00 PM', completed: false, priority: 'urgent' },
    { id: 4, title: 'Buy groceries', time: '5:00 PM', completed: false, priority: 'medium' },
    { id: 5, title: 'Evening medication', time: '8:00 PM', completed: false, priority: 'high' }
  ];

  const upcomingReminders = [
    { id: 1, title: 'Mom\'s Birthday', date: 'Tomorrow', icon: '🎂' },
    { id: 2, title: 'Doctor Appointment', date: 'Oct 20', icon: '🏥' },
    { id: 3, title: 'Renew Subscription', date: 'Oct 22', icon: '💳' }
  ];

  const achievements = [
    { id: 1, title: '7 Day Streak', icon: Flame, color: 'from-orange-500 to-red-500', earned: true },
    { id: 2, title: 'Memory Master', icon: Brain, color: 'from-purple-500 to-pink-500', earned: true },
    { id: 3, title: 'Task Crusher', icon: Target, color: 'from-blue-500 to-cyan-500', earned: false },
    { id: 4, title: 'Perfect Week', icon: Star, color: 'from-yellow-500 to-amber-500', earned: false }
  ];

  const stats = [
    { 
      label: 'Memory Score', 
      value: '88%', 
      change: '+12%', 
      positive: true, 
      icon: Brain,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      label: 'Tasks Completed', 
      value: '34', 
      change: '+8', 
      positive: true, 
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      label: 'Current Streak', 
      value: '7 days', 
      change: 'Keep going!', 
      positive: true, 
      icon: Flame,
      color: 'from-orange-500 to-red-500'
    },
    { 
      label: 'Reminders Set', 
      value: '12', 
      change: '3 upcoming', 
      positive: true, 
      icon: AlertCircle,
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              {greeting}, User! 👋
            </h1>
            <p className="text-gray-600 mt-1">Here's your memory dashboard for today</p>
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition shadow-lg">
            <MessageSquare size={20} />
            Chat with AI
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-2 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Today's Tasks */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <CheckCircle className="text-purple-600" />
                Today's Tasks
              </h2>
              <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1">
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {todayTasks.map((task) => (
                <div 
                  key={task.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 transition hover:shadow-md ${
                    task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500"
                    readOnly
                  />
                  <div className="flex-1">
                    <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Clock size={14} />
                      {task.time}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 border-2 border-dashed border-gray-300 rounded-lg py-3 text-gray-600 hover:border-purple-400 hover:text-purple-600 transition flex items-center justify-center gap-2">
              <Plus size={20} />
              Add New Task
            </button>
          </div>

          {/* Upcoming Reminders */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="text-purple-600" />
              Upcoming
            </h2>
            <div className="space-y-4">
              {upcomingReminders.map((reminder) => (
                <div key={reminder.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                  <div className="text-3xl">{reminder.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{reminder.title}</p>
                    <p className="text-sm text-gray-600">{reminder.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition flex items-center justify-center gap-2">
              <Plus size={20} />
              Add Reminder
            </button>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Memory Score Trend */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="text-purple-600" />
              Memory Score Trend
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={memoryScoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="url(#colorGradient)" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 5 }}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Task Completion */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="text-purple-600" />
              Task Distribution
            </h2>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={taskCompletionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskCompletionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {taskCompletionData.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Activity className="text-purple-600" />
            Tasks by Category
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Bar dataKey="count" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Award className="text-purple-600" />
            Your Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`relative p-6 rounded-xl border-2 transition hover:scale-105 ${
                  achievement.earned 
                    ? 'bg-gradient-to-br ' + achievement.color + ' border-transparent shadow-lg' 
                    : 'bg-gray-100 border-gray-300 opacity-50'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`p-3 rounded-full mb-3 ${
                    achievement.earned ? 'bg-white bg-opacity-20' : 'bg-gray-200'
                  }`}>
                    <achievement.icon 
                      className={achievement.earned ? 'text-white' : 'text-gray-400'} 
                      size={32} 
                    />
                  </div>
                  <p className={`font-bold text-sm ${achievement.earned ? 'text-white' : 'text-gray-600'}`}>
                    {achievement.title}
                  </p>
                  {achievement.earned && (
                    <div className="absolute top-2 right-2">
                      <Star className="text-yellow-300 fill-yellow-300" size={20} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-8">
          <div className="text-center text-white">
            <Zap size={48} className="mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ready to boost your memory?</h2>
            <p className="mb-6 text-purple-100">Try our AI-powered memory games and exercises</p>
            <div className="flex items-center justify-center gap-4">
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition">
                Play Memory Games
              </button>
              <button className="bg-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-800 transition border-2 border-white border-opacity-30">
                View Progress Report
              </button>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <Pill className="text-green-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">98%</p>
            <p className="text-gray-600 mt-1">Medication Adherence</p>
            <p className="text-sm text-green-600 mt-2">7 day streak! 🔥</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Brain className="text-blue-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">156</p>
            <p className="text-gray-600 mt-1">Memory Items Stored</p>
            <p className="text-sm text-blue-600 mt-2">+23 this week</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <Target className="text-purple-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">24</p>
            <p className="text-gray-600 mt-1">Goals Achieved</p>
            <p className="text-sm text-purple-600 mt-2">80% success rate</p>
          </div>
        </div>

      </div>
    </div>
  );
}