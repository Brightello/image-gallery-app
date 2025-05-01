import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react"
import React from "react"

function CustomModal({ children, isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        maxWidth={{ base: "90%", sm: "80%", md: "70%" }}
        height={{ base: "auto", md: "650px" }}
      >
        <ModalBody maxW="100%" p="0" h="100%">
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CustomModal
