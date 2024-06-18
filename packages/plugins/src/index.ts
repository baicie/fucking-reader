import { BookPlugin } from './plugin'

class PluginManager {
  private plugins: Map<string, BookPlugin> = new Map()

  registerPlugin(plugin: BookPlugin) {
    this.plugins.set(plugin.format, plugin)
  }

  getPlugin(format: string): BookPlugin | undefined {
    return this.plugins.get(format)
  }
}
