import { FC } from 'react';
import { useImage } from '../../../hooks/use-image';
import { PropsWithClassName } from '../../../types/types';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import imageNotAvailable from '/image-not-available.jpg';

export type ImageProps = PropsWithClassName & {
  src: string;
  alt: string;
};

export const Image: FC<ImageProps> = ({ src, alt, className }) => {
  const loadedSrc = useImage(src, imageNotAvailable);
  return (
    <>
      {loadedSrc && <img className={className} alt={alt} src={loadedSrc} />}
      {!loadedSrc && <LoadingSpinner />}
    </>
  );
};
