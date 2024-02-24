import useRWD from "./hooks/useRWD";
import WebUsers from "./components/WebUsers"; // web version
import MobileUsers from "./components/MobileUsers"; // table and mobile version
import { DEVICES } from "./constants";

const App = () => {
  const device = useRWD();

  const renderUsers = () => {
    if (device === DEVICES.PC) {
      return <WebUsers />;
    } else if (device === DEVICES.TABLET || device === DEVICES.MOBILE) {
      return <MobileUsers />;
    }
  };

  return <div className='w-screen h-screen bg-gray-600'>{renderUsers()}</div>;
};
export default App;
