import dayjs from 'dayjs'
import { LogLevel } from './log-level'
import type { LogTransport } from './transport'

const LEVEL_TAGS = {
  [LogLevel.Debug]: 'DBG',
  [LogLevel.Info]: 'INF',
  [LogLevel.Warn]: 'WRN',
  [LogLevel.Error]: 'ERR',
}

const COLORS = {
  [LogLevel.Debug]: '#3CABDB',
  [LogLevel.Info]: '#167FFC',
  [LogLevel.Warn]: '#595BD4',
  [LogLevel.Error]: '#FD3259',
}

function getFn(level: LogLevel) {
  if (level === LogLevel.Error) {
    return console.error
  }

  if (level === LogLevel.Warn) {
    return console.warn
  }

  if (level === LogLevel.Info) {
    return console.info
  }

  return console.debug
}

/**
 * 日志打印接口 控制台实现
 */
export class ConsoleLogTransport implements LogTransport {
  constructor(public readonly maxLevel: LogLevel) {
    this.maxLevel = maxLevel
  }

  log(level: LogLevel, module: string, msg: string): void {
    if (level > this.maxLevel) {
      return
    }

    this.render(level, module, msg)
  }

  private render(level: LogLevel, module: string, msg: string): void {
    const levelTag = LEVEL_TAGS[level]
    const levelText = `%c${levelTag}%c`
    const levelColorText = `color: #FFF; background:${COLORS[level]};`

    const timestamp = dayjs().format('HH:mm:ss.SSS')

    const moduleText = module ? `[${module}]` : ''

    getFn(level).call(
      console,
      `${levelText} [${timestamp}] ${moduleText} ${msg}`,
      levelColorText,
      '',
    )
  }
}
