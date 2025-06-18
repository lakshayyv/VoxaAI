import { ScaleLoader } from "react-spinners";

export default function ButtonLoader() {
  return (
    <div className="flex items-center justify-center">
      <ScaleLoader color="white" width={2} height={16} />
    </div>
  );
}
