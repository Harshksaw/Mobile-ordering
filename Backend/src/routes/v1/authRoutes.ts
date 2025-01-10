import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Admin } from '../../models';


const router = Router();

// Login route
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    

    try {
        // Find user by email
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export default router;