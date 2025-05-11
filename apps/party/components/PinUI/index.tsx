import { createContext, RefObject, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import styles from './index.module.scss'
import { ArrowLeftIcon, Cross1Icon } from '@radix-ui/react-icons';

interface Props {
  onPinEntered: (pin: string) => void
  onClose: () => void
  ref?: RefObject<any>
}

export default function PinUI({ onPinEntered, onClose, ref }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [pin, setPin] = useState<string>('');

  useImperativeHandle(ref, () => ({
    wrongPinCode: () => {
      setPin('');
      wrapperRef.current?.classList.add(styles.shake);
      setTimeout(() => {
        wrapperRef.current?.classList.remove(styles.shake);
      }, 500);
    },
  }));

  useEffect(() => {
    if (pin && pin.length === 4) {
      onPinEntered(pin);
    }
  }, [pin]);

  const onPress = (digit: number) => {
    setPin((prev) => prev + digit);
  };

  const onEraseDigit = () => {
    setPin((prev) => prev.slice(0, -1));
  }

  const handleClose = () => {
    setPin('');
    onClose();
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.pinText}>{pin || 'Enter Game PIN'}</div>
      <div className={styles.digits}>
        <button onClick={() => onPress(1)} disabled={pin.length === 4}>1</button>
        <button onClick={() => onPress(2)} disabled={pin.length === 4}>2</button>
        <button onClick={() => onPress(3)} disabled={pin.length === 4}>3</button>
        <button onClick={() => onPress(4)} disabled={pin.length === 4}>4</button>
        <button onClick={() => onPress(5)} disabled={pin.length === 4}>5</button>
        <button onClick={() => onPress(6)} disabled={pin.length === 4}>6</button>
        <button onClick={() => onPress(7)} disabled={pin.length === 4}>7</button>
        <button onClick={() => onPress(8)} disabled={pin.length === 4}>8</button>
        <button onClick={() => onPress(9)} disabled={pin.length === 4}>9</button>
        <button onClick={handleClose} disabled={pin.length === 4}><Cross1Icon className={styles.icon} /></button>
        <button onClick={() => onPress(0)} disabled={pin.length === 4}>0</button>
        <button onClick={onEraseDigit} disabled={pin.length === 4}><ArrowLeftIcon className={styles.icon} /></button>
      </div>
    </div>
  )
}

interface PinUIContextType {
  isOpen: boolean,
  openPinUI: () => void,
  closePinUI: () => void,
  wrongPinCode: () => void,
  pinCode: string,
}

export const PinUIContext = createContext<PinUIContextType | null>(null);

export const PinUIProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pinCode, setPinCode] = useState<string>('');
  const pinUIRef = useRef<any>(null);

  const openPinUI = () => {
    setIsOpen(true);
  };

  const closePinUI = () => {
    setPinCode('');
    setIsOpen(false);
  };

  const wrongPinCode = () => {
    pinUIRef.current.wrongPinCode();
    setPinCode('');
  };

  return (
    <PinUIContext.Provider value={{ isOpen, openPinUI, closePinUI, wrongPinCode, pinCode }}>
      {children}
      {isOpen && (
        <PinUI 
          onPinEntered={(pin) => {
            setPinCode(pin);
          }}
          ref={pinUIRef}
          onClose={closePinUI}
        />
      )}
    </PinUIContext.Provider>
  );
}

export function usePinUI() {
  const context = useContext(PinUIContext);
  if (!context) {
    throw new Error('usePinUI must be used within a PinUIProvider');
  }
  return context;
}