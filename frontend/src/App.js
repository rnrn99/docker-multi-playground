import { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/api/value", { value }).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setLists([...lists, res.data]);
        setValue("");
      } else {
        alert("Failed to post value");
      }
    });
  };

  useEffect(() => {
    axios.get("/api/values").then((res) => {
      console.log(res.data);
      setLists(res.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          <ul>
            {lists &&
              lists.map(({ value }, index) => <li key={index}>{value}</li>)}
          </ul>
          <form className="example" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="입력해 주세요"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
