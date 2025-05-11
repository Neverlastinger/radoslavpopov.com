import styles from './index.module.scss'

interface Props {
  currentMember: {
    displayName: string
    clientId: string
  }
  members: {
    displayName: string
    clientId: string
  }[]
}

export default function PlayerList({ currentMember, members }: Props) {
  const otherMembers = members.filter((m) => m.clientId !== currentMember.clientId);

  return (
    <div className={styles.list}>
      <h2>Connected Players</h2>

      <ol>
        <li><strong>You ({currentMember.displayName})</strong></li>
        {otherMembers.length > 0 && (
          <>
            {otherMembers
              .map((member) => (
                <li key={member.clientId}>{member.displayName}</li>
              ))}
          </>
      )}
      </ol>
    </div>
  )
}