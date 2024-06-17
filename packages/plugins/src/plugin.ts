interface BookPlugin {
  format: string
  parseTableOfContents(file: File): Promise<TableOfContents>
  renderContent(file: File, options: RenderOptions): Promise<RenderedContent>
}

interface TableOfContents {
  chapters: Chapter[]
}

interface Chapter {
  title: string
  startPosition: number | null
  endPosition: number | null
}

interface RenderOptions {
  theme?: string
  fontSize?: number
}

interface RenderedContent {
  html: string
  metadata: Metadata
}

interface Metadata {
  title: string
  author: string
}
