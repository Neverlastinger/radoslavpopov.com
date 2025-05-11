import Ably from 'ably';
import { v4 as uuidv4 } from 'uuid';

export const clientId = uuidv4();

const ablyClient = new Ably.Realtime({
  key: process.env.NEXT_PUBLIC_ABLY_API_KEY!,
  clientId,
});

export default ablyClient;
