import { v4 as uuidv4 } from 'uuid';
import { ID } from './types';

export function generateID(): ID {
  return uuidv4();
}

export function debounce (fn, delayInMs = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(
        () => { // @ts-ignore
        fn.apply(this, args);
      },
      delayInMs
    );
  };
}