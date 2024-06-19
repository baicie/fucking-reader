import { container } from 'tsyringe'
import { ConsoleLogTransport } from './utils/logger/console-transport'
import { Logger } from './utils/logger/logger'
import { LogLevel } from './utils/logger/log-level'

export function registerGlobalModules(): void {
  container.registerInstance(
    Logger,
    new Logger([new ConsoleLogTransport(LogLevel.Debug)]),
  )
}
