const choreImageMap: Record<string, string> = {
  dishes: 'dishwashing.png',
  laundry: 'laundry.png',
  trash: 'take-out-trash.jpeg',
  vacuum: 'vacuum.jpeg',
  homework: 'do-homework.jpeg',
  sweeping: 'sweep-floor.png',
  bed: 'make-bed.jpeg',
  cleaning: 'clean-room.jpeg',
  dog: 'walk-dog.jpeg',
  groceries: 'groceries.png',
  shopping: 'groceries.png',
  carwash: 'car-wash.jpeg',
};

export const DEFAULT_IMAGE = 'clean-room.jpeg';

export const getImageFilenameForChore = (choreName: string): string => {
  const normalized = choreName.toLowerCase();

  for (const keyword in choreImageMap) {
    if (normalized.includes(keyword)) {
      return choreImageMap[keyword] ?? DEFAULT_IMAGE;
    }
  }

  if (normalized.includes('table')) return 'clean-room.png';
  if (normalized.includes('floor')) return 'sweep-floor.png';
  if (normalized.includes('bed')) return 'make-bed.png';
  if (normalized.includes('car')) return 'car-wash.jpeg';
  if (normalized.includes('poop')) return 'clean-room.jpeg';
  if (normalized.includes('toilet')) return 'clean-room.jpeg';

  return DEFAULT_IMAGE;
};
