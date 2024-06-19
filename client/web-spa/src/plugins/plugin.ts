import { Book } from 'epubjs'

export interface BookPlugin {
  format: string
  book?: Book
  parseTableOfContents(file: File): Promise<TableOfContents>
  renderContent(file: File, options: RenderOptions): Promise<RenderedContent>
  parse(file: File): Promise<Book>
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
