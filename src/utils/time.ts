export const getRandomWaitBetween = (min: number, max: number): number => (
  Math.floor(Math.random() * (max - min) + min)
);

// eslint-disable-next-line no-promise-executor-return
export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  getRandomWaitBetween,
  wait,
};
