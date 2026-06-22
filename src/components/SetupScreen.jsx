import { LEVELS } from '../gameData';

export default function SetupScreen({ level, setLevel, timerMode, setTimerMode, onStart }) {
  return (
    <div className="board">
      <p className="section-label">Choose a level</p>
      <div className="level-row two">
        {Object.values(LEVELS).map((lv) => (
          <button
            key={lv.key}
            type="button"
            className={'level-card' + (level === lv.key ? ' active' : '')}
            onClick={() => setLevel(lv.key)}
          >
            <div className="lv-title">{lv.label}</div>
            <div className="lv-desc">{lv.pairs} pairs</div>
          </button>
        ))}
      </div>

      <p className="section-label">Choose a mode</p>
      <div className="level-row two">
        <button
          type="button"
          className={'level-card' + (timerMode === 'relaxed' ? ' active' : '')}
          onClick={() => setTimerMode('relaxed')}
        >
          <div className="lv-title">Relaxed</div>
          <div className="lv-desc">No clock</div>
        </button>
        <button
          type="button"
          className={'level-card' + (timerMode === 'timed' ? ' active' : '')}
          onClick={() => setTimerMode('timed')}
        >
          <div className="lv-title">Timed</div>
          <div className="lv-desc">Beat the clock</div>
        </button>
      </div>

      <button className="primary" onClick={onStart}>Start Game</button>
    </div>
  );
}
