import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Input from "./Components/Input";
import "./App.css";
import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;
import TopNav from "./Components/Appbar";
//trycatch
import ResultsCard from "./Components/ResultsCard";

function App() {
  const [originAirport, setOriginAirport] = useState(null);
  const [passengerCount, setPassengerCount] = useState(1);
  const [destinationAirport, setDestinationAirport] = useState(null);
  const [departureDate, setDepartureDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [itinerariesData, setItinerariesData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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
    const params = {
      originSkyId: originAirport.skyId,
      destinationSkyId: destinationAirport?.skyId || undefined,
      departureDate: departureDate || undefined,
      adults: passengerCount,
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

      const itineraries2 = response?.data?.itineraries;
      if (itineraries2) {
        console.log("Flight search results:", response.data);
      } else {
        alert("No itineraries returned.");
        window.location.reload(true)
      }
      setItinerariesData(response.data);
      setIsOpen(true);
    } catch (error) {
      console.error("Flight search error:", error);
      alert("Failed to fetch flights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <TopNav />
      {!isOpen ? (
        <div
          className="justify-center grid place-items-center col-auto w-[100%]
             sm:min-w-[40%]
             md:min-w-[50%]
             lg:min-w-[60%]
             xl:w-[70%]"
        >
          <div
            className="flex justify-center flex-wrap items-center w-[95%]
             sm:w-[100%]
             md:w-[100%]
             lg:w-[100%]
             xl:w-[100%]"
          >
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
                cursor: "pointer"
              }}
              onClick={handleSearch}
            >
              {" "}
              Search Flights
            </Button>
            {isOpen && <ResultsCard itinerariesData={itinerariesData} />}
          </div>
        </div>
      ) : (
        <ResultsCard itinerariesData={itinerariesData} />
      )}
    </div>
  );
}

export default App;
