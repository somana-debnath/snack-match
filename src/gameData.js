export const FOOD_POOL = [
  { id: 0, emoji: '🍕', name: 'Pizza' },
  { id: 1, emoji: '🍰', name: 'Cake' },
  { id: 2, emoji: '🥨', name: 'Pretzel' },
  { id: 3, emoji: '🍔', name: 'Burger' },
  { id: 4, emoji: '🍟', name: 'Fries' },
  { id: 5, emoji: '🌮', name: 'Taco' },
  { id: 6, emoji: '🍣', name: 'Sushi' },
  { id: 7, emoji: '🍦', name: 'Ice Cream' },
  { id: 8, emoji: '🌭', name: 'Hot Dog' },
  { id: 9, emoji: '🍩', name: 'Donut' },
  { id: 10, emoji: '🍪', name: 'Cookie' },
  { id: 11, emoji: '🥪', name: 'Sandwich' },
  { id: 12, emoji: '🧁', name: 'Cupcake' },
  { id: 13, emoji: '🍗', name: 'Drumstick' },
  { id: 14, emoji: '🧀', name: 'Cheese' },
  { id: 15, emoji: '🥯', name: 'Bagel' },
  { id: 16, emoji: '🍿', name: 'Popcorn' },
  { id: 17, emoji: '🍫', name: 'Chocolate' },
];

export const LEVELS = {
  easy: { key: 'easy', label: 'Easy', cols: 4, pairs: 8, timed: 70 },
  hard: { key: 'hard', label: 'Hard', cols: 4, pairs: 12, timed: 120 },
};

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildDeck(level) {
  const foods = FOOD_POOL.slice(0, level.pairs);
  const cards = foods.flatMap((f) => [
    { key: `${f.id}-a`, pairId: f.id, emoji: f.emoji, name: f.name },
    { key: `${f.id}-b`, pairId: f.id, emoji: f.emoji, name: f.name },
  ]);
  return shuffle(cards);
}

export function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec < 10 ? '0' + sec : sec}`;
}
