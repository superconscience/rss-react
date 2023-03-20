export function humanizeNumber(num: number) {
  const exp10 = Math.floor(Math.log10(num));
  return exp10 < 3
    ? String(num)
    : String((num / Math.pow(10, 3 * Math.floor(exp10 / 3))).toFixed(exp10 % 3 ? 0 : 1)) +
        Array(Math.floor(exp10 / 3))
          .fill('k')
          .join('')
          .replace('kk', 'M')
          .replace('Mk', 'B');
}
