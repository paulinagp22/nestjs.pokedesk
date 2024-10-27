export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodb: process.env.MONGODB || '',
  defaultLimit: parseInt(process.env.DEFAULT_LIMIT, 10) || 10,
});
