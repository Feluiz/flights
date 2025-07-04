import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import { useState } from "react";
import FlightModal from "./Modal";

const ResultsCard = ({ itinerariesData }) => {
  console.log(itinerariesData)
  const itineraries = itinerariesData.data.itineraries;
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (flight) => {
    setSelectedFlight(flight);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFlight(null);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatTime = (dateTime) =>
    new Date(dateTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  return (
    <>
      <Grid
        container
        sx={{
          p: 0,
          width: { xl: "90%", lg: "100%", md: "100%", sm: "100%", xs: "100%" },
          mx: "1em",
          bgcolor: "#f5f5f5",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {itineraries.map((itinerary) => (
          <Grid
            key={itinerary.id}
            sx={{
              width: {
                lg: "100%",
                md: "100%",
                sm: "100%",
                xs: "100%",
                border: "1px solid #D3D3D3",
                display: "flex",
                placeContent: "center",
              },
            }}
          >
            <Card
              sx={{
                width: {
                  lg: "100%",
                  md: "100%",
                  sm: "100%",
                  xs: "100%",
                  border: "1px solid #D3D3D3",
                },
                height: {
                  lg: "7rem",
                  md: "7rem",
                  sm: "8rem",
                  xs: "10rem",
                },
                m: 1,
                border: "1px solid",
                borderColor: "#e0e0e0",
                borderRadius: 2,
                bgcolor: "#fff",
                display: "flex",
                alignItems: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.01)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 40, height: 40, ml: 2 }}
                image={itinerary.legs[0].carriers.marketing[0].logoUrl}
                alt={`${itinerary.legs[0].carriers.marketing[0].name} logo`}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                  overflow: "hidden",
                  pb: "10px",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex md:flex-row flex-col">
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "medium",
                        color: "#333",
                        minWidth: "150px",
                        whiteSpace: "nowrap",
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {itinerary.legs[0].carriers.marketing[0].name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "medium",
                        color: "#333",
                        minWidth: "150px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatTime(itinerary.legs[0].departure)}{" "}
                      {formatTime(itinerary.legs[0].arrival)}{" "}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "medium",
                        color: "#333",
                        minWidth: "150px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {itinerary.legs[0].origin.displayCode} →{" "}
                      {itinerary.legs[0].destination.displayCode}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#666", minWidth: "100px" }}
                    >
                      {formatDuration(itinerary.legs[0].durationInMinutes)} •{" "}
                      {itinerary.legs[0].stopCount}{" "}
                      {itinerary.legs[0].stopCount === 1 ? "stop" : "stops"}
                    </Typography>
                  </div>
                  <div className="flex md:flex-row flex-col items-center">
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "#1a73e8",
                        minWidth: "80px",
                      }}
                    >
                      {itinerary.price.formatted}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        m: 2,
                        bgcolor: "#1a73e8",
                        "&:hover": { bgcolor: "#1557b0" },
                      }}
                      onClick={() => handleOpen(itinerary)}
                    >
                      Book
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            {selectedFlight && (
              <FlightModal
                open={open}
                handleClose={handleClose}
                flight={{
                  ...selectedFlight.legs[0],
                  price: selectedFlight.price,
                }}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ResultsCard;
