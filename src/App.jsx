import { useState } from 'react';
import SetupScreen from './components/SetupScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import './App.css';

export default function App() {
  const [screen, setScreen] = useState('setup');
  const [level, setLevel] = useState('easy');
  const [timerMode, setTimerMode] = useState('relaxed');
  const [result, setResult] = useState(null);
  const [gameKey, setGameKey] = useState(0);

  return (
    <div className="app">
      <h1 className="title">Snack Match</h1>
      <p className="subtitle">A quick memory matching game</p>

      {screen === 'setup' && (
        <SetupScreen
          level={level}
          setLevel={setLevel}
          timerMode={timerMode}
          setTimerMode={setTimerMode}
          onStart={() => { setGameKey((k) => k + 1); setScreen('playing'); }}
        />
      )}

      {screen === 'playing' && (
        <GameScreen
          key={gameKey}
          level={level}
          timerMode={timerMode}
          onFinish={(data) => { setResult(data); setScreen('result'); }}
          onQuit={() => setScreen('setup')}
        />
      )}

      {screen === 'result' && (
        <ResultScreen
          data={result}
          onReplay={() => { setGameKey((k) => k + 1); setScreen('playing'); }}
          onChangeSettings={() => setScreen('setup')}
        />
      )}

      <footer className="note">Built by Somana Debnath 2026</footer>
    </div>
  );
}
