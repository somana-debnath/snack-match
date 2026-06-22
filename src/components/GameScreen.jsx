import { useState, useEffect, useRef, useCallback } from 'react';
import { LEVELS, buildDeck, formatTime } from '../gameData';
import Card from './Card';

export default function GameScreen({ level, timerMode, onFinish, onQuit }) {
  const lv = LEVELS[level];
  const [deck] = useState(() => buildDeck(lv));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [busy, setBusy] = useState(false);
  const [seconds, setSeconds] = useState(timerMode === 'timed' ? lv.timed : 0);

  const finishedRef = useRef(false);
  const movesRef = useRef(moves); movesRef.current = moves;
  const matchedRef = useRef(matched); matchedRef.current = matched;
  const onFinishRef = useRef(onFinish); onFinishRef.current = onFinish;

  // Timer ticks once per second; runs for the lifetime of this screen only.
  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => {
        if (timerMode === 'timed') {
          if (s <= 1) {
            clearInterval(id);
            if (!finishedRef.current) {
              finishedRef.current = true;
              onFinishRef.current({
                result: 'timeout',
                moves: movesRef.current,
                matchedCount: matchedRef.current.size / 2,
                totalPairs: lv.pairs,
                secondsUsed: lv.timed,
              });
            }
            return 0;
          }
          return s - 1;
        }
        return s + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timerMode, lv]);

  const handleCardClick = useCallback((card) => {
    if (busy || flipped.includes(card.key) || matched.has(card.key)) return;
    const next = [...flipped, card.key];
    setFlipped(next);

    if (next.length === 2) {
      setBusy(true);
      setMoves((m) => m + 1);
      const [k1, k2] = next;
      const c1 = deck.find((d) => d.key === k1);
      const c2 = deck.find((d) => d.key === k2);

      if (c1.pairId === c2.pairId) {
        setTimeout(() => {
          setMatched((prev) => {
            const ns = new Set(prev);
            ns.add(k1); ns.add(k2);
            if (ns.size === deck.length && !finishedRef.current) {
              finishedRef.current = true;
              setTimeout(() => onFinishRef.current({
                result: 'won',
                moves: movesRef.current,
                matchedCount: ns.size / 2,
                totalPairs: lv.pairs,
                secondsUsed: timerMode === 'timed' ? lv.timed - seconds : seconds,
              }), 400);
            }
            return ns;
          });
          setFlipped([]);
          setBusy(false);
        }, 350);
      } else {
        setTimeout(() => { setFlipped([]); setBusy(false); }, 700);
      }
    }
  }, [busy, flipped, matched, deck, seconds, timerMode, lv]);

  return (
    <div className="board">
      <div className="statbar">
        <div className="stat">Moves<b>{moves}</b></div>
        <div className={'stat' + (timerMode === 'timed' && seconds <= 10 ? ' warn' : '')}>
          {timerMode === 'timed' ? 'Time left' : 'Time'}<b>{formatTime(seconds)}</b>
        </div>
        <button className="ghost" onClick={onQuit}>New Settings</button>
      </div>

      <div className="grid" style={{ gridTemplateColumns: `repeat(${lv.cols}, 1fr)` }}>
        {deck.map((card) => (
          <Card
            key={card.key}
            card={card}
            flipped={flipped.includes(card.key)}
            matched={matched.has(card.key)}
            disabled={busy && !flipped.includes(card.key)}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
}
