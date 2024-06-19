import type { LogLevel } from './log-level'

/**
 * 日志打印接口
 */
/* eslint-disable no-unused-vars */
export interface LogTransport {
  /** 级别限制，高于此级别的log不会显示 */
  readonly maxLevel: LogLevel

  /**
   * 打印日志
   * @param level     级别
   * @param module    模块名
   * @param msg       消息
   */
  log(level: LogLevel, module: string, msg: string): void
}
