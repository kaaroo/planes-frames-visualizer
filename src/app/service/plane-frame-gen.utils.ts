import { ALPHABET_CHARS, ALPHABET_LENGTH, ICAO_length } from '../../config';

export const genRandomNumber = (min: number, max: number) => {
  if (min > max) {
    throw new Error(
      `Cannot generate random number for given max (${max}) and min (${min})`
    );
  }

  return Math.random() * (max - min) + min;
};

export const genRandomInt = (min: number, max: number) =>
  Math.floor(genRandomNumber(min, max));

export const getRandomChar = (): string =>
  ALPHABET_CHARS[genRandomInt(0, ALPHABET_LENGTH)];

export const genPlaneIcao = (): string =>
  [...Array(ICAO_length).keys()].reduce((acc, _) => {
    acc += getRandomChar();
    return acc;
  }, '');

export const genPlaneIcaos = (icaos_number: number = 5): string[] => {
  const icaos_number_int = Math.floor(icaos_number);

  const plane_icaos = new Set<string>();

  while (plane_icaos.size < icaos_number_int) {
    const icao = genPlaneIcao();
    plane_icaos.add(icao);
  }

  return [...plane_icaos];
};
