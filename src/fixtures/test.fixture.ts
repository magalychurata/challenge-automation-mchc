import 'dotenv/config';
import { test as base, expect } from '@playwright/test';
import { secretKey, environment } from '../config/environment.config';
import { encryptSHA256 } from '../utils/crypto.util';

type CustomFixtures = {
  executionLogger: void;
};

export const test = base.extend<CustomFixtures>({
  executionLogger: [
    async ({}, use, testInfo) => {

      // Calcular el hash de la clave secreta
      const secretHash = encryptSHA256(secretKey);

      // Log antes de ejecutar el test
      console.log('================================');
      console.log(`ENVIRONMENT: ${environment}`);
      console.log(`TEST: ${testInfo.title}`);
      console.log(`SECRET SHA256: ${secretHash}`);
      console.log('================================');

      try {
        await use();
      } finally {
        // Fecha y hora de finalización
        const endTime = new Date().toISOString();

        console.log('================================');
        console.log(`TEST FINISHED: ${testInfo.title}`);
        console.log(`END DATE: ${endTime}`);
        console.log(`STATUS: ${testInfo.status}`);
        console.log('================================');
      }
    },
    { auto: true },
  ],
});

export { expect };