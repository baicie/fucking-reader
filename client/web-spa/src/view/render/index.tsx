import React, { useState, useEffect, useRef } from 'react'
import EpubRenderer from '../../render/render'
import TableOfContents from '../../render/table-contents'
import { Button, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import ePub, { NavItem } from 'epubjs'

const App: React.FC = () => {
  const [toc, setToc] = useState<NavItem[]>([])
  const epubRendererRef = useRef<any>(null)
  const [fileList, setFileList] = useState<any[]>([])
  const [book, setBook] = useState<any>(null) // 存储 EPUBJS Book 对象

  const handleJumpToSection = (sectionId: string) => {
    console.log('Jump to section:', sectionId)

    if (epubRendererRef.current) {
      epubRendererRef.current.jumpToSection(sectionId)
    }
  }

  // 上传前的验证
  const beforeUpload = (file: File) => {
    const isEPUB =
      file.type === 'application/epub+zip' || file.name.endsWith('.epub')
    if (!isEPUB) {
      message.error('请上传 EPUB 格式的文件！')
    }
    parseEPUB(file)
    return false
  }

  // 文件上传状态改变时的处理
  const handleChange = (info: any) => {
    let newFileList = [...info.fileList]

    // 1. 限制文件列表只保留一个文件
    newFileList = newFileList.slice(-1)

    // 2. 状态为 done 时解析 EPUB 文件
    if (info.file.status === 'done') {
      const file = info.file.originFileObj
      console.log('File uploaded:', file)

      parseEPUB(file)
    }

    setFileList(newFileList)
  }

  // 解析 EPUB 文件
  const parseEPUB = (file: File) => {
    const reader = new FileReader()
    reader.onload = async () => {
      const epubData = reader.result as ArrayBuffer
      const book = ePub(epubData)
      await book.ready

      setToc(book.navigation.toc)
      setBook(book)
      var toc = book.navigation.toc
      toc.forEach(function (chapter) {
        book.load(chapter.href).then(function (contents) {
          console.log(contents)
        })
      })
      // 遍历每个章节并获取内容
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <div style={{ display: 'flex' }}>
      <Upload
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        multiple={false}
        accept="application/epub+zip,.epub"
        showUploadList={{ showDownloadIcon: false }}
      >
        <Button icon={<UploadOutlined />}>选择文件</Button>
      </Upload>

      <TableOfContents toc={toc} onJumpToSection={handleJumpToSection} />
      <EpubRenderer
        ref={epubRendererRef}
        onJumpToSection={handleJumpToSection}
      />
    </div>
  )
}

export default App
