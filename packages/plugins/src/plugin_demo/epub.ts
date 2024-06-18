import Epub from 'epubjs'
import {
  BookPlugin,
  TableOfContents,
  RenderedContent,
  RenderOptions,
} from '../plugin'

class EpubPlugin implements BookPlugin {
  format = 'epub'

  async parseTableOfContents(file: File): Promise<TableOfContents> {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        const book = Epub(reader.result as ArrayBuffer)
        book.loaded.navigation.then(({ toc }) => {
          const chapters = toc.map((chapter: any) => ({
            title: chapter.label,
            startPosition: chapter.href,
            endPosition: null,
          }))
          resolve({ chapters })
        })
      }
      reader.onerror = reject
    })
  }

  async renderContent(
    file: File,
    options: RenderOptions,
  ): Promise<RenderedContent> {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        const book = Epub(reader.result as ArrayBuffer)
        book.loaded.spine.then((spine) => {
          // 实现渲染内容的逻辑
          resolve({
            html: '<div>EPUB Content</div>',
            metadata: { title: 'EPUB Title', author: 'EPUB Author' },
          })
        })
      }
      reader.onerror = reject
    })
  }
}
