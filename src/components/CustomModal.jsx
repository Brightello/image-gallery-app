import React from 'react';
import {Box, Flex, Icon, Image, Modal, ModalBody, ModalContent, ModalOverlay} from "@chakra-ui/react";
import {RiBookmarkFill} from "react-icons/ri";
import {FiBookmark, FiDownload} from "react-icons/fi";
import {Input} from "./index.js";

function CustomModal({children,isOpen,onClose}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent
                maxWidth={{ base: "90%", sm: "80%", md: "70%" }}
                height={{ base: "auto", md: "650px" }}
            >
                <ModalBody maxW="100%" p="0" h="100%">
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}


export default CustomModal;