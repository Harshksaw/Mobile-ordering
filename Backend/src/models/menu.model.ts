

// incase of isFunctionOrConstructorTypeNode
// // filepath: /Users/harshsaw/Documents/GitHub/Mobile-ordering/Backend/src/models/menu.model.ts
// import mongoose, { Schema, Document } from 'mongoose';
// import { ICategory } from './category.model';

// export interface IMenu extends Document {
//   name: string;
//   categories: ICategory[];
// }

// const menuSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
// });

// export default mongoose.model<IMenu>('Menu', menuSchema);