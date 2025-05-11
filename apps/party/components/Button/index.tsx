import classNames from 'classnames'
import styles from './index.module.scss'
import { ReactNode } from 'react'

interface Props {
  onClick: () => void
  label: string | ReactNode
  secondary?: boolean
}

export default function Button({ onClick, label, secondary }: Props) {
  return (
    <button className={classNames(styles.wrapper, { [styles.secondary]: secondary })} onClick={onClick}>
      <label>{label}</label>
      <div className={styles.button}>
        <div className={styles.inner} />
      </div>
    </button>
  )
}