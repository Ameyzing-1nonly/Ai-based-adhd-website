import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Sparkles, CheckCircle, Clock, AlertCircle, Trash2, Edit, Plus, Loader } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export default function VoiceTaskExtractorWithGemini() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [extractedTasks, setExtractedTasks] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const extractTasksWithGemini = async (text) => {
    try {
      const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
      
      const prompt = `You are an AI task extraction specialist for ADHD memory aid.

Analyze this text and extract ALL tasks, reminders, and action items: "${text}"

For each task, determine:
1. **Title**: Clear, concise action (e.g., "Call dentist", "Buy groceries")
2. **Time**: Extract time/date or suggest appropriate timing:
   - If specific time mentioned: use it
   - If "today": suggest a time today
   - If "tomorrow": suggest tomorrow with time
   - If "this week": suggest "This week"
   - If unclear: suggest "Today" or "This week"
3. **Priority**: 
   - "urgent" = must do immediately/today with deadline
   - "high" = important, should do soon
   - "medium" = normal importance
   - "low" = can wait
4. **Category**: Work, Personal, Health, Shopping, Social, Finance, or Other
5. **Confidence**: 85-99 (how sure you are about extraction)

IMPORTANT: 
- Extract even implied tasks (e.g., "need to" or "should" or "don't forget")
- Be generous with extraction - better to have false positives
- Medication/health tasks are ALWAYS "high" or "urgent" priority

Respond with ONLY valid JSON array, no markdown, no explanation:
[
  {
    "title": "task description",
    "time": "when to do it",
    "priority": "urgent|high|medium|low",
    "category": "category",
    "confidence": 90
  }
]

If absolutely no tasks found, return: []`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let jsonText = response.text().trim();
      
      // Remove markdown code blocks if present
      jsonText = jsonText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
      
      // Find JSON array
      const jsonMatch = jsonText.match(/\[[\s\S]*\]/);
      
      if (jsonMatch) {
        const tasks = JSON.parse(jsonMatch[0]);
        return Array.isArray(tasks) ? tasks : [];
      }
      
      return [];
    } catch (error) {
      console.error("Gemini Task Extraction Error:", error);
      throw error;
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setTranscript('');
    setExtractedTasks([]);
    setError('');
    
    // Simulate recording (replace with real voice recognition)
    setTimeout(() => {
      setTranscript("I need to call mom tomorrow at 3 PM, don't forget to buy groceries for dinner tonight, and I should really submit that project report by Friday. Also need to take my medication at 8 PM.");
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (transcript) {
      processTranscript();
    }
  };

  const processTranscript = async () => {
    setIsProcessing(true);
    setError('');
    
    try {
      const tasks = await extractTasksWithGemini(transcript);
      
      if (tasks.length === 0) {
        setError('No tasks found in the transcript. Try being more specific!');
      } else {
        setExtractedTasks(tasks.map((task, idx) => ({
          ...task,
          id: Date.now() + idx
        })));
      }
    } catch (error) {
      console.error('Processing error:', error);
      setError('Failed to extract tasks. Please try again or check your API connection.');
    } finally {
      setIsProcessing(false);
    }
  };

  const processCustomText = async (text) => {
    setTranscript(text);
    setIsProcessing(true);
    setError('');
    
    try {
      const tasks = await extractTasksWithGemini(text);
      
      if (tasks.length === 0) {
        setError('No tasks found in the text. Try being more specific!');
      } else {
        setExtractedTasks(tasks.map((task, idx) => ({
          ...task,
          id: Date.now() + idx
        })));
      }
    } catch (error) {
      console.error('Processing error:', error);
      setError('Failed to extract tasks. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'urgent': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const saveAllTasks = () => {
    // Here you would save to Firebase
    alert(`✅ ${extractedTasks.length} tasks saved to your dashboard!`);
    setExtractedTasks([]);
    setTranscript('');
  };

  const removeTask = (taskId) => {
    setExtractedTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const examples = [
    "I need to call the dentist, buy groceries, and finish my homework by 5 PM",
    "Remind me to take medication at 9 AM and 9 PM every day",
    "Meeting with Sarah tomorrow at 2, don't forget laptop and charger",
    "Pay electricity bill before Friday, renew gym membership this week"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mb-4">
            <Sparkles className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Voice Task Extractor
          </h1>
          <p className="text-gray-600 text-lg">
            Speak naturally - Gemini AI extracts tasks, sets priorities, and organizes everything
          </p>
          <div className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-purple-900">Powered by Google Gemini</span>
          </div>
        </div>

        {/* Recording Interface */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          
          {/* Recording Button */}
          <div className="text-center mb-8">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
              className={`relative w-32 h-32 rounded-full transition-all duration-300 ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
              } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isRecording ? (
                <MicOff className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" size={48} />
              ) : (
                <Mic className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" size={48} />
              )}
              {isRecording && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-red-600 font-bold text-lg whitespace-nowrap">
                  {formatTime(recordingTime)}
                </div>
              )}
            </button>
            <p className="mt-12 text-gray-600 font-medium">
              {isRecording ? 'Tap to stop recording' : isProcessing ? 'AI is processing...' : 'Tap to start recording'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-red-800 font-medium">Error</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Transcript Display */}
          {transcript && !isProcessing && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm font-semibold text-gray-700">Transcript</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-gray-800 leading-relaxed">{transcript}</p>
              </div>
            </div>
          )}

          {/* Processing Animation */}
          {isProcessing && (
            <div className="text-center py-8">
              <div className="flex justify-center gap-2 mb-4">
                <Loader className="w-8 h-8 text-purple-600 animate-spin" />
              </div>
              <p className="text-gray-600 font-medium">Gemini AI is extracting tasks and setting priorities...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a few seconds</p>
            </div>
          )}

          {/* Extracted Tasks */}
          {extractedTasks.length > 0 && !isProcessing && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={24} />
                  <h2 className="text-xl font-bold text-gray-900">
                    Extracted {extractedTasks.length} Task{extractedTasks.length !== 1 ? 's' : ''}
                  </h2>
                </div>
                <button
                  onClick={saveAllTasks}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition font-medium flex items-center gap-2 shadow-lg"
                >
                  <CheckCircle size={18} />
                  Save All Tasks
                </button>
              </div>

              <div className="space-y-3">
                {extractedTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`border-l-4 rounded-lg p-4 transition hover:shadow-lg ${getPriorityColor(task.priority)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-bold text-gray-900 text-lg">{task.title}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${getPriorityBadge(task.priority)}`}>
                            {task.priority.toUpperCase()}
                          </span>
                          <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium">
                            {task.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {task.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Sparkles size={14} className="text-purple-600" />
                            {task.confidence}% confidence
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => removeTask(task.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setTranscript('');
                  setExtractedTasks([]);
                  setError('');
                }}
                className="w-full mt-4 border-2 border-dashed border-gray-300 rounded-lg py-3 text-gray-600 hover:border-purple-400 hover:text-purple-600 transition flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Extract More Tasks
              </button>
            </div>
          )}
        </div>

        {/* Example Phrases */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="text-purple-600" size={20} />
            <h3 className="font-bold text-gray-900">Try These Example Phrases:</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {examples.map((example, idx) => (
              <button
                key={idx}
                onClick={() => processCustomText(example)}
                disabled={isProcessing}
                className="text-left p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg hover:border-purple-400 hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <p className="text-sm text-gray-700">{example}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Text Input */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-900 mb-4">Or Type/Paste Your Text:</h3>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Type or paste your thoughts here... (e.g., 'I need to call the doctor, buy groceries, and finish the report by Friday')"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            rows="4"
          />
          <button
            onClick={() => processTranscript()}
            disabled={!transcript.trim() || isProcessing}
            className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader className="animate-spin" size={20} />
                Processing...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Extract Tasks with AI
              </>
            )}
          </button>
        </div>

        {/* Features Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles className="text-purple-600" size={24} />
            </div>
            <h4 className="font-bold text-gray-900 mb-1">AI-Powered</h4>
            <p className="text-sm text-gray-600">Google Gemini extracts tasks intelligently</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="text-blue-600" size={24} />
            </div>
            <h4 className="font-bold text-gray-900 mb-1">Smart Timing</h4>
            <p className="text-sm text-gray-600">Automatic time detection and suggestions</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <h4 className="font-bold text-gray-900 mb-1">Priority Setting</h4>
            <p className="text-sm text-gray-600">Automatic priority and category assignment</p>
          </div>
        </div>

      </div>
    </div>
  );
}