import styles from './index.module.scss'

interface Props {
  onClick: () => void
}

export default function JoinButton({ onClick }: Props) {
  return (
    <button className={styles.wrapper} onClick={onClick}>
      <label>Join Game</label>
      <div className={styles.button}>
        <div className={styles.inner} />
      </div>
    </button>
  )
}