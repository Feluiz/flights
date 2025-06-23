import { useState } from "react";
import { Button } from "@mui/material";
import Input from "./Input";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-wrap justify-center">
      <h1 className="text-6xl my-15">Flight Search</h1>
      <div className="flex justify-center max-auto flex-wrap">
        <Input />
        <Button
          sx={{
            minWidth: "56.5%",
            background: "#1e6bf2",
            color: "white",
            height: "3.5em",
            fontSize: "larger",
            width:{lg:"76%", md:"74%", sm:"84%", xs:"10%"}
          }}
        >
          {" "}
          Search Flights
        </Button>
      </div>
    </div>
  );
}

export default App;
