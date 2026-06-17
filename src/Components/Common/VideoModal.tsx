import { useAppDispatch, useAppSelector } from "../../Store/Hook";
import { setModalVideoLink } from "../../Store/Slices/VideoModalSlice";

const VideoModal = () => {
  const dispatch = useAppDispatch();
  const { videoLink } = useAppSelector((state) => state.videoModal);

  const handleCloseBtn = () => {
    dispatch(setModalVideoLink(""));
  };

  const getEmbedLink = (url: string): string => {
    if (!url) return "";

    let videoId = "";

    try {
      if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1]?.split("&")[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
      } else if (url.includes("youtube.com/embed/")) {
        return url;
      }

      if (url.includes("drive.google.com")) {
        if (url.includes("/file/d/")) {
          videoId = url.split("/file/d/")[1]?.split("/")[0];
        } else if (url.includes("id=")) {
          videoId = url.split("id=")[1]?.split("&")[0];
        }

        return videoId ? `https://drive.google.com/file/d/${videoId}/preview` : url;
      }

      return url;
    } catch (err) {
      console.error("Invalid video URL:", err);
      return url;
    }
  };
  const embedUrl = getEmbedLink(videoLink);

  if (!videoLink) return;

  return (
    <div className="fixed inset-0 z-99! flex items-center justify-center bg-black/70 ">
      {/* <button onClick={handleCloseBtn} className="absolute top-0 right-0 border! border-black/40! text-white! bg-black/20! hover:bg-black/40! py-3! ">
        ✕
      </button> */}

      <div onContextMenu={(e) => e.preventDefault()} className=" w-full h-full relative  aspect-video  overflow-hidden shadow-xl">
        <div className="video-container">
          <div onClick={handleCloseBtn} className="overlay-top" title="Sharing disabled">
            <button className="absolute top-0 right-0 border! border-black/40! text-white! bg-black/20! hover:bg-black/40! py-3! ">✕</button>
          </div>
          <div className="overlay-bottom-right" title="Watch on YouTube disabled"></div>
          <div id="player"></div>
        </div>
        <iframe width="100%" height="100%" src={embedUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay;  " referrerPolicy="strict-origin-when-cross-origin" allowFullScreen={false}></iframe>
        <div
          onContextMenu={(e) => e.preventDefault()}
          className="absolute inset-0 z-10 bottom-20 top-25 "
        />
      </div>
    </div>
  );
};

export default VideoModal;
