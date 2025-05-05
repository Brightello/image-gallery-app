import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from "@chakra-ui/react"
import { UserContext } from "@context/user.jsx"
import React, { useContext } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { RxHamburgerMenu } from "react-icons/rx"

function DropDown() {
  const { userData, handleLogOut } = useContext(UserContext)

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<RxHamburgerMenu />}
        variant="outline"
      ></MenuButton>
      <MenuList>
        <Flex justify="center" align="center" mb={3}>
          <Flex direction="column">
            <Text fontSize="lg">
              {userData.firstname} {userData.lastname}
            </Text>
            <Text fontSize="sm">{userData.email}</Text>
          </Flex>
        </Flex>
        <MenuItem icon={<FaArrowLeft />} onClick={() => handleLogOut()}>
          Log Out
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default DropDown
