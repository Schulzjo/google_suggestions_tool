import React from 'react';
import {Card, CardContent, Grid, Typography} from "@mui/material";



interface ResultCardsProps {
    result: { [key: string]: string[] };
}


const ResultCards: React.FC<ResultCardsProps> = ({result}) => {
    return (
            <Grid container spacing={12} sx={{padding: "10px"}}>
                {result && Object.keys(result).map((key) => (
                    <Grid key={key} item xs={12} md={6} lg={4}>
                        <Card variant="outlined" sx={{height: "250px", overflow: 'auto'}}>
                            <CardContent sx={{justify: "flex-start"}}>
                                <Typography variant="h5" component="div" gutterBottom>
                                    {key}
                                </Typography>
                                    {result[key].map((value) => (
                                    <Typography key={value + key} variant="body1">{value}<br/></Typography>))}
                            </CardContent>
                        </Card>
                    </Grid>
                ))
                }
            </Grid>
    );
};

export default ResultCards;