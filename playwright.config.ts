import {defineConfig} from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    timeout: 30000,
    retries: 0,
    reporter: [
        ['list'], 
        ['html', 
            {outputFolder: 'playwright-report', 
                open: 'never'
            }]
        ],
    use: {
        baseURL: 'https://pokeapi.co/api/v2',
        trace: 'retain-on-failure',
        screenshot: 'off',
        video: 'off',
    },
    outputDir: 'test-results/',
});
