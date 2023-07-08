import { useLayoutEffect, useState } from "react";

export const SIZES = { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 };

const useResponsive = () => {
  const [screenSize, setScreenSize] = useState<number | null>(null);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      const { innerWidth } = window;
      let size: number;

      if (innerWidth <= SIZES.sm) {
        size = SIZES.sm;
      } else if (innerWidth <= SIZES.md) {
        size = SIZES.md;
      } else if (innerWidth <= SIZES.lg) {
        size = SIZES.lg;
      } else if (innerWidth <= SIZES.xl) {
        size = SIZES.xl;
      } else {
        size = SIZES["2xl"];
      }

      setScreenSize(size);
    };
    window.addEventListener("resize", updateSize);
    // updateSize();
    return (): void => window.removeEventListener("resize", updateSize);
  }, []);

  return {
    screenSize,
    isMobile: screenSize === SIZES.sm || screenSize === SIZES.md,
  };
};

export default useResponsive;
