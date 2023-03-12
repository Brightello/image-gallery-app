import React from 'react';
import {Grid, GridItem} from "@chakra-ui/react"
import {Post} from "../index.js";

function ImagesGrid({children}) {


    return (
        <Grid className="chakra-grid"  templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(4, 1fr)",
        ]}
              justifyItems="center"
              alignItems="center"
              gap={6}>
            {children}
        </Grid>
    );
}

export default ImagesGrid;