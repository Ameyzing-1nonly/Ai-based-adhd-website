import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, Brain, CheckSquare, BarChart3, Mic, Volume2, Plus, Play, Pause, RotateCcw, Users, Bell, ListChecks, Zap, TrendingUp, Award, Target, Timer } from 'lucide-react';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('student');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Math Assignment', subtasks: ['Read chapter 5', 'Solve problems 1-10', 'Review answers'], priority: 'high', completed: false, dueDate: '2025-10-12', progress: 33, category: 'homework' },
    { id: 2, title: 'Science Project', subtasks: ['Research topic', 'Create outline', 'Gather materials', 'Build model'], priority: 'medium', completed: false, dueDate: '2025-10-15', progress: 50, category: 'project' },
    { id: 3, title: 'History Essay', subtasks: ['Choose topic', 'Research sources', 'Write draft', 'Edit & submit'], priority: 'high', completed: false, dueDate: '2025-10-11', progress: 25, category: 'homework' }
  ]);
  
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [showBreakReminder, setShowBreakReminder] = useState(false);
  const [voiceInput, setVoiceInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showNewTask, setShowNewTask] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning && pomodoroTime > 0) {
      timerRef.current = setInterval(() => {
        setPomodoroTime(prev => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsRunning(false);
      if (!isBreak) {
        setCompletedPomodoros(prev => prev + 1);
        setShowBreakReminder(true);
      }
      setIsBreak(!isBreak);
      setPomodoroTime(isBreak ? 25 * 60 : 5 * 60);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, pomodoroTime, isBreak]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePomodoro = () => setIsRunning(!isRunning);
  const resetPomodoro = () => {
    setIsRunning(false);
    setPomodoroTime(25 * 60);
    setIsBreak(false);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setVoiceInput('Add task: Review chemistry notes');
        setIsListening(false);
      }, 2000);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  const breakdownTask = (title) => {
    const aiSuggestions = {
      'Math Assignment': ['Read chapter 5 (15 min)', 'Solve problems 1-5 (20 min)', 'Solve problems 6-10 (20 min)', 'Review answers (10 min)'],
      'Science Project': ['Research topic online (30 min)', 'Create project outline (15 min)', 'Gather materials list (10 min)', 'Build model - part 1 (45 min)', 'Build model - part 2 (45 min)'],
      'History Essay': ['Choose topic (10 min)', 'Research 3-5 sources (40 min)', 'Write introduction (15 min)', 'Write body paragraphs (60 min)', 'Write conclusion (15 min)', 'Edit & proofread (20 min)']
    };
    return aiSuggestions[title] || ['Step 1', 'Step 2', 'Step 3'];
  };

  const toggleSubtask = (taskId, subtaskIndex) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newSubtasks = [...task.subtasks];
        newSubtasks[subtaskIndex] = newSubtasks[subtaskIndex].startsWith('✓') 
          ? newSubtasks[subtaskIndex].substring(2)
          : '✓ ' + newSubtasks[subtaskIndex];
        const completed = newSubtasks.filter(s => s.startsWith('✓')).length;
        return { ...task, subtasks: newSubtasks, progress: Math.round((completed / newSubtasks.length) * 100) };
      }
      return task;
    }));
  };

  const addNewTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: tasks.length + 1,
        title: newTaskTitle,
        subtasks: breakdownTask(newTaskTitle),
        priority: 'medium',
        completed: false,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress: 0,
        category: 'homework'
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setShowNewTask(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 border-red-400 text-red-700';
      case 'medium': return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      case 'low': return 'bg-green-100 border-green-400 text-green-700';
      default: return 'bg-gray-100 border-gray-400 text-gray-700';
    }
  };

  const StudentDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Tasks Today</p>
              <p className="text-3xl font-bold">{tasks.filter(t => !t.completed).length}</p>
            </div>
            <CheckSquare className="w-10 h-10 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Completed</p>
              <p className="text-3xl font-bold">{tasks.filter(t => t.completed).length}</p>
            </div>
            <Award className="w-10 h-10 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Focus Sessions</p>
              <p className="text-3xl font-bold">{completedPomodoros}</p>
            </div>
            <Zap className="w-10 h-10 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Streak Days</p>
              <p className="text-3xl font-bold">7</p>
            </div>
            <TrendingUp className="w-10 h-10 opacity-80" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-4 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Brain className="w-6 h-6 text-blue-500" />
                Quick Actions
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setShowNewTask(true)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
                Add Task
              </button>
              <button 
                onClick={handleVoiceInput}
                className={`flex items-center gap-2 ${isListening ? 'bg-red-500' : 'bg-green-500 hover:bg-green-600'} text-white px-4 py-2 rounded-lg transition-colors`}>
                <Mic className="w-4 h-4" />
                {isListening ? 'Listening...' : 'Voice Input'}
              </button>
              <button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Calendar className="w-4 h-4" />
                Sync Calendar
              </button>
            </div>
            
            {voiceInput && (
              <div className="mt-3 p-3 bg-green-50 border-2 border-green-300 rounded-lg">
                <p className="text-sm text-green-800">Voice captured: {voiceInput}</p>
              </div>
            )}

            {showNewTask && (
              <div className="mt-4 p-4 bg-gray-50 border-2 border-gray-300 rounded-lg">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter task title..."
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg mb-3 focus:border-blue-500 outline-none"
                />
                <div className="flex gap-2">
                  <button onClick={addNewTask} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Create Task
                  </button>
                  <button onClick={() => setShowNewTask(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-purple-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ListChecks className="w-6 h-6 text-purple-500" />
              Your Tasks
            </h2>
            
            <div className="space-y-4">
              {tasks.map(task => (
                <div key={task.id} className={`border-2 rounded-lg p-4 ${getPriorityColor(task.priority)}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">{task.title}</h3>
                        <button onClick={() => speakText(task.title)} className="hover:bg-white/50 p-1 rounded">
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm opacity-75 mt-1">Due: {task.dueDate}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      task.priority === 'high' ? 'bg-red-500 text-white' :
                      task.priority === 'medium' ? 'bg-yellow-500 text-white' :
                      'bg-green-500 text-white'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-semibold">Progress: {task.progress}%</span>
                    </div>
                    <div className="w-full bg-white/50 rounded-full h-3">
                      <div 
                        className="bg-current h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-semibold mb-2">Subtasks:</p>
                    {task.subtasks.map((subtask, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => toggleSubtask(task.id, idx)}
                        className="flex items-center gap-2 p-2 bg-white/50 rounded cursor-pointer hover:bg-white/70 transition-colors"
                      >
                        <input 
                          type="checkbox" 
                          checked={subtask.startsWith('✓')}
                          readOnly
                          className="w-5 h-5 cursor-pointer"
                        />
                        <span className={subtask.startsWith('✓') ? 'line-through opacity-60' : ''}>
                          {subtask.replace('✓ ', '')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-green-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-green-500" />
              Timeline View
            </h2>
            
            <div className="space-y-4">
              {tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).map((task, idx) => (
                <div key={task.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full ${
                      task.priority === 'high' ? 'bg-red-500' :
                      task.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`} />
                    {idx < tasks.length - 1 && <div className="w-0.5 h-12 bg-gray-300" />}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-semibold text-gray-800">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.dueDate} · {task.progress}% complete</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Timer className="w-6 h-6" />
              Focus Timer
            </h2>
            
            <div className="text-center mb-6">
              <div className="text-6xl font-bold mb-2">{formatTime(pomodoroTime)}</div>
              <p className="text-pink-100">{isBreak ? 'Break Time!' : 'Focus Time'}</p>
            </div>
            
            <div className="flex justify-center gap-3 mb-4">
              <button 
                onClick={togglePomodoro}
                className="bg-white text-pink-600 hover:bg-pink-50 p-3 rounded-full transition-colors">
                {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button 
                onClick={resetPomodoro}
                className="bg-white text-pink-600 hover:bg-pink-50 p-3 rounded-full transition-colors">
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
            
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <p className="text-sm">Sessions Today: {completedPomodoros}</p>
            </div>
          </div>

          {showBreakReminder && (
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Bell className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-yellow-800 mb-1">Time for a break!</h3>
                  <p className="text-sm text-yellow-700 mb-3">Great work! Take 5 minutes to stretch and recharge.</p>
                  <button 
                    onClick={() => setShowBreakReminder(false)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm">
                    Got it!
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-orange-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-orange-500" />
              Upcoming Reminders
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <Clock className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-semibold text-sm">Math Assignment</p>
                  <p className="text-xs text-gray-600">Due in 2 days</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <Clock className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-semibold text-sm">History Essay</p>
                  <p className="text-xs text-gray-600">Due tomorrow</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-indigo-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" />
              This Week
            </h2>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Tasks Completed</span>
                  <span className="font-bold">12/15</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '80%' }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Focus Time</span>
                  <span className="font-bold">8.5 hrs</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ParentDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Parent Dashboard</h1>
        <p className="text-blue-100">Monitor your child's progress and achievements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-800">{tasks.length}</p>
            </div>
            <Target className="w-10 h-10 text-blue-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Completion Rate</p>
              <p className="text-3xl font-bold text-gray-800">78%</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Focus Sessions</p>
              <p className="text-3xl font-bold text-gray-800">{completedPomodoros}</p>
            </div>
            <Zap className="w-10 h-10 text-purple-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Daily Streak</p>
              <p className="text-3xl font-bold text-gray-800">7 days</p>
            </div>
            <Award className="w-10 h-10 text-orange-500 opacity-50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ListChecks className="w-6 h-6 text-purple-500" />
            Current Tasks Status
          </h2>
          
          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-800">{task.title}</h3>
                    <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    task.priority === 'high' ? 'bg-red-100 text-red-700' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-bold text-gray-800">{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        task.progress >= 75 ? 'bg-green-500' :
                        task.progress >= 50 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="mt-3 text-sm text-gray-600">
                  <p>{task.subtasks.filter(s => s.startsWith('✓')).length} of {task.subtasks.length} subtasks completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-500" />
              Weekly Activity
            </h2>
            
            <div className="space-y-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                const activity = [80, 65, 90, 75, 85, 60, 70][idx];
                return (
                  <div key={day}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-semibold">{day}</span>
                      <span className="text-gray-600">{activity}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${activity}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-green-500" />
              Focus Time Analysis
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Total This Week</p>
                  <p className="text-2xl font-bold text-gray-800">12.5 hrs</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 font-semibold">+15%</p>
                  <p className="text-xs text-gray-500">vs last week</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Avg. Session Length</p>
                  <p className="text-2xl font-bold text-gray-800">28 min</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-purple-600 font-semibold">Optimal</p>
                  <p className="text-xs text-gray-500">for ADHD focus</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Best Focus Time</p>
                  <p className="text-2xl font-bold text-gray-800">10-11 AM</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Peak productivity</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-500" />
              Recent Achievements
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                <div className="bg-yellow-400 p-2 rounded-full">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Week Warrior</p>
                  <p className="text-sm text-gray-600">Completed 7-day streak</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="bg-green-400 p-2 rounded-full">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Task Master</p>
                  <p className="text-sm text-gray-600">Completed 10 tasks this week</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
                <div className="bg-purple-400 p-2 rounded-full">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Focus Champion</p>
                  <p className="text-sm text-gray-600">25 Pomodoro sessions completed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-md p-6 border-2 border-indigo-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Brain className="w-6 h-6 text-indigo-500" />
              AI Insights & Tips
            </h2>
            
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-sm font-semibold text-gray-800 mb-1">✅ Positive Pattern</p>
                <p className="text-sm text-gray-600">Your child shows consistent focus between 10-11 AM. Schedule important tasks during this time.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm font-semibold text-gray-800 mb-1">💡 Suggestion</p>
                <p className="text-sm text-gray-600">Break reminders are working well. Consider adding a 5-minute outdoor walk during breaks.</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm font-semibold text-gray-800 mb-1">⚠️ Watch Point</p>
                <p className="text-sm text-gray-600">Focus drops after 3 PM. Consider lighter tasks or review activities for afternoon sessions.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Bell className="w-6 h-6 text-orange-500" />
              Recent Notifications
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Task Completed</p>
                  <p className="text-xs text-gray-600">Math Assignment - All subtasks done • 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Focus Session</p>
                  <p className="text-xs text-gray-600">Completed 45-minute study session • 3 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Achievement Unlocked</p>
                  <p className="text-xs text-gray-600">Week Warrior badge earned • 1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-500" />
          30-Day Progress Overview
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Tasks Completed</p>
            <p className="text-4xl font-bold text-blue-600 mb-1">42</p>
            <p className="text-xs text-green-600 font-semibold">↑ 23% from last month</p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Total Focus Time</p>
            <p className="text-4xl font-bold text-green-600 mb-1">48h</p>
            <p className="text-xs text-green-600 font-semibold">↑ 15% from last month</p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Consistency Score</p>
            <p className="text-4xl font-bold text-purple-600 mb-1">8.5</p>
            <p className="text-xs text-green-600 font-semibold">↑ 1.2 from last month</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-6 border-2 border-purple-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">ADHD Memory Aid</h1>
                <p className="text-sm text-gray-600">Smart learning companion</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveView('student')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeView === 'student'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <CheckSquare className="w-5 h-5" />
                Student View
              </button>
              <button
                onClick={() => setActiveView('parent')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeView === 'parent'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Users className="w-5 h-5" />
                Parent View
              </button>
            </div>
          </div>
        </div>

        {activeView === 'student' ? <StudentDashboard /> : <ParentDashboard />}
      </div>
    </div>
  );
};

export default Dashboard