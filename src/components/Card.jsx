export default function Card({ card, flipped, matched, onClick, disabled }) {
  return (
    <button
      type="button"
      className={'card' + (flipped ? ' flipped' : '') + (matched ? ' matched' : '')}
      onClick={onClick}
      disabled={disabled}
      aria-label={flipped || matched ? card.name : 'Hidden card'}
    >
      <div className="card-inner">
        <div className="card-face card-back">?</div>
        <div className="card-face card-front">{card.emoji}</div>
      </div>
    </button>
  );
}
