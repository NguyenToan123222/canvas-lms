
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'invalid_token', detail: 'Missing Bearer token' });
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET, { algorithms: ['HS256'] });    req.user = {
      id: payload.sub,
      scope: payload.scope || '',
      client_id: payload.client_id || '',
      iat: payload.iat,
      exp: payload.exp
    };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid_token', detail: err.message });
  }
}
