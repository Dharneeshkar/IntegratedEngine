import React, {useState} from "react";
import axios from "axios";
function App() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
function getBackend() {
    axios.get("http://localhost:3001/callPinata",  { crossdomain: true }).then(response => {
      console.log(JSON.stringify(response));
    });
  }
return (
    <div>
      <button onClick={getBackend}>
        Generate Images
      </button>
      <h1>{text}</h1>
      <h3>{"-" + author}</h3>
    </div>
  )
}
export default App;