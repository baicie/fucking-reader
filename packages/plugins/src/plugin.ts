export interface BookPlugin {
  format: string
  parseTableOfContents(file: File): Promise<TableOfContents>
  renderContent(file: File, options: RenderOptions): Promise<RenderedContent>
}

export interface TableOfContents {
  chapters: Chapter[]
}

export interface Chapter {
  title: string
  startPosition: number | null
  endPosition: number | null
}

export interface RenderOptions {
  theme?: string
  fontSize?: number
}

export interface RenderedContent {
  html: string
  metadata: Metadata
}

interface Metadata {
  title: string
  author: string
}
