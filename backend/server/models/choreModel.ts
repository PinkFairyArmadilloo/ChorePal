import mongoose, { Schema, Document } from 'mongoose';

export interface IChore extends Document {
  choreName?: string;
  isWeekly: boolean;
  isCompleted: boolean;
  rating?: number;
  childName?: string;
  image?: string;
  day?: string;
}

const choreSchema = new Schema<IChore>({
  choreName: { type: String },
  isWeekly: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  rating: { type: Number },
  childName: { type: String },
  image: { type: String },
  day: { type: String },
});

export default mongoose.model<IChore>('Chore', choreSchema);
