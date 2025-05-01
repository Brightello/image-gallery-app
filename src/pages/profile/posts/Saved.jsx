import { Flex, Icon, Text } from "@chakra-ui/react"
import React, { useContext, useEffect } from "react"
import { AiOutlineCamera } from "react-icons/ai"

import { ImagesGrid } from "../../../components/index.js"
import { UserContext } from "../../../context/user.jsx"

function Saved() {
  const { savedPosts, handleFetchSavedPosts } = useContext(UserContext)

  useEffect(() => {
    return () => {
      handleFetchSavedPosts()
    }
  }, [])

  return (
    <>
      {savedPosts.length > 0 ? (
        <ImagesGrid items={savedPosts} />
      ) : (
        <Flex gap={4} mb="-40px" fontSize="xl" justify="center" align="center">
          <Text fontSize="4xl">No Photos Yet</Text>
          <Icon as={AiOutlineCamera} boxSize={14}></Icon>
        </Flex>
      )}
    </>
  )
}

export default Saved
