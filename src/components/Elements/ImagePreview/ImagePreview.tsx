import React, { memo } from "react";
import { icons } from "../../../utils/icons";

interface ImagePreviewProps {
  src: string;
  alt?: string;
  className?: string;
  defaultClassName?: string;
}

const ImagePreview = memo(
  ({ src, alt, className, defaultClassName }: ImagePreviewProps) => {
    return src ? (
      <img src={src} alt={alt} className={className} draggable="false" />
    ) : (
      <img
        src={icons.PhotoIcon}
        alt="Default"
        className={defaultClassName}
        draggable="false"
      />
    );
  }
);

export default ImagePreview;
