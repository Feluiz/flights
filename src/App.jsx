import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Input from "./Input";
import "./App.css";
import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [originAirport, setOriginAirport] = useState(null);
  const [passengerCount, setPassengerCount] = useState(1);
  const [destinationAirport, setDestinationAirport] = useState(null);
  const [departureDate, setDepartureDate] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleSearch = async () => {
    if (!originAirport?.skyId) {
      alert("Please select an origin airport");
      return;
    }

    setLoading(true);
    const apiKey = import.meta.env.VITE_API_KEY;
    const params = {
      originSkyId: originAirport.skyId,
      destinationSkyId: destinationAirport?.skyId || undefined,
      departureDate: departureDate || undefined,
      adults: passengerCount,
      // Optional params (uncomment and adjust as needed)
      // stops: 'direct,1stop',
      // cabinClass: 'economy',
      // sort: 'cheapest',
      // market: 'US', // Fetch from /get-config
      // locale: 'en-US', // Fetch from /get-config
      // currency: 'USD', // Fetch from /get-config
      // carriersIds: '-32672,-31435', // Example
    };

    try {
      let response = await axios.get(
        "https://fly-scraper.p.rapidapi.com/flights/search-one-way",
        {
          params,
          headers: {
            "x-rapidapi-host": "fly-scraper.p.rapidapi.com",
            "X-RapidAPI-Key": apiKey,
          },
        }
      );

      while (response.data?.context?.status === "incomplete") {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        response = await axios.get(
          "https://api.example.com/flight/search-incomplete",
          {
            params: { ...params, sessionId: response.data.context.sessionId },
            headers: { Authorization: `Bearer ${apiKey}` },
          }
        );
      }

      console.log("Flight search results:", response.data);
    } catch (error) {
      console.error("Flight search error:", error);
      alert("Failed to fetch flights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      <h1 className="text-6xl my-15">Flight Search</h1>
      <div className="flex justify-center max-auto flex-wrap">
        <Input
          setOriginAirport={setOriginAirport}
          setDestinationAirport={setDestinationAirport}
          setDepartureDate={setDepartureDate}
          setPassengerCount={setPassengerCount}
          passengerCount={passengerCount}
          searchAirport={searchAirport}
        />
        <Button
          sx={{
            minWidth: "56.5%",
            background: "#1e6bf2",
            color: "white",
            height: "3.5em",
            fontSize: "larger",
            width: { lg: "76%", md: "70%", sm: "93%", xs: "10%" },
          }}
          onClick={handleSearch}
        >
          {" "}
          Search Flights
        </Button>
      </div>
    </div>
  );
}

export default App;
