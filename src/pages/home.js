import React, { useState, useEffect } from 'react';

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { PageTitle } from '../components'; 

// index.php
function Home() {
    // state variables
    const [hotdogs, setHotdogs] = useState([]);

    // similar to componentDidMount
    useEffect(() => {
        async function callBackendApi () {
            const response = await fetch('/api/hotdogs');
            const hotdogs = await response.json();
            setHotdogs(hotdogs);
        }
        callBackendApi();
    });
    
    // read a state variable by simply placing {} around the variable name
    return (
        <div>
            <Box p={2}>
                <PageTitle text="Your Hotdogs"/>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> id </TableCell>
                            <TableCell> title </TableCell>
                            <TableCell> ingredients </TableCell>
                            <TableCell> creator </TableCell>
                            <TableCell> ts </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hotdogs.map((hotdog) => (
                            <TableRow key={hotdog.id}>
                                <TableCell component="th" scope="row"> {hotdog.id} </TableCell>
                                <TableCell> {hotdog.title} </TableCell>
                                <TableCell> {hotdog.ingredients} </TableCell>
                                <TableCell> {hotdog.creator} </TableCell>
                                <TableCell> {hotdog.ts} </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Home;