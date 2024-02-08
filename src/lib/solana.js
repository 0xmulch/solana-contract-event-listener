// src/lib/solana.js

import { Connection, PublicKey } from '@solana/web3.js';

const network = 'https://api.devnet.solana.com'; // Adjust based on your target network
const connection = new Connection(network);

export const listenToContractEvent = async (contractAddress) => {
  const publicKey = new PublicKey(contractAddress);

  const eventHandler = (logs, context) => {
    console.log('Event detected:', logs, 'Context:', context);
    // Add your event-triggered logic here
  };

  const subscriptionId = connection.onLogs(publicKey, eventHandler, 'confirmed');
  return subscriptionId;
};

export const unsubscribe = async (subscriptionId) => {
  connection.removeOnLogsListener(subscriptionId);
};
