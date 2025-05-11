import { PropsWithChildren, useState } from "react";
import styles from './index.module.scss';
import classNames from "classnames";

export default function Message({ children }: PropsWithChildren) {
  const [revealInfo, setRevealInfo] = useState(false);

  return (
    <div 
      className={classNames(styles.wrapper, { [styles.active]: revealInfo })} 
      onTouchStart={() => { setRevealInfo(true); }}
      onMouseDown={() => { setRevealInfo(true); }}
      onTouchEnd={() => { setRevealInfo(false); }}
      onMouseUp={() => { setRevealInfo(false); }}
    >
      {revealInfo ? children : 'Tap to see the info'}
    </div>
  )
}