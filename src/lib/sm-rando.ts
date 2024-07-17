import DotNetRandom from "./dotnet-random";

export const getSeedNumber = (seedNumber?: number) => {
  const MAX_SEED = 1000000
  if (seedNumber != undefined && seedNumber != 0) {
    if (seedNumber > 0 && seedNumber <= MAX_SEED) {
      return seedNumber;
    }
    throw new Error("Invalid seed number: " + seedNumber);
  }
  const timestamp = Math.floor(Date.now() % MAX_SEED);
  return new DotNetRandom(timestamp).NextInRange(1, MAX_SEED);
}
