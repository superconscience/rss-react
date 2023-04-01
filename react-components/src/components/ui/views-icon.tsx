import { FC } from 'react';

export type ViewsIconProps = { width: number; height: number; fill: string };

export const ViewsIcon: FC<ViewsIconProps> = ({ width, height, fill }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16">
      <path
        fill={fill}
        d="M8.5 3.5c-5 0-8 5-8 5s3 5 8 5 8-5 8-5-3-5-8-5zm0 7c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .894 2 2 0 1.104-.896 2-2 2z"
      ></path>
    </svg>
  );
};

ViewsIcon.defaultProps = {
  width: 16,
  height: 16,
  fill: 'none',
};
