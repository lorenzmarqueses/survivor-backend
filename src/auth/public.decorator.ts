import { SetMetadata } from '@nestjs/common';

// This will be the key that the guard will check
export const IS_PUBLIC_KEY = 'isPublic';

// The Public decorator that you can apply to routes
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
