import { promises as fs } from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import { promisify } from 'util';

import { Suite } from './interfaces';

export const handleQuit = (stop: () => void) => {
    // Handle unexpected exits
    process.on('exit', stop);
    // Catches ctrl+c event
    process.on('SIGINT', stop);
    // Catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', stop);
    process.on('SIGUSR2', stop);
    // Catches uncaught exceptions
    process.on('uncaughtException', stop);
};

export const stopIntervals = (interval: NodeJS.Timeout, timeout: NodeJS.Timeout): void => {
    clearInterval(interval);
    clearTimeout(timeout);
};

export const getSuites = (GLOB: string): Suite[] => {
    console.log(`Finding files in ${path.join(process.cwd(), GLOB)}`);

    return promisify((glob as any).glob)(GLOB)
        .then((files: string[]) => {
            console.log(`Got test files:\n${JSON.stringify(files)}`);

            return files;
        })
        .then((files: string[]) => files.map(test => fs.readFile(test, 'utf8')))
        .then((promises: Promise<string>[]) => Promise.all(promises))
        .then((contents: string[]) => contents.map(content => JSON.parse(content)));
};
