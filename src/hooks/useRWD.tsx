import { useState, useEffect } from "react";
export const DEVICES = {
  PC: "PC",
  TABLET: "tablet",
  MOBILE: "mobile",
};

const MAX_TABLET_WIDTH = 768;
const MAX_MOBILE_WIDTH = 576;

const useRWD = () => {
  const [device, setDevice] = useState(DEVICES.MOBILE);

  const handleRWD = () => {
    if (window.innerWidth > MAX_TABLET_WIDTH) setDevice(DEVICES.PC);
    else if (window.innerWidth > MAX_MOBILE_WIDTH) setDevice(DEVICES.TABLET);
    else setDevice(DEVICES.MOBILE);
  };

  useEffect(() => {
    window.addEventListener("resize", handleRWD);
    handleRWD();
    return () => {
      window.removeEventListener("resize", handleRWD);
    };
  }, []);

  return device;
};

export default useRWD;
