import React, { useState, useEffect } from 'react';
import { Star, Trophy, Zap } from 'lucide-react';

export default function ColorPopGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [circles, setCircles] = useState([]);
  const [combo, setCombo] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500'
  ];

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, gameActive]);

  useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        addCircle();
      }, 800);
      return () => clearInterval(interval);
    }
  }, [gameActive]);

  useEffect(() => {
    if (gameActive) {
      const cleanup = setInterval(() => {
        setCircles(prev => prev.filter(c => Date.now() - c.created < 3000));
      }, 100);
      return () => clearInterval(cleanup);
    }
  }, [gameActive]);

  const addCircle = () => {
    const newCircle = {
      id: Date.now(),
      x: Math.random() * 80 + 5,
      y: Math.random() * 70 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 30 + 50,
      created: Date.now()
    };
    setCircles(prev => [...prev, newCircle]);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    setCircles([]);
    setCombo(0);
  };

  const endGame = () => {
    setGameActive(false);
    if (score > bestScore) {
      setBestScore(score);
    }
    setCircles([]);
  };

  const popCircle = (id) => {
    setCircles(prev => prev.filter(c => c.id !== id));
    const points = 10 + combo * 2;
    setScore(score + points);
    setCombo(combo + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🎯 Color Pop Challenge!
          </h1>
          
          <div className="flex justify-around items-center flex-wrap gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{score}</div>
              <div className="text-sm text-gray-600 flex items-center gap-1 justify-center">
                <Star className="w-4 h-4" /> Score
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">{timeLeft}s</div>
              <div className="text-sm text-gray-600">Time Left</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{combo}x</div>
              <div className="text-sm text-gray-600 flex items-center gap-1 justify-center">
                <Zap className="w-4 h-4" /> Combo
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{bestScore}</div>
              <div className="text-sm text-gray-600 flex items-center gap-1 justify-center">
                <Trophy className="w-4 h-4" /> Best
              </div>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden" style={{ height: '500px' }}>
          {!gameActive ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-6xl mb-6">🎮</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Play?</h2>
              <p className="text-gray-600 text-center mb-8 max-w-md">
                Pop all the colorful circles as fast as you can! Build combos for bonus points!
              </p>
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full text-2xl font-bold hover:scale-110 transform transition shadow-lg"
              >
                START GAME! 🚀
              </button>
              {bestScore > 0 && (
                <div className="mt-6 text-gray-600">
                  Your best score: <span className="font-bold text-purple-600">{bestScore}</span>
                </div>
              )}
            </div>
          ) : (
            <>
              {circles.map(circle => (
                <button
                  key={circle.id}
                  onClick={() => popCircle(circle.id)}
                  className={`absolute rounded-full ${circle.color} hover:scale-110 transform transition-all shadow-lg animate-pulse`}
                  style={{
                    left: `${circle.x}%`,
                    top: `${circle.y}%`,
                    width: `${circle.size}px`,
                    height: `${circle.size}px`,
                  }}
                />
              ))}
              
              {circles.length === 0 && (
                <div className="flex items-center justify-center h-full text-gray-400 text-xl">
                  Get ready...
                </div>
              )}
            </>
          )}
          
          {timeLeft === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-3xl p-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Game Over!</h2>
                <div className="text-5xl font-bold text-purple-600 mb-4">{score}</div>
                <p className="text-gray-600 mb-6">
                  {score > bestScore ? "🏆 New High Score!" : "Great job!"}
                </p>
                <button
                  onClick={startGame}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full text-xl font-bold hover:scale-110 transform transition"
                >
                  Play Again! 🔄
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-4 bg-white rounded-3xl shadow-lg p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-2">How to Play:</h3>
          <ul className="text-gray-600 space-y-1">
            <li>👆 Click the colorful circles before they disappear</li>
            <li>⚡ Build combos for bonus points</li>
            <li>⏱️ You have 30 seconds to score as high as you can</li>
            <li>🎯 Beat your high score!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}