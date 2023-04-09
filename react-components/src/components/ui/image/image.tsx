import { FC, ReactEventHandler, useEffect, useState } from 'react';
import { PropsWithClassName } from '../../../types/types';
import imageNotAvailable from '/image-not-available.jpg';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';

export type ImageProps = PropsWithClassName & {
  src: string;
  alt: string;
};

export const Image: FC<ImageProps> = ({ src, alt, className }) => {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const onError: ReactEventHandler<HTMLImageElement> = () => {
    setLoadedSrc(imageNotAvailable);
  };
  useEffect(() => {
    const imageElement = document.createElement('img');
    imageElement.src = src;
    imageElement.onload = () => {
      setLoadedSrc(src);
    };
    imageElement.onerror = () => {
      setLoadedSrc(imageNotAvailable);
    };
  }, [src]);
  return (
    <>
      {loadedSrc && <img className={className} alt={alt} src={loadedSrc} onError={onError} />}
      {!loadedSrc && <LoadingSpinner />}
    </>
  );
};
