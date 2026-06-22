import { formatTime } from '../gameData';

export default function ResultScreen({ data, onReplay, onChangeSettings }) {
  const won = data.result === 'won';
  return (
    <div className="board result-wrap">
      <div className="result-emoji">{won ? '🎉' : '⏰'}</div>
      <h2 className="result-title">{won ? 'You matched them all!' : "Time's Up!"}</h2>
      {!won && (
        <p className="result-sub">
          {`You matched ${data.matchedCount} of ${data.totalPairs} pairs before time ran out.`}
        </p>
      )}
      <div className="result-stats">
        <div className="stat">Moves<b>{data.moves}</b></div>
        <div className="stat">Time<b>{formatTime(data.secondsUsed)}</b></div>
        <div className="stat">Pairs<b>{data.matchedCount}/{data.totalPairs}</b></div>
      </div>
      <div className="result-actions">
        <button className="primary" onClick={onReplay}>Play Again</button>
        <button className="ghost" onClick={onChangeSettings}>New Settings</button>
      </div>
    </div>
  );
}
