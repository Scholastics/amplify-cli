import crypto from 'crypto';
import { AWS_REGIONS_TO_RUN_TESTS } from './cci-utils';

/**
 * This script prints region assignment for an e2e test job.
 * The algorithm takes input via environment variable - TEST_SUITE
 * and computes deterministic but random region assignment.
 * In order to reshuffle regions 'salt' constant below should be modified.
 *
 * If region is already assigned, i.e. CLI_REGION environment variable is set this script is pass-through.
 */

const toNumber = (buf: Buffer) => {
  return buf.readUInt16BE(0) * 0xffffffff + buf.readUInt32BE(2);
};

// Algorithm from https://github.com/watson/hash-index/blob/fd5d0606926a821166e428b6e266f03b4dc5d817/index.js#L19
const computeHashIndex = (input: string, max: number) => {
  return toNumber(crypto.createHash('sha1').update(input).digest()) % max;
};

// if region is specified by job honor it.
let selectedRegion = process.env.CLI_REGION;
if (!selectedRegion) {
  const testSuite = process.env.TEST_SUITE;
  if (!testSuite) {
    throw Error('TEST_SUITE environment variable must be set');
  }
  // See https://en.wikipedia.org/wiki/Salt_(cryptography).
  // Salt should be changed if we want re-shuffle regions but keep generation deterministic.
  const salt = 'foo';
  const regionIndex = computeHashIndex(`${testSuite}${salt}`, AWS_REGIONS_TO_RUN_TESTS.length);

  selectedRegion = AWS_REGIONS_TO_RUN_TESTS[regionIndex];
}

console.log(selectedRegion);
