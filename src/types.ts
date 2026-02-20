export interface HadithEntry {
  readonly id: string;
  readonly title: string;
  readonly arabic: string;
  readonly transliteration?: string;
  readonly translation: string;
  readonly category: string;
  readonly context?: string;
  readonly reference?: string;
  readonly times?: string[];
}

export interface HadithCategory {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
}

export interface HadithContext {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
}

export interface DailyHadith {
  readonly hadith: HadithEntry;
  readonly date: string;
}

export interface HadithProgress {
  readonly hadithId: string;
  readonly lastRead?: string;
  readonly readCount: number;
  readonly favorited: boolean;
}

export interface HadithCliConfig {
  readonly favoriteHadiths?: string[] | undefined;
  readonly dailyReminder?: boolean | undefined;
  readonly reminderTime?: string | undefined;
  readonly preferredLanguage?: 'arabic' | 'transliteration' | 'translation' | 'all' | undefined;
}

export interface CollectionHadith {
  readonly id: string;
  readonly collection: string;
  readonly hadithNumber: number;
  readonly text: string;
  readonly reference: string;
}
