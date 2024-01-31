import path from 'path';
import player from "play-sound";
import config from './utils/config';

export const sleep = async function (ms_: number) {
  return new Promise(resolve => setTimeout(resolve, ms_));
}

const mp3File = path.join(path.resolve(), 'newBlock.mp3');
const play = player({});


async function main() {
  const Client = require('bitcoin-core');
  const client = new Client({
    network: config.bitcoin?.network,
    username: config.bitcoin?.username,
    password: config.bitcoin?.password,
    host: config.bitcoin?.host,
    port: config.bitcoin?.port,
  });

  let lastBlock: number = 0;

  while (true) {
    try {
      const currentBlock = await client.getBlockCount();
      if (currentBlock > lastBlock) {
        console.log('New block:', currentBlock);
        play.play(mp3File);
        lastBlock = currentBlock;
      }
    } catch (error) {
      console.error(error.message);
    }

    sleep(1000);
  }
}

main();
