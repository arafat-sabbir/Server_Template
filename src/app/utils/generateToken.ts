import jwt, { SignOptions } from 'jsonwebtoken';
import { Types } from 'mongoose';

// Interface for type safety
interface JwtPayload {
  id: string | Types.ObjectId;
}

/**
 * Generates a JWT token for Plumber Manager authentication.
 * @param jwtPayload - Object containing user ID and role
 * @param secret - JWT secret key
 * @param expiresIn - Token expiration time (e.g., '10d')
 * @returns Promise resolving to the generated JWT token
 * @throws Error if token generation fails
 */
async function generateToken(
  jwtPayload: JwtPayload,
  secret: string,
  expiresIn: string
): Promise<string> {
  try {
    // Convert Types.ObjectId to string to ensure a plain object
    const payload = {
      id: jwtPayload.id instanceof Types.ObjectId ? jwtPayload.id.toString() : jwtPayload.id,
    };

    // Validate inputs
    if (!payload.id) {
      throw new Error('Invalid payload: id  are required');
    }
    if (!secret) {
      throw new Error('JWT secret is missing');
    }
    if (!expiresIn) {
      throw new Error('Expiration time is missing');
    }

    // JWT signing options
    const options: SignOptions = {
      expiresIn,
      issuer: 'PlumberManager',
      audience: 'PlumberManagerAPI',
    };

    // Generate token
    const token = jwt.sign(payload, secret, options);
    return token;
  } catch (error: any) {
    throw new Error(`Failed to generate token: ${error.message}`);
  }
}

export default generateToken;
