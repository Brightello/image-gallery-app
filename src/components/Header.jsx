import { Box, Flex, Heading, Icon, List, ListItem } from "@chakra-ui/react"
import { useAuth } from "@context/auth.jsx"
import { UserContext } from "@context/user.jsx"
import React, { useContext, useState } from "react"
import { GrGallery } from "react-icons/gr"
import { Link as ReachLink } from "react-router-dom"

import { Avatar, DropDown } from "./index.js"

function Header() {
  const [showUserOptions, setShowUserOptions] = useState(false)
  const { userData, handleLogOut } = useContext(UserContext)
  const { currentUser } = useAuth()
  const showOptions = () => {
    setShowUserOptions((prevState) => !prevState)
  }

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
      <Box
        position="relative"
        display={{ base: "none", sm: "block" }}
        onClick={() => showOptions()}
      >
        {userData && (
          <Avatar
            name={userData.firstname}
            src={currentUser.photoURL ? currentUser.photoURL : ""}
            position="relative"
          />
        )}
      </Box>
      {showUserOptions && (
        <DropDown>
          <List py="15px">
            <ListItem py="10px" onClick={() => handleLogOut()}>
              Log Out
            </ListItem>
          </List>
        </DropDown>
      )}
    </Flex>
  )
}

export default Header
