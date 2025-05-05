import { Box, Flex, Icon, Input, Text } from "@chakra-ui/react"
import { ImagesGrid } from "@components/index"
import { UserContext } from "@context/user.jsx"
import React, { useContext, useEffect } from "react"
import { FaPlus } from "react-icons/fa"

function MyPosts() {
  const { myPosts, handleUpload, handleFetchMyPosts } = useContext(UserContext)

  useEffect(() => {
    handleFetchMyPosts()
    return () => {}
  }, [])

  return (
    <>
      <Box align="center" mb="30px">
        <Text
          as="label"
          htmlFor="file-input"
          onChange={(e) => handleUpload(e)}
          cursor="pointer"
        >
          <Input display="none" type="file" id="file-input" />
          <Icon as={FaPlus} boxSize={5} />
        </Text>
      </Box>
      {myPosts.length > 0 ? (
        <ImagesGrid items={myPosts} />
      ) : (
        <Flex gap={4} justify="center" align="center">
          <Text fontSize="3xl">You haven&apos;t posted anything yet</Text>
        </Flex>
      )}
    </>
  )
}

export default MyPosts
