import { TextField, Box } from "@mui/material";

const Input = () => {
  return (
    <>
      <div className="flex flex-wrap justify-evenly items-center">
        <Box
          width={{ lg: "100%", md: "80%", sm: "100%", xs: "55%" }}
          gap={20}
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            mb: 5,
          }}
        >
          <TextField
            id="outlined-basic"
            label="From"
            variant="outlined"
            sx={{ width: { xs: "100%", sm: "40%", md: "45%", lg: "45%" } }}
          />
          <TextField
            id="outlined-basic"
            label="Departure date"
            variant="outlined"
            sx={{ width: { xs: "100%", sm: "40%", md: "45%", lg: "45%" } }}
          />
          <TextField
            id="outlined-basic"
            label="To"
            variant="outlined"
            sx={{ width: { xs: "100%", sm: "40%", md: "45%", lg: "45%" } }}
          />
          <TextField
            id="outlined-basic"
            label="Passengers"
            variant="outlined"
            sx={{ width: { xs: "100%", sm: "40%", md: "45%", lg: "45%" } }}
          />
        </Box>
      </div>
    </>
  );
};

export default Input;
