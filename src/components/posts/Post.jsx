import {Box, Fade, Image} from '@chakra-ui/react';
import { FiBookmark } from 'react-icons/fi';
import {Icon} from "../index.js";
import {useContext, useEffect, useState} from "react";
import {RiBookmarkFill} from "react-icons/ri"
import {UserContext} from "../../context/user.jsx";
import useFileStore from "../../hooks/useFileStore.js";


function Post({file}) {
    const [display, setDisplay] = useState(false);
    const {createdAt, name, imageUrl} = file;
    const {} = useContext(UserContext)
    const [isSaved, setIsSaved] = useState(false);
    const {userSaveFile} = useFileStore()


    const handleSavePhoto = async (file) => {
        await userSaveFile(file);
        setIsSaved(!isSaved)

    }





    const onMouseOver = (e) =>{
         e.preventDefault()
     setDisplay(true)
    }
    const onMouseOut = (e) => {
         e.preventDefault()
        setDisplay(false)
    }
    return (
        <Box position="relative"
       onMouseOver={(e) => onMouseOver(e)}
             onMouseOut={(e) => onMouseOut(e)}
             transition="transform 0.7s"
             _hover={{ transform: 'scale(1.04)' }}
             mx="auto"
             onClick={() => handleSavePhoto(file)}
        >
            <Image
                boxShadow="rgba(0, 0, 0, 0.2) 0px 1px 3px, rgba(0, 0, 0, 0.1) 0px 1px 2px;"
                borderRadius="2xl"
                src={imageUrl}
            />
            <Fade in={display}>
                <Box>   {display && <Box
                    position="absolute" top="5%" right="5%">
                    <Icon  IconComponent={isSaved ? RiBookmarkFill : FiBookmark} size={25}  color={isSaved ? "yellow" : "#fff"}/>
                </Box> }

                </Box>
            </Fade>

        </Box>
 );

}

export default Post;
