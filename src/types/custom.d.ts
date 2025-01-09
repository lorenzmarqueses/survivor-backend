import { User } from '@prisma/client'; // Import User type from Prisma or wherever your user model is
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Add the `user` property with the type of your user model (e.g., Prisma User)
    }
  }
}
