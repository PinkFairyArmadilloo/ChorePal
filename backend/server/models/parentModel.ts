import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

export interface IParent extends Document {
  username: string;
  password: string;
  // Note: childrenName stores ObjectIDs as Numbers per original schema.
  // Consider migrating to ObjectId[] in a future update.
  childrenName: number[];
}

const parentSchema = new Schema<IParent>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  childrenName: [Number],
});

parentSchema.pre('save', function (next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err: Error | undefined, hash: string) => {
    if (err) return next(err as Error);
    this.password = hash;
    return next();
  });
});

export default mongoose.model<IParent>('Parent', parentSchema);
