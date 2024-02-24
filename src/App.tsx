import useRWD, { DEVICES } from "./hooks/useRWD";
import WebUsers from "./components/WebUsers"; // web version
import MobileUsers from "./components/MobileUsers"; // table and mobile version

const App = () => {
  const device = useRWD();
  return (
    <div className='w-screen h-screen bg-gray-600'>
      {device === DEVICES.PC ? <WebUsers /> : <MobileUsers />}
    </div>
  );
};
export default App;
