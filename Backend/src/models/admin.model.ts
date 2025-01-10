import { Schema, model, Document } from 'mongoose';

interface IAdmin extends Document {
    username: string;
    password: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

const AdminSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: 'admin' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default model<IAdmin>('Admin', AdminSchema);