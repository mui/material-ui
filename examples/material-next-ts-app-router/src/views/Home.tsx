'use client'

import { Box, Typography } from "@mui/material";

const Home = () => {
    return (
        <Box sx={{ width:"100vw", height:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Typography variant="h4" fontWeight="bold">Material UI - Next.js (App router) example</Typography>
        </Box>
    )
}

export default Home;
