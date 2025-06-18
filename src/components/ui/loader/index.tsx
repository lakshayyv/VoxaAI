import { HashLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="relative z-10">
        <HashLoader color="#e34400" size={40} />
      </div>
    </div>
  );
}
