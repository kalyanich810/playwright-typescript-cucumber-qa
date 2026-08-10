import fs from 'fs';
import path from 'path';

export function loadEnvironment() {
    const envPath = path.resolve('config/env.test');

    const envFile = fs.readFileSync(envPath, 'utf-8');

    const env: Record<string, string> = {};

    envFile.split('\n').forEach(line => {
        const trimmedLine = line.trim();

        if (!trimmedLine || trimmedLine.startsWith('#')) {
            return;
        }

        const [key, ...valueParts] = trimmedLine.split('=');

        env[key.trim()] = valueParts.join('=').trim();
    });

    return env;
}