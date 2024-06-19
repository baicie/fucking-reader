import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'

interface Section {
  id: string
  content: string
}

interface EpubRendererProps {
  onJumpToSection: (sectionId: string) => void
}

const EpubRenderer = forwardRef<unknown, EpubRendererProps>((props, ref) => {
  const [sections, setSections] = useState<Section[]>([])
  const [renderedSections, setRenderedSections] = useState<Section[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sections.length > 0) {
      setRenderedSections(sections.slice(0, 3))
    }
  }, [sections])

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        const nextSections = sections.slice(
          renderedSections.length,
          renderedSections.length + 3,
        )
        setRenderedSections((prev) => [...prev, ...nextSections])
      }
    }
  }

  useImperativeHandle(ref, () => ({
    jumpToSection(sectionId: string) {
      const sectionIndex = sections.findIndex(
        (section) => section.id === sectionId,
      )
      if (sectionIndex !== -1) {
        setRenderedSections(sections.slice(sectionIndex, sectionIndex + 3))
        if (containerRef.current) {
          containerRef.current.scrollTop = 0
        }
      }
    },
  }))

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height: '100vh', overflowY: 'scroll' }}
    >
      {renderedSections.map((section) => (
        <div
          key={section.id}
          id={section.id}
          dangerouslySetInnerHTML={{ __html: section.content }}
        ></div>
      ))}
    </div>
  )
})

export default EpubRenderer
