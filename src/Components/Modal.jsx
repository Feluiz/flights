import React, { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    Button,
    IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: '90%', sm: 500 },
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const FlightModal = ({ open, handleClose, flight }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Flight Details</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Typography sx={{ mt: 2 }}>
                    ✈️ From: {flight.origin?.city} ({flight.origin?.displayCode})
                </Typography>
                <Typography>
                    🛬 To: {flight.destination?.city} ({flight.destination?.displayCode})
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    💲 Price: {flight.price?.formatted}
                </Typography>

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={() => alert("Booking confirmed!")}
                >
                    Confirm Booking
                </Button>
            </Box>
        </Modal>
    );
};

export default FlightModal;
