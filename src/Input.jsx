import { TextField } from "@mui/material";

const Input = () => {
  const options = [
    { label: "The Godfather", id: 1 },
    { label: "Pulp Fiction", id: 2 },
  ];

  return (
    <>
      <div className="flex max-w-[60%] flex-wrap justify-evenly h-40 items-center">
        <TextField id="outlined-basic" label="From" variant="outlined" margin="normal" sx={{width: '20em'}}/>
        <TextField id="outlined-basic" label="Departure date" variant="outlined" margin="normal" sx={{width: '20em'}}/>
        <TextField id="outlined-basic" label="To" variant="outlined" margin="normal" sx={{width: '20em'}}/>
        <TextField id="outlined-basic" label="Passengers" variant="outlined" margin="normal" sx={{width: '20em'}}/>
      </div>
    </>
  );
};

export default Input;
