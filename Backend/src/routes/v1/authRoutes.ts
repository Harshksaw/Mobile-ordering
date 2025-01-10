import { Router, Request, Response } from "express";

import { LoginAdmin, registerAdmin } from "../../controllers/admin.controller";

const router = Router();

// Login route
router.post("/register", registerAdmin as any);
router.post("/login", LoginAdmin as any);

export default router;
