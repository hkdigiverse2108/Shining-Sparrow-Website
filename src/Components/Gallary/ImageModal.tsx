import { useAppDispatch, useAppSelector } from "../../Store/Hook";
import { setModalPhotoLink } from "../../Store/Slices/VideoModalSlice";
import { getImageUrl } from "../../Constants";


const ImageModal = () => {
  const dispatch = useAppDispatch();
  const { photoLink } = useAppSelector((state) => state.videoModal);

  const handleCloseBtn = () => {
    dispatch(setModalPhotoLink(""));
  };

  if (!photoLink) return;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4">
      <button
        onClick={handleCloseBtn}
        className="absolute top-4! right-4! md:top-8! md:right-8! text-white! bg-black/50! hover:bg-black/80! rounded-full! w-12! h-12! flex! items-center! justify-center! z-[10000]! text-xl! cursor-pointer! border-2! border-white/50! transition-all!"
      >
        ✕
      </button>

      <div className="relative w-full h-full flex items-center justify-center">
        <img 
          src={getImageUrl(photoLink)} 
          alt="Gallery View" 
          className="max-w-full max-h-full object-contain shadow-2xl"
          style={{ width: "auto", height: "auto", maxHeight: "90vh", maxWidth: "95vw" }}
        />
      </div>
    </div>
  );
};

export default ImageModal;
