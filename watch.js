#!/usr/bin/env node
// fichier : watch-run.mjs

import { spawn } from 'node:child_process';
import { watch } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

const [, , entry] = process.argv;
if (!entry) {
    console.error('Usage : node watch-run.mjs <fichier.js>');
    process.exit(1);
}

let child;

/**
 * Lance le processus enfant.
 */
function start() {
    child = spawn(process.execPath, [resolve(entry)], { stdio: 'inherit' });
    child.on('exit', (code, signal) => {
        if (signal || code > 0) process.exitCode = code ?? 1;
    });
}

const RESTART_DELAY = 100;
let pending = false;

async function scheduleRestart() {
    if (pending) return;
    pending = true;
    await delay(RESTART_DELAY);
    pending = false;

    if (child) {
        child.kill(); // SIGTERM
        await new Promise(r => child.once('close', r));
    }
    start();
}

async function main() {
    start();

    const ac = new AbortController();
    const watcher = watch(process.cwd(), {
        recursive: true,
        signal: ac.signal,
    });

    try {
        for await (const { filename } of watcher) {
            if (
                filename &&
                extname(filename) === '.js' &&
                !filename.includes('node_modules')
            ) {
                await scheduleRestart();
            }
        }
    } catch (err) {
        if (err.name !== 'AbortError') throw err;
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
