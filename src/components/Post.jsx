import {Box, Fade, Image} from '@chakra-ui/react';
import { FiDownload } from 'react-icons/fi';
import {Icon} from "./index.js";
import { useState} from "react";
import {storage} from "../firebase/config"
import {ref,getDownloadURL} from "firebase/storage"
import {saveAs} from "file-saver"


function Post({file}) {
    const [display, setDisplay] = useState(false);
     const {createdAt,name,imageUrl} = file;
    const handleDownload =  async () => {
        const storageRef = ref(storage, `/images/${name}`)
        const imageRef = ref(storage, imageUrl)
        const url = await getDownloadURL(imageRef)
    }


    const onMouseOver = (e) =>{
setDisplay(true)
    }
    const onMouseOut = (e) => {
        setDisplay(false)
    }
    return (
        <Box position="relative"
       onMouseOver={(e) => onMouseOver(e)}
             onMouseOut={(e) => onMouseOut(e)}
             transition="transform 0.7s"
             _hover={{ transform: 'scale(1.04)' }}
             mx="auto"


        >
            <Image
                boxShadow="rgba(0, 0, 0, 0.2) 0px 1px 3px, rgba(0, 0, 0, 0.1) 0px 1px 2px;"
                borderRadius="2xl"
                src={imageUrl}
            />
            <Fade in={display}>
            {display && <Box
                position="absolute" top="5px" 

                             cursor="pointer" onClick ={() => handleDownload()}>
                <Icon  IconComponent={FiDownload} size={25} color="#fff"
                />
            </Box> }
            </Fade>

        </Box>
    );
}

export default Post;
