import React from 'react';
import {Grid, GridItem} from "@chakra-ui/react"
import {Post} from "./index.js";

function ImagesGrid({files}) {


    return (
        <Grid className="chakra-grid" templateColumns="repeat(4, 1fr)" gap={6}>
            {files.map((file) =>{
              return  <GridItem
                  minW="141px" key={file.createdAt} className="chakra-grid__item">
                    <Post file={file}/>
                </GridItem>
            })}
        </Grid>
    );
}

export default ImagesGrid;