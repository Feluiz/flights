import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Input from "./Input";
import "./App.css";
import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  

  const searchAirport = async (query) => {
    try {
      const response = await axios.get(
        "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport",
        {
          params: { query, locale: "en-US" },
          headers: {
            "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
            "X-RapidAPI-Key": apiKey,
          },
        }
      );

      console.log("Airport Results:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching airports:", error);
      return null;
    }
  };

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
            width: { lg: "76%", md: "70%", sm: "93%", xs: "10%" },
          }}
          onClick={() => searchAirport("new")}
        >
          {" "}
          Search Flights
        </Button>
      </div>
    </div>
  );
}

export default App;
