import mongoose, { Schema, Document } from 'mongoose';

export interface IChild extends Document {
  username: string;
}

const childSchema = new Schema<IChild>({
  username: { type: String, required: true, unique: true },
});

export default mongoose.model<IChild>('Child', childSchema);
