'use client';

import styles from './game.module.scss';

import { useEffect, useState } from 'react';
import PlayerList from './PlayerList';
import JoinButton from './JoinButton';
import { usePinUI } from './PinUI';
import CreateGameButton from './Button';
import Button from './Button';
import { ExitIcon } from '@radix-ui/react-icons';
import Message from './Message';
import { toast } from 'sonner';
import { funnyNames } from '../lib/funnyNames';
import ablyClient, { clientId } from '../lib/ably';
import { getNextCountry } from '../lib/countries';

// https://coolors.co/e2cfea-a06cd5-6247aa-102b3f-062726
export default function Game() {
  const [message, setMessage] = useState<string>('');
  const [channel, setChannel] = useState<ReturnType<typeof ablyClient.channels.get> | null>(null);
  const [isCreator, setIsCreator] = useState(false);
  const [activeGamePin, setActiveGamePin] = useState<string | null>(null);
  const [members, setMembers] = useState<{
    displayName: string;
    clientId: string;
  }[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [role, setRole] = useState<'spy' | 'civilian' | null>(null);
  const [pendingCountry, setPendingCountry] = useState<string | null>(null);

  const [currentMember, setCurrentMember] = useState<{
    displayName: string;
    clientId: string;
  } | null>(null);

  const {openPinUI, closePinUI, wrongPinCode, pinCode} = usePinUI();

  useEffect(() => {
    if (pendingCountry && role === 'civilian') {
      setMessage(`🌍 ${pendingCountry}`);
      setPendingCountry(null);
    } else if (pendingCountry && role === 'spy') {
      setMessage('🕵️ You are the spy!');
      setPendingCountry(null);
    }
  }, [pendingCountry, role]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * funnyNames.length);
    setCurrentMember({
      displayName: funnyNames[randomIndex],
      clientId
    });
  }, []);

  const subscribeToChannel = async (gamePin: string) => {
    if (channel) {
      channel.unsubscribe();
      await channel.presence.leave();
    }

    const ch = ablyClient.channels.get(`game:${gamePin}`);

    ch.subscribe((msg) => {
      if (msg.name === 'start') {
        setGameStarted(true);
      } else if (msg.name === 'new-round') {
        toast.success('New round started!');
      } else if (msg.name === 'country') {
        setPendingCountry(msg.data);
      } else if (msg.name === 'game-role') {
        if (msg.data?.clientId === clientId) {
          setRole(msg.data?.role);
        }
      } else {
        throw new Error(`Unknown message type: ${msg.name}`);
      }
    });
    
    await ch.presence.enter({ member: currentMember });

    const syncMembers = async () => {
      const presenceMembers = await ch.presence.get();
      const members = presenceMembers.map((m) => m.data?.member);
      setMembers(members);
    };

    ch.presence.subscribe(['enter', 'leave', 'update'], syncMembers);

    await syncMembers();

    setChannel(ch);
  };

  const handleCreateGame = () => {
    const newPin = Math.floor(1000 + Math.random() * 9000).toString();
    subscribeToChannel(newPin);
    setIsCreator(true);
    setActiveGamePin(newPin);
    setRole(null);
    setMessage('');
    setGameStarted(false);
  };

  const handleJoinGame = async (pinCode: string) => {
    const tempChannel = ablyClient.channels.get(`game:${pinCode}`);
    const members = await tempChannel.presence.get();
  
    if (members.length === 0) {
      return false;
    }
  
    // Valid game exists → join
    subscribeToChannel(pinCode);
    setActiveGamePin(pinCode);
    setIsCreator(false);
    setRole(null);
    setMessage('');
    setGameStarted(false);
    return true;
  };

  const tryJoinGame = async (pinCode: string) => {
    if (pinCode) {
      const isSuccess = await handleJoinGame(pinCode);
      isSuccess ? closePinUI() : wrongPinCode();
    }
  }

  useEffect(() => {
    tryJoinGame(pinCode);
  }, [pinCode]);

  const handleStartGame = async () => {
    if (!channel || !isCreator) return;
  
    const presenceMembers = await channel.presence.get();
    const clientIds = presenceMembers.map(m => m.clientId);
    const spyIndex = Math.floor(Math.random() * clientIds.length);
    const spyClientId = clientIds[spyIndex];
  
    const selectedCountry = getNextCountry();
  
    channel.publish('start', 'Game has started!');
  
    for (const id of clientIds) {
      const role = id === spyClientId ? 'spy' : 'civilian';
      channel.publish({ name: 'game-role', data: { role, clientId: id } });
    }
  
    channel.publish({ name: 'country', data: selectedCountry });
  
    setGameStarted(true);
  };

  const handleStartRound = async () => {
    await handleStartGame();
    channel?.publish({ name: 'new-round' });
  }

  const clear = () => {
    setIsCreator(false);
    setRole(null);
    setMessage('');
    setGameStarted(false);
    setActiveGamePin(null);
    setMembers([]);
    setPendingCountry(null);
  }

  if (!currentMember) return null;

  return (
    <div className={styles.wrapper}>
      {!activeGamePin ? (
        <div className={styles.landing}>
          <JoinButton onClick={openPinUI} />
          <CreateGameButton label="Create Game" onClick={handleCreateGame} />
        </div>
      ) : (
        <div className={styles.inGame}>
          <div className={styles.main}>
            <div className={styles.heading}>
              <div className={styles.pin}>{activeGamePin}</div>
              <PlayerList currentMember={currentMember} members={members} />
            </div>

            {gameStarted && (
              <Message>
                {message}
              </Message>
            )}

            {isCreator && (
              <div className={styles.buttons}>
                {gameStarted ? (
                  <Button label='Start a new Round' onClick={handleStartRound} />
                ) : (
                  <Button label='Start Game' onClick={handleStartGame} />
                )}
              </div>
            )}

            {gameStarted && (
              <Button secondary label={(
                <>
                  <ExitIcon />
                  <span>Exit</span>
                </>
              )} onClick={clear} />
            )}
          </div>
        </div>
      )}

      <div className={styles.qr}>
        <a href='/party/qr.png' target='_blank' rel='noopener noreferrer'>
          [QR]
        </a>
      </div>
    </div>
  );
}
