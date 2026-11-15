import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import { env } from '../config/env.js';

export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || '';

    const [scheme, token] = header.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Send a Bearer token.'
      });
    }

    const payload = jwt.verify(
      token,
      env.jwtSecret
    );

    const user = await User.findById(payload.sub);

    if (!user || user.status !== 'active') {
      return res.status(401).json({
        success: false,
        message: 'Account not found or not active.'
      });
    }

    req.user = user;

    next();

  } catch (error) {
    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token. Please log in again.'
      });
    }

    next(error);
  }
}

// export function authorize(...allowedRoles) {
//   return (req, res, next) => {

//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Authentication required.'
//       });
//     }

//     if (!allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({
//         success: false,
//         message: 'You do not have permission to access this resource.'
//       });
//     }

//     next();
//   };
// }



export function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to access this resource.'
      });
    }

    next();
  };
}
