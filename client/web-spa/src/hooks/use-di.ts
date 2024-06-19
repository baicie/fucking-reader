import { useState } from 'react'
import type { InjectionToken } from 'tsyringe'
import { container } from 'tsyringe'

/**
 * hooks：创建一个使用依赖注入的对象
 * @param ctor
 * @returns
 */
export function useInjectable<T>(InjectionToken: InjectionToken<T>): T {
  const [fn] = useState(() => container.resolve(InjectionToken))
  return fn
}
