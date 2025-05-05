import { Flex, Heading, Icon } from "@chakra-ui/react"
import React from "react"
import { GrGallery } from "react-icons/gr"
import { Link as ReachLink } from "react-router-dom"

import { DropDown } from "./index.js"

function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      h="70px"
      justify={{ base: "center", sm: "space-between" }}
      position={{ sm: "static", md: "fixed" }}
      zIndex={1}
      align="center"
      px="30px"
    >
      <Flex as="nav" justify="between" align="center">
        <Flex
          borderRadius="lg"
          p="10px"
          transition="0.4s ease-in-out"
          _hover={{ bg: "#ddd" }}
          align="center"
          gap={2}
        >
          <Icon as={GrGallery} boxSize={6} />
          <Heading fontSize="2xl" as={ReachLink} to="/">
            Image Gallery
          </Heading>
        </Flex>
      </Flex>
      <DropDown />
    </Flex>
  )
}

export default Header
