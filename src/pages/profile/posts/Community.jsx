import { Box, Flex, Input, Text } from "@chakra-ui/react"
import { ImagesGrid } from "@components/index.js"
import { UserContext } from "@context/user.jsx"
import React, { useContext, useEffect } from "react"

function Community() {
  const { communityPosts, handleFetchPosts } = useContext(UserContext)

  useEffect(() => {
    return () => {
      handleFetchPosts()
    }
  }, [])

  return (
    <>
      <Box align="center" mb="30px">
        <Text as="label" htmlFor="file-input" cursor="pointer">
          <Input display="none" type="file" id="file-input" />
        </Text>
        {communityPosts.length > 0 ? (
          <ImagesGrid items={communityPosts} />
        ) : (
          <Flex
            gap={4}
            mb="-40px"
            fontSize="xl"
            justify="center"
            align="center"
          >
            <Text fontSize="3xl">There are no posts in community yet</Text>
          </Flex>
        )}
      </Box>
    </>
  )
}

export default Community
