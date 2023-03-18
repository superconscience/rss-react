import { describe, it } from 'vitest';
import { humanizeNumber } from './functions';

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
});
