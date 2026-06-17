import { useEffect, useState } from "react";

type LoaderProps = {
  loading: boolean;
  delay?: number;
};

const Loader = ({ loading = true, delay = 200 }: LoaderProps) => {
 
  const [shouldRender, setShouldRender] = useState<boolean>(loading);
  
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [loading, delay]);
 
  if (!shouldRender && !loading) return null;
  
  return (
    <div
      className={`fixed left-0 top-0 z-999999 flex h-screen w-screen items-center justify-center bg-white/90 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${loading ? "opacity-100" : "opacity-0"}`}
    >
      {/* <div className="flex justify-center items-center  ">
        <div className="container">
          <div className="ball">
            <div className="inner">
              <div className="line"></div>
              <div className="line line--two"></div>
              <div className="oval"></div>
              <div className="oval oval--two"></div>
            </div>
          </div>
          <div className="shadow"></div>
        </div>
      </div> */}
      <svg
        className="pl"
        width="128px"
        height="128px"
        viewBox="0 0 128 128"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="pl__ring2"
          cx="64"
          cy="64"
          r="52.5"
          fill="none"
          stroke="#1ab69d"
          strokeWidth="12"
          transform="rotate(-90,64,64)"
          strokeLinecap="round"
          strokeDasharray="329.9 329.9"
          strokeDashoffset="-329.3"
        ></circle>

        <circle
          className="pl__ring4"
          cx="64"
          cy="64"
          r="37.5"
          fill="none"
          stroke="#1ab69d"
          strokeWidth="9"
          transform="rotate(-90,64,64)"
          strokeLinecap="round"
          strokeDasharray="254.5 254.5"
          strokeDashoffset="-254"
        ></circle>

        <circle
          className="pl__ring6"
          cx="64"
          cy="64"
          r="22.5"
          fill="none"
          stroke="#1ab69d"
          strokeWidth="9"
          transform="rotate(-90,64,64)"
          strokeLinecap="round"
          strokeDasharray="204.2 204.2"
          strokeDashoffset="-203.9"
        ></circle>
      </svg>
    </div>
  );
};

export default Loader;
