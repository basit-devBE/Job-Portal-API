import { rateLimit } from "express-rate-limit"

const limit = rateLimit(
    {
        windowMs: 15 * 60 * 100,
        max: 10,
        standardHeaders: 'draft-7',
        legacyHeaders: false 
    }
)

export default limit