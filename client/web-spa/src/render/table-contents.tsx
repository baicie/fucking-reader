import { NavItem } from 'epubjs'
import React from 'react'

interface Props {
  toc: NavItem[]
  onJumpToSection: (sectionId: string) => void
}

const TableOfContents: React.FC<Props> = ({ toc, onJumpToSection }) => {
  return (
    <div>
      <h2>Table of Contents</h2>
      <ul>
        {toc.map((item) => (
          <li key={item.id} onClick={() => onJumpToSection(item.id)}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TableOfContents
