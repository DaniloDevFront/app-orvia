import "dotenv/config";

export default ({ config }) => {
  return {
    ...config,
    extra: {
      apiUrl: "http://localhost:3032",
      environment: process.env.ENVIRONMENT,
    },
  };
};
