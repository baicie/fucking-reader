import { LogLevel } from './log-level'
import type { LogTransport } from './transport'

/**
 * Log Service
 */
export class Logger {
  constructor(private transports: LogTransport[]) {
    this.transports = transports
  }

  public addTransport(transport: LogTransport): void {
    this.transports.push(transport)
  }

  public error(msg: string): void {
    this.log(LogLevel.Error, msg)
  }

  public warn(msg: string): void {
    this.log(LogLevel.Warn, msg)
  }

  public info(msg: string): void {
    this.log(LogLevel.Info, msg)
  }

  public debug(msg: string): void {
    this.log(LogLevel.Debug, msg)
  }

  public log(level: LogLevel, msg: string): void {
    this.transports.forEach((transport) => {
      transport.log(level, 'app', msg)
    })
  }
}
