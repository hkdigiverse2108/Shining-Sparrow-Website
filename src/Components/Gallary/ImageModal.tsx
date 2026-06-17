import { useAppDispatch, useAppSelector } from "../../Store/Hook";
import { setModalPhotoLink } from "../../Store/Slices/VideoModalSlice";

const ImageModal = () => {
  const dispatch = useAppDispatch();
  const { photoLink } = useAppSelector((state) => state.videoModal);

  const handleCloseBtn = () => {
    dispatch(setModalPhotoLink(""));
  };

  if (!photoLink) return;

  return (
    <div className="fixed inset-0 z-50! flex items-center justify-center bg-black/70 ">
      <button
        onClick={handleCloseBtn}
        // onClick={() => dispatch(setModalVideoLink(""))}
        className="absolute top-0 right-0 border! border-black/40! text-white! bg-black/20! hover:bg-black/40! py-3! "
      >
        ✕
      </button>

      <div className=" w-[80%] h-[70%]  aspect-video  flex items-center justify-center overflow-hidden shadow-xl">
        <figure className="w-300 h-full">
          <img src={photoLink} alt="not Found" className="w-full h-full " />
        </figure>
      </div>
    </div>
  );
};

export default ImageModal;
