import { Box, Fade, Icon, Image, useDisclosure } from "@chakra-ui/react"
import useFileStore from "@hooks/useFileStore.js"
import { useState } from "react"
import { FiBookmark } from "react-icons/fi"
import { RiBookmarkFill } from "react-icons/ri"

import PostDetails from "./PostDetails.jsx"

function Post({ file }) {
  const [display, setDisplay] = useState(false)
  const { imageUrl } = file
  const [isSaved, setIsSaved] = useState(
    localStorage.getItem(file.uid) === "true"
  )
  const { userSavePost } = useFileStore()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSavePost = async (file, e) => {
    e.stopPropagation()
    await userSavePost(file)
    localStorage.setItem(file.uid, !isSaved)
    setIsSaved(!isSaved)
    localStorage.getItem(file.uid)
  }

  const showPostDetails = () => {
    onOpen()
  }

  const onMouseOver = (e) => {
    e.preventDefault()
    setDisplay(true)
  }
  const onMouseOut = (e) => {
    e.preventDefault()
    setDisplay(false)
  }
  return (
    <Box
      position="relative"
      onMouseOver={(e) => onMouseOver(e)}
      onMouseOut={(e) => onMouseOut(e)}
      transition="transform 0.7s"
      _hover={{ transform: "scale(1.04)" }}
      cursor="pointer"
      mx="auto"
      onClick={() => showPostDetails()}
    >
      <Image
        boxShadow="rgba(0, 0, 0, 0.2) 0px 1px 3px, rgba(0, 0, 0, 0.1) 0px 1px 2px;"
        borderRadius="2xl"
        src={imageUrl}
        alt={"Post photo"}
      />
      <Fade in={display}>
        <Box>
          {" "}
          {display && (
            <Box
              position="absolute"
              top="5%"
              right="5%"
              onClick={(e) => handleSavePost(file, e)}
            >
              <Icon
                as={isSaved ? RiBookmarkFill : FiBookmark}
                color={isSaved ? "yellow" : "black"}
                boxSize={6}
              />
            </Box>
          )}
        </Box>
      </Fade>
      <PostDetails
        isOpen={isOpen}
        onClose={onClose}
        file={file}
        handleSavePost={handleSavePost}
        isSaved={isSaved}
        bgImage={imageUrl}
      />
    </Box>
  )
}

export default Post
