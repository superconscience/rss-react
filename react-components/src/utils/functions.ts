import { v4 } from 'uuid';

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

export const readImage = (file: File, callback: (src: string) => void) => {
  const reader = new FileReader();

  reader.onload = function (e) {
    if (e.target) {
      callback(e.target.result as string);
    }
  };

  reader.readAsDataURL(file);
};

export const capitalize = (value: string) => value.slice(0, 1).toUpperCase() + value.slice(1);

export const getRandomId = (): string => {
  return v4();
};

export function debounce<Params extends unknown[]>(
  func: (...args: Params) => unknown,
  timeout: number
): (...args: Params) => void {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
