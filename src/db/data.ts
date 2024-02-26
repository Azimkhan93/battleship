import crypto from 'crypto';
import { DB } from './types';
let index = 0;

export const randomID: string = crypto.randomUUID();

export function getRandomNumber(): number {
    return Math.floor(Math.random() * 999) + 1;
}

export const randomNum: number = getRandomNumber();

export const indexGenerator = () => index++;

export const db: DB = {
    users: [],
    rooms: []
};
