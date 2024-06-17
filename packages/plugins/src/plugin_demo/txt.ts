class TxtPlugin implements BookPlugin {
  format = 'txt'

  async parseTableOfContents(file: File): Promise<TableOfContents> {
    const text = await file.text()
    const chapters = this.extractChapters(text)
    return { chapters }
  }

  async renderContent(
    file: File,
    options: RenderOptions,
  ): Promise<RenderedContent> {
    const text = await file.text()
    const html = `<pre>${text}</pre>`
    return { html, metadata: { title: 'TXT File', author: 'Unknown' } }
  }

  private extractChapters(content: string): Chapter[] {
    const lines = content.split('\n')
    const chapters: Chapter[] = []
    let position = 0
    for (const line of lines) {
      if (this.isChapterTitle(line)) {
        chapters.push({
          title: line,
          startPosition: position,
          endPosition: position + line.length,
        })
      }
      position += line.length + 1 // +1 for newline character
    }
    return chapters
  }

  private isChapterTitle(line: string): boolean {
    return line.startsWith('Chapter') // Simple heuristic
  }
}
