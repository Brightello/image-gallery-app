import { Grid, GridItem } from "@chakra-ui/react"
import React from "react"

import { Post } from "../index.js"

function ImagesGrid({ items }) {
  return (
    <Grid
      className="chakra-grid"
      templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]}
      justifyItems="center"
      alignItems="center"
      gap={6}
    >
      {items.map((item) => {
        return (
          <GridItem
            maxW="200px"
            key={item.createdAt}
            className="chakra-grid__item"
          >
            <Post key={item.uid} file={item} />
          </GridItem>
        )
      })}
    </Grid>
  )
}

export default ImagesGrid
