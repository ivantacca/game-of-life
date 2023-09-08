import { FiPlay, FiPause, FiArrowRight, FiRefreshCw } from "react-icons/fi";
import { useContext } from "react"
import Context from "context";

type controllerProps = {
  onResetClick: any;
  onStartClick: any;
  onStopClick: any;
  onNextClick: any;
};

export default function Controller({
  onResetClick,
  onStartClick,
  onStopClick,
  onNextClick,
}: controllerProps) {
  const { state } = useContext<any>(Context);

  return (
    <div className="flex gap-2 absolute bottom-10">
      <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-100 mt-10 disabled:opacity-40">{state.cells.generation}</div>
      <button
        onClick={onResetClick}
        className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-100 mt-10 disabled:opacity-40 hover:bg-black duration-200 [&>*]:hover:stroke-white"
      >
        <FiRefreshCw />
      </button>

      <button
        disabled={!state.started}
        onClick={onStopClick}
        className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-100 mt-10 disabled:opacity-40 hover:bg-black duration-200 [&>*]:hover:stroke-white"
      >
        <FiPause />
      </button>

      <button
        disabled={state.started}
        onClick={onStartClick}
        className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-100 mt-10 disabled:opacity-40 hover:bg-black duration-200 [&>*]:hover:stroke-white"
      >
        <FiPlay />
      </button>

      <button
        onClick={onNextClick}
        className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-100 mt-10 disabled:opacity-40 hover:bg-black duration-200 [&>*]:hover:stroke-white"
      >
        <FiArrowRight />
      </button>
    </div>
  );
}
