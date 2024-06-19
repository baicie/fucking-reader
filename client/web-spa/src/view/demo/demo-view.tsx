import type { ReactElement } from 'react'
import styles from './demo.module.scss'

interface Props {
  msg: string
  onClick: () => void
}

const DemoView = ({ msg, onClick }: Props): ReactElement => (
  <div>
    <h1 className={styles.text}>{msg}</h1>
    <button type="button" className={styles.button} onClick={onClick}>
      click
    </button>
  </div>
)
export default DemoView
