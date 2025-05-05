import { Flex, Text } from "@chakra-ui/react"
import { ImagesGrid } from "@components/index"
import { UserContext } from "@context/user.jsx"
import React, { useContext, useEffect } from "react"

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
          <Text fontSize="3xl">You haven&apos;t saved anything yet</Text>
        </Flex>
      )}
    </>
  )
}

export default Saved
