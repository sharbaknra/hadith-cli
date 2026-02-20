export interface Dua {
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

export interface DuaCategory {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
}

export interface DuaContext {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
}

export interface DailyDua {
  readonly dua: Dua;
  readonly date: string;
}

export interface DuaProgress {
  readonly duaId: string;
  readonly lastRead?: string;
  readonly readCount: number;
  readonly favorited: boolean;
}

export interface DuaConfig {
  readonly favoriteDuas?: string[] | undefined;
  readonly dailyReminder?: boolean | undefined;
  readonly reminderTime?: string | undefined;
  readonly preferredLanguage?: 'arabic' | 'transliteration' | 'translation' | 'all' | undefined;
}

export interface Hadith {
  readonly id: string;
  readonly collection: string;
  readonly hadithNumber: number;
  readonly text: string;
  readonly reference: string;
}
