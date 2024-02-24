import { useState, useEffect } from "react";
import { DEVICES } from "../constants";

const MAX_TABLET_WIDTH = 768;
const MAX_MOBILE_WIDTH = 576;

const useRWD = () => {
  const [device, setDevice] = useState("");

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
