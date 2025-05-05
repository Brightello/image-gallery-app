import { Box, Flex, Icon, Image } from "@chakra-ui/react"
import { useAuth } from "@context/auth.jsx"
import { UserContext } from "@context/user.jsx"
import useFileStore from "@hooks/useFileStore.js"
import React, { useContext } from "react"
import { FaRegTrashAlt } from "react-icons/fa"
import { FiBookmark } from "react-icons/fi"
import { RiBookmarkFill } from "react-icons/ri"

import { CustomModal } from "../index"

function PostDetails({ file, isSaved, handleSavePost, isOpen, onClose }) {
  const { userDeletePost } = useFileStore()
  const { currentUser } = useAuth()
  const { handleFetchMyPosts } = useContext(UserContext)

  const handleDeletePost = async () => {
    try {
      await userDeletePost(currentUser.uid, file.uid)
      await handleFetchMyPosts()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <Flex
        direction={{ base: "column", md: "row" }}
        w={{ base: "100%", md: "auto" }}
        h={{ base: "auto", md: "100%" }}
        position="relative"
      >
        <Box
          h={{ base: "auto", md: "100%" }}
          w={{ base: "100%", md: "50%" }}
          position="relative"
        >
          <Image
            src={file.imageUrl}
            alt={file.name}
            borderRadius="lg"
            borderTopRightRadius={{ base: "lg", md: "none" }}
            borderBottomRightRadius={{ base: "lg", md: "none" }}
            h="100%"
            w="100%"
            objectFit="cover"
          />
          <Box position="absolute" right="3%" top="3%" cursor="pointer">
            <Icon
              as={isSaved ? RiBookmarkFill : FiBookmark}
              color={isSaved ? "yellow" : "#fff"}
              boxSize={{ base: 6, md: 10 }}
              onClick={(e) => handleSavePost(file, e)}
            />
          </Box>
          <Box
            display={currentUser.uid === file.author ? "" : "none"}
            position="absolute"
            left="3%"
            top="3%"
            cursor="pointer"
          >
            <Icon
              boxSize={{ base: 4, md: 7 }}
              as={FaRegTrashAlt}
              color="#fff"
              onClick={() => handleDeletePost()}
            />
          </Box>
        </Box>
      </Flex>
    </CustomModal>
  )
}

export default PostDetails
