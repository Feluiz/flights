import { useState, useEffect } from "react";
import { TextField, Box, Autocomplete } from "@mui/material";
import airports from "./assets/airports";
const apiKey = import.meta.env.VITE_API_KEY;

const Input = () => {
  const [inputValue, setInputValue] = useState("");
  const [passengerCount, setPassengerCount] = useState(1);

  const filteredOptions = airports
    .filter((airport) => {
      const query = inputValue.toLowerCase();
      return (
        airport.name.toLowerCase().includes(query) ||
        airport.location.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      const query = inputValue.toLowerCase();
      const aNameMatch = a.name.toLowerCase().includes(query);
      const bNameMatch = b.name.toLowerCase().includes(query);

      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      return 0;
    })
    .slice(0, 20);

  return (
    <>
      <div className="flex flex-wrap justify-evenly items-center">
        <Box
          width={{ lg: "100%", md: "100%", sm: "100%", xs: "55%" }}
          gap={20}
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            mb: 5,
          }}
        >
          <Autocomplete
            freeSolo
            options={filteredOptions}
            getOptionLabel={(option) => option.name || ""}
            onInputChange={(event, newInputValue, reason) => {
              if (reason === "input") {
                setInputValue(newInputValue);
              }
            }}
            filterOptions={(x) => x}
            debounce={300}
            sx={{
              width: { xs: "100%", sm: "45%", md: "45%", lg: "45%" },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id="outlined-basic-from"
                label="From"
                variant="outlined"
                sx={{
                  width: "100%",
                  "& .MuiInputBase-root": { width: "100%" },
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.iata || option.id || option.name}>
                <div>
                  <strong>{option.name}</strong> ({option.iata})
                  <div>{option.location}</div>
                </div>
              </li>
            )}
          />

          <TextField
            id="outlined-basic"
            type="date"
            variant="outlined"
            sx={{ width: { xs: "100%", sm: "45%", md: "45%", lg: "45%" } }}
          />

          <Autocomplete
            freeSolo
            options={filteredOptions}
            getOptionLabel={(option) => option.name || ""}
            onInputChange={(event, newInputValue, reason) => {
              if (reason === "input") {
                setInputValue(newInputValue);
              }
            }}
            filterOptions={(x) => x}
            debounce={300}
            sx={{
              width: { xs: "100%", sm: "45%", md: "45%", lg: "45%" },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id="outlined-basic-from"
                label="Destination"
                variant="outlined"
                sx={{
                  width: "100%",
                  "& .MuiInputBase-root": { width: "100%" },
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.iata || option.id || option.name}>
                <div>
                  <strong>{option.name}</strong> ({option.iata})
                  <div>{option.location}</div>
                </div>
              </li>
            )}
          />

          <TextField
            id="outlined-basic-passengers"
            label="Passengers"
            type="number"
            variant="outlined"
            value={passengerCount}
            onChange={(e) => {
              const value = Math.max(1, parseInt(e.target.value) || 1);
              setPassengerCount(value);
            }}
            sx={{
              width: { xs: "100%", sm: "45%", md: "45%", lg: "45%" }
            }}
          />
        </Box>
      </div>
    </>
  );
};

export default Input;
