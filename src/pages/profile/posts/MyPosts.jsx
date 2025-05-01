import { AddIcon } from "@chakra-ui/icons"
import { Box, Flex, Icon, Input, Text } from "@chakra-ui/react"
import React, { useContext, useEffect } from "react"
import { AiOutlineCamera } from "react-icons/ai"

import { ImagesGrid } from "../../../components/index.js"
import { UserContext } from "../../../context/user.jsx"
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
          <Icon as={AddIcon} boxSize={5} />
        </Text>
      </Box>
      {myPosts.length > 0 ? (
        <ImagesGrid items={myPosts} />
      ) : (
        <Flex gap={4} mb="-40px" fontSize="xl" justify="center" align="center">
          <Text fontSize="4xl">No Photos Yet</Text>
          <Icon as={AiOutlineCamera} boxSize={14}></Icon>
        </Flex>
      )}
    </>
  )
}

export default MyPosts
