// Simple logging utility
// Provides structured logging with different levels

const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
};

const colors = {
  ERROR: '\x1b[31m', // Red
  WARN: '\x1b[33m',  // Yellow
  INFO: '\x1b[36m',  // Cyan
  DEBUG: '\x1b[90m', // Gray
  RESET: '\x1b[0m',
};

const formatMessage = (level, message, meta = {}) => {
  const timestamp = new Date().toISOString();
  const metaString = Object.keys(meta).length > 0 ? ` | ${JSON.stringify(meta)}` : '';

  return `[${timestamp}] [${level}] ${message}${metaString}`;
};

const shouldLog = (level) => {
  const isDevelopment = process.env.NODE_ENV !== 'production';

  // In production, only log ERROR and WARN
  if (!isDevelopment && (level === LOG_LEVELS.DEBUG || level === LOG_LEVELS.INFO)) {
    return false;
  }

  return true;
};

const log = (level, message, meta = {}) => {
  if (!shouldLog(level)) return;

  const formattedMessage = formatMessage(level, message, meta);
  const coloredMessage = `${colors[level]}${formattedMessage}${colors.RESET}`;

  if (level === LOG_LEVELS.ERROR) {
    console.error(coloredMessage);
  } else if (level === LOG_LEVELS.WARN) {
    console.warn(coloredMessage);
  } else {
    console.log(coloredMessage);
  }
};

const logger = {
  error: (message, meta = {}) => log(LOG_LEVELS.ERROR, message, meta),
  warn: (message, meta = {}) => log(LOG_LEVELS.WARN, message, meta),
  info: (message, meta = {}) => log(LOG_LEVELS.INFO, message, meta),
  debug: (message, meta = {}) => log(LOG_LEVELS.DEBUG, message, meta),
};

module.exports = logger;
