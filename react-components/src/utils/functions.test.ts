import { describe, it } from 'vitest';
import { capitalize, formatPrice, getRandomId, humanizeNumber } from './functions';

describe('Utils Functions', () => {
  describe('humanizeNumber', () => {
    it('must return a string', () => {
      expect(typeof humanizeNumber(1)).toEqual('string');
    });
    it('must convert number to a humanized value', () => {
      expect(humanizeNumber(1)).toEqual('1');
      expect(humanizeNumber(1000)).toEqual('1.0k');
      expect(humanizeNumber(1000000)).toEqual('1.0M');

      expect(humanizeNumber(99)).toEqual('99');
      expect(humanizeNumber(999)).toEqual('999');
      expect(humanizeNumber(9999)).toEqual('10.0k');
      expect(humanizeNumber(99999)).toEqual('100k');
    });
  });

  describe('capitalize', () => {
    it('must return a correct result', () => {
      expect(capitalize('test')).toEqual('Test');
    });
  });

  describe('formatPrice', () => {
    it('must return a correct result', () => {
      expect(formatPrice(20)).toEqual('€20.00');
      expect(formatPrice(20.05)).toEqual('€20.05');
      expect(formatPrice(20.005)).toEqual('€20.00');
      expect(formatPrice(20.999)).toEqual('€21.00');
    });
  });

  describe('getRandomId', () => {
    it('must return a string', () => {
      expect(typeof getRandomId()).toEqual('string');
    });
  });
});
