import React from "react";

interface ShareButtonsProps {
  url?: string;
  title?: string;
  platforms?: ("facebook" | "twitter" | "linkedin")[];
  className?: string;
  variant?: "normal" | "circle";
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  url = window.location.href,
  title = "",
  platforms = ["facebook", "twitter", "linkedin"],
  className = "",
  variant = "normal",
}) => {
  const handleShare = (platform: string) => {
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

  const getIconClass = (platform: string) => {
    switch (platform) {
      case "facebook":
        return "icon-facebook";
      case "twitter":
        return "icon-twitter";
      case "linkedin":
        return "icon-linkedin2";
      default:
        return "";
    }
  };

  return (
    <div
      className={
        variant === "circle"
          ? `edublink-single-event-social-share ${className}`
          : `edublink-single-post-social-share w-fit! ${className}`
      }
    >
      {variant === "circle" ? (
        <h4 className="share-title">Share On:</h4>
      ) : (
        <span className="post-share-text">Share on: </span>
      )}

      <ul className="edublink-social-share-icons-wrapper">
        {platforms.map((platform) => (
          <li
            key={platform}
            className={`edublink-social-share-each-icon ${platform}`}
          >
            <a
              className="edublink-social-share-link"
              href="#"
              title={
                variant === "circle"
                  ? `Share on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`
                  : undefined
              }
              onClick={(e) => {
                e.preventDefault();
                handleShare(platform);
              }}
            >
              <i className={getIconClass(platform)}></i>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShareButtons;
