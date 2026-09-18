export interface DecorationOption {
  id: string;
  name: string;
  category: 'arabic' | 'english' | 'gaming' | 'frames';
  tags: string[];
  transform: (text: string) => string;
}

export interface EmojiItem {
  id: string;
  char: string;
  name: string;
  category: string;
  keywords: string[];
}

export interface EmojiCombo {
  id: string;
  title: string;
  combo: string;
  category: string;
  meaning: string;
}

export interface KaomojiItem {
  id: string;
  code: string;
  title: string;
  category: string;
}

export interface UserReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  badge?: string;
}

export interface PlatformStat {
  label: string;
  value: string | number;
  subtext: string;
  iconName: string;
}
