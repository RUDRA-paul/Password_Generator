import { useCallback, useEffect, useRef } from "react";
import { useState } from "react"

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef('null');

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += '0123456789'
    }
    if (charAllowed) {
      str += '!@#$%^&*-_=[]{}~`'
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => { passwordGenerator() }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPasswordToClip = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-white text-center bg-gray-700">
        <h1 className="my-2">Password Generator</h1>
        <div className="flex rounded-lg overflow-hidden mb-4 p-2">
          <input type="text" value={password} ref={passwordRef} className="outline-none rounded-l-lg w-full py-1 px-3 text-orange-700" placeholder="password" readOnly></input>
          <button className="outline-none bg-blue-700 text-white px-3 py-1 shrink-0 rounded-r-lg hover:bg-blue-500" onClick={copyPasswordToClip}>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-cneter gap-x-1">
            <input type="range" min={6} max={100} value={length} className="cursor-pointer"
              onChange={(e) => { setLength(e.target.value) }}
            ></input>
            <label> Length : {length}</label>
          </div>
          <div className="flex items-cneter gap-x-1">
            <input type="checkbox" defaultChecked={numberAllowed} id="numberInput"
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-cneter gap-x-1">
            <input type="checkbox" defaultChecked={charAllowed} id="charInput"
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Charactors</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
