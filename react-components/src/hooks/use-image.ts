import { useEffect, useState } from 'react';

export const useImage = (src: string, fallbackSrc: string) => {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  useEffect(() => {
    const imageElement = document.createElement('img');
    imageElement.src = src;
    imageElement.onload = () => {
      setLoadedSrc(src);
    };
    imageElement.onerror = () => {
      setLoadedSrc(fallbackSrc);
    };
  }, [src, fallbackSrc]);

  return loadedSrc;
};
