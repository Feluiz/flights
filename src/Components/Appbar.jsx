import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const TopNav = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar
            position="fixed"
            color="primary"
            elevation={4}
            sx={{ zIndex: theme.zIndex.drawer + 1 }}
        >
            <Toolbar
                sx={{
                    px: { xs: 2, sm: 4, md: 6 },
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="h6" noWrap>
                    Flight Search-inator
                </Typography>

                {isMobile ? (
                    <IconButton edge="end" color="inherit">
                        <MenuIcon />
                    </IconButton>
                ) : (
                    <Box display="flex" gap={3}>
                        <Typography variant="button">Flights</Typography>
                        <Typography variant="button">About</Typography>
                        <Typography variant="button">Help</Typography>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default TopNav;
