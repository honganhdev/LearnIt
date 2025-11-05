// Simple rate limiter middleware
// Tracks requests per IP address and blocks excessive requests

const requestCounts = new Map();

// Clean up old entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of requestCounts.entries()) {
    if (now - data.resetTime > 15 * 60 * 1000) {
      requestCounts.delete(key);
    }
  }
}, 15 * 60 * 1000);

const createRateLimiter = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    max = 100, // limit each IP to 100 requests per windowMs
    message = 'Too many requests, please try again later.',
  } = options;

  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    if (!requestCounts.has(ip)) {
      requestCounts.set(ip, {
        count: 1,
        resetTime: now + windowMs,
      });
      return next();
    }

    const requestData = requestCounts.get(ip);

    // Reset if window has expired
    if (now > requestData.resetTime) {
      requestData.count = 1;
      requestData.resetTime = now + windowMs;
      return next();
    }

    // Increment count
    requestData.count++;

    // Check if limit exceeded
    if (requestData.count > max) {
      return res.status(429).json({
        success: false,
        message,
      });
    }

    next();
  };
};

// Rate limiters for different endpoints
const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 minutes for auth endpoints
  message: 'Too many authentication attempts, please try again later.',
});

const apiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100, // 100 requests per 15 minutes for API endpoints
  message: 'Too many requests, please slow down.',
});

module.exports = {
  authLimiter,
  apiLimiter,
  createRateLimiter,
};
