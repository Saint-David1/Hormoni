export const MOOD_LABELS: Record<number, string> = {
  1: 'Terrible',
  2: 'Bad',
  3: 'Okay',
  4: 'Good',
  5: 'Great',
};

export const MOODS = [
  { level: 1, emoji: '😫', label: MOOD_LABELS[1] },
  { level: 2, emoji: '🙁', label: MOOD_LABELS[2] },
  { level: 3, emoji: '😐', label: MOOD_LABELS[3] },
  { level: 4, emoji: '🙂', label: MOOD_LABELS[4] },
  { level: 5, emoji: '😁', label: MOOD_LABELS[5] },
];
