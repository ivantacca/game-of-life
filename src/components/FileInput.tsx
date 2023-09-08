import { useState, useContext } from "react";
import { setInput } from "context/actions";
import Context from "context";

export default function FileInput() {
  const [validFile, setValidFile] = useState(true);
  const { state, dispatch } = useContext<any>(Context);

  // Handle txt upload
  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const parsedData = JSON.parse(e.target.result);
          const isValid = setInput(dispatch, parsedData);
          setValidFile(isValid);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          setValidFile(false);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="text flex flex-col mb-10">
        <h1 className="text-xl font-bold text-center">Conway's Game of Life</h1>
        <p className="text-center mb-5">Upload a file to start</p>
        <a target="_blank" href="/game-of-life-input-example.txt" className="rounded-full self-center font-bold px-7 bg-gray-200 py-3.5">
          See input example file
        </a>
      </div>
      <input
        accept=".txt"
        onChange={handleFileUpload}
        type="file"
        className="text-center appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      ></input>
      {!validFile && (
        <span className="text-red-700 text-center mt-2.5">Invalid File</span>
      )}
    </div>
  );
}
