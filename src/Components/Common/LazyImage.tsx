import { useState, useRef } from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
}

const LOGO_SRC = "/assets/images/logo/Logo.webp";

const LazyImage = ({
  src,
  alt,
  className = "",
  style,
  wrapperClassName = "",
  wrapperStyle,
  ...rest
}: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <div
      className={`lazy-img-wrapper ${wrapperClassName}`}
      style={wrapperStyle}
    >
      {/* Logo placeholder — visible while image is loading */}
      {!loaded && !error && (
        <div className="lazy-img-placeholder" aria-hidden="true">
          <img
            src={LOGO_SRC}
            alt="Loading..."
            className="lazy-img-logo-placeholder"
          />
        </div>
      )}

      {/* Actual image — fades in once loaded */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`lazy-img-actual ${loaded ? "lazy-img-loaded" : "lazy-img-loading"} ${className}`}
        style={style}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => { setLoaded(true); setError(true); }}
        {...rest}
      />
    </div>
  );
};

export default LazyImage;
