import { env } from 'node:process';

export default () => {
  const keys = Object.keys(env).filter((x) =>
    x.includes('CORS_ALLOWED_ORIGINS__'),
  );

  return { CORS: keys.map((k) => env[k]) };
};