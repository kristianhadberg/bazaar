import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: "Unauthorized access" });
            }
            // Attach user ID to request object
            req.body.userId = (decoded as any).id;
            next();
        });
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
};
