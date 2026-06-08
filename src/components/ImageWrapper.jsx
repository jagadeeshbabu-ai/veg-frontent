import React from 'react';

const ImageWrapper = ({
  src,
  alt,
  wrapperClassName = '',
  imageClassName = '',
  aspectRatio = '1 / 1',
  objectFit = 'contain',
  ...props
}) => {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center ${wrapperClassName}`}
      style={{ aspectRatio }}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full ${imageClassName}`}
        style={{ objectFit }}
        {...props}
      />
    </div>
  );
};

export default ImageWrapper;
