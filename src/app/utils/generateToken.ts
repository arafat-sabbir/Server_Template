import jwt from 'jsonwebtoken';
export const generateToken = async (
  jwtPayload: { id: string; role: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
