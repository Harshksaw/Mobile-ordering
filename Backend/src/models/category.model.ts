// filepath: /Users/harshsaw/Documents/GitHub/Mobile-ordering/Backend/src/models/category.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IItem } from './item.model';

export interface ICategory extends Document {
  name: string;
  items: IItem[];
}

const categorySchema: Schema = new Schema({
  name: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

export default mongoose.model<ICategory>('Category', categorySchema);