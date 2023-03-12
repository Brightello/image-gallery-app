import React, {useContext, useEffect} from 'react';
import {UserContext} from "../../../context/user.jsx";
import {Icon, ImagesGrid, Post} from "../../../components/index.js";
import {Box, GridItem, Input, Text} from "@chakra-ui/react";
import {AiOutlinePlus} from "react-icons/ai";

function Saved() {
   const {savedPosts,handleFetchSavedPosts} = useContext(UserContext);


    useEffect(() => {

        return () => {
            handleFetchSavedPosts()
        };
    }, []);



    return (
        <>
       <ImagesGrid>
           {savedPosts.map((file) =>{
               return  <GridItem
                   maxW="200px" key={file.createdAt} className="chakra-grid__item"
                   cursor="pointer"
               >
                   <Post key={file.uuid} file={file}
                   />
               </GridItem>
           })}
       </ImagesGrid>
            </>
    );

}

export default Saved;