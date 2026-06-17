// import { useEffect, useState } from "react";

// const StickyBar = (scroll: number): boolean => {
//   const [fix, setFix] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setFix(window.scrollY > (scroll || 300));
//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [scroll]);

//   return fix;
// };

// export default StickyBar;

import { useEffect, useState } from "react";

const StickyBar = (scroll: number = 300): boolean => {
  const [fix, setFix] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setFix(window.scrollY > scroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]); // ✅ ONLY scroll

  return fix;
};

export default StickyBar;
