import { ObjectId } from 'mongodb';

// ─── MongoDB document shapes (raw driver, not Mongoose) ─────────────────────

export interface DbUser {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  childrenName: string[];
}

export interface DbChore {
  _id?: ObjectId;
  choreName: string;
  isWeekly: boolean;
  isCompleted: boolean;
  rating: number | null;
  childName: string;
  image: string | null;
  day: string;
}

export interface DbChild {
  _id?: ObjectId;
  username: string;
}

// ─── JWT ─────────────────────────────────────────────────────────────────────

export interface JWTPayload {
  _id?: string;
  username?: string;
  email?: string;
  iat?: number;
  exp?: number;
}

// ─── API response shapes ─────────────────────────────────────────────────────

export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface ImageResponse {
  imageSource: string;
}
