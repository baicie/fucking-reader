import { BookPlugin } from './plugin'

export class PluginManager {
  private plugins = new Map<string, BookPlugin>()

  registerPlugin(plugin: BookPlugin) {
    this.plugins.set(plugin.format, plugin)
  }

  getPlugin(format: string): BookPlugin | undefined {
    return this.plugins.get(format)
  }
}
