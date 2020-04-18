import React, { useState, useEffect } from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

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
            <h4> HELLO WORLD! </h4>
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
                                <TableCell align="right"> {hotdog.title} </TableCell>
                                <TableCell align="right"> {hotdog.ingredients} </TableCell>
                                <TableCell align="right"> {hotdog.creator} </TableCell>
                                <TableCell align="right"> {hotdog.ts} </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Home;