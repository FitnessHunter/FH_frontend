import React, { useEffect, useState } from "react";
import { icons } from "../../../utils/icons";

interface Props {
  image: File | null;
  alt?: string;
  className?: string;
  defaultClassName?: string;
  onLoaded?: () => void;
}

const ImagePreview = ({
  image,
  alt,
  className,
  defaultClassName,
  onLoaded,
}: Props) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onloadend = (e) => {
        const result = e.target?.result;

        if (result instanceof ArrayBuffer) {
          setImagePreview(new TextDecoder().decode(result));
        } else {
          setImagePreview(result ?? null);
        }

        if (onLoaded) onLoaded();
      };
    } else {
      setImagePreview(null);
    }
  }, [image]);

  return imagePreview ? (
    <img src={imagePreview} alt={alt} className={className} draggable="false" />
  ) : (
    <img
      src={icons.PhotoIcon}
      alt="Default"
      className={defaultClassName}
      draggable="false"
    />
  );
};

export default ImagePreview;
