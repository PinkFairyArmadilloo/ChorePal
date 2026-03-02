// ─── Chore domain types ───────────────────────────────────────────────────────

export type ChoreStatus = 'Pending' | 'Completed';

export type ChoreDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface Chore {
  _id: string;
  choreName: string;
  isWeekly: boolean;
  isCompleted: boolean;
  rating: number | null;
  childName: string;
  image: string | null;
  day: ChoreDay;
  status: ChoreStatus;
}

// ─── API response shapes ──────────────────────────────────────────────────────

export interface ImageResponse {
  imageSource: string;
}

export interface LoginApiResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface SignupApiResponse {
  insertedId?: string;
  message?: string;
}
