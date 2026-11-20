import dotenv from 'dotenv';

dotenv.config();

export type Environment = 'QA' | 'CERT';

const selectedEnvironment = process.env.TEST_ENV ?? 'QA';

if (!['QA', 'CERT'].includes(selectedEnvironment)) {
  throw new Error('Ambiente inválido. Utiliza QA o CERT.');
}

export const environment: Environment = selectedEnvironment as Environment;

const secrets: Record<Environment, string | undefined> = {
  QA: process.env.SECRET_QA,
  CERT: process.env.SECRET_CERT,
};

const configuredSecret = secrets[environment];

if (!configuredSecret) {
  throw new Error(`No se encontró la clave secreta para ${environment}`);
}

export const secretKey: string = configuredSecret;