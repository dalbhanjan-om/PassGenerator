import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";
import pwdbg from "./assets/pwdbg.jpg"; // Adjust the path to your image

function App() {
  const [copy, setCopy] = useState(false);
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const pwdref = useRef(null);

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) {
      str = str + "1234567890";
    }
    if (charAllowed) {
      str = str + "!@#$%^&*()_+";
    }
    for (let i = 0; i < length; i++) {
      let position = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(position);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  const CopyPasswordToClipboard = useCallback(() => {
    pwdref.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopy((prev) => !prev);
  }, [password]);

  useEffect(() => {
    passGenerator();
  }, [length, numAllowed, charAllowed, passGenerator]);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${pwdbg})`,
      }}
    >
      <div className="w-full max-w-md bg-gray-700 bg-opacity-80 shadow-md rounded-lg px-8 py-8 text-white">
        <h1 className="text-xl font-bold text-center mb-4">Password Generator</h1>
        <div className="flex items-center shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 text-blue-700"
            placeholder="Generated password"
            readOnly
            ref={pwdref}
          />
          <button
            onClick={CopyPasswordToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-medium"
          >
            {copy ? "COPIED" : "COPY"}
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer w-full"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="text-sm font-medium">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="NumInput"
              checked={numAllowed}
              onChange={() => setNumAllowed((prev) => !prev)}
            />
            <label htmlFor="NumInput" className="text-sm font-medium">
              Include Numbers
            </label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="CharInput"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="CharInput" className="text-sm font-medium">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
      <footer className="absolute bottom-2 right-4 text-sm font-medium text-white">
        By Om Dalbhanjan
      </footer>
    </div>
  );
}

export default App;
