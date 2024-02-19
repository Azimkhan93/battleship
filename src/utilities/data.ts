import crypto from 'crypto';

export const randomID: string = crypto.randomUUID();

function getRandomNumber(): number {
  return Math.floor(Math.random() * 999) + 1;
}

export const randomNum: number = getRandomNumber()