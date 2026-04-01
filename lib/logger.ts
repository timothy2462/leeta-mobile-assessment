/**
 * Leeta Production Logger
 * ───────────────────────
 * Thin wrapper around console that adds log levels, timestamps, and a
 * clear integration point for a real monitoring service (e.g. Sentry, Datadog).
 *
 * Production strategy:
 *   1. In dev: logs are printed to the console with emoji prefixes.
 *   2. In production: replace console calls with your monitoring SDK:
 *      - Sentry.addBreadcrumb({ message, data, level })
 *      - Datadog.addLog({ message, ...data, level })
 *      - analytics.track('log_event', entry)
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: Record<string, unknown>;
}

const LEVEL_EMOJI: Record<LogLevel, string> = {
  debug: '🔍',
  info: 'ℹ️ ',
  warn: '⚠️ ',
  error: '❌',
};

function log(level: LogLevel, message: string, data?: Record<string, unknown>): void {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    data,
  };

  if (__DEV__) {
    const prefix = `${LEVEL_EMOJI[level]} [Leeta] ${entry.timestamp}`;
    const logFn = level === 'error' ? console.error
      : level === 'warn' ? console.warn
      : level === 'debug' ? console.log
      : console.info;
    logFn(prefix, message, data ?? '');
  }

  if (level === 'error') {
    // Sentry.captureException(new Error(message));
    // DdLogs.error(message, data);
  } else {
    // Sentry.addBreadcrumb({ message, level, data });
  }
}

export const logger = {
  debug: (message: string, data?: Record<string, unknown>) => log('debug', message, data),
  info:  (message: string, data?: Record<string, unknown>) => log('info',  message, data),
  warn:  (message: string, data?: Record<string, unknown>) => log('warn',  message, data),
  error: (message: string, data?: Record<string, unknown>) => log('error', message, data),
};
