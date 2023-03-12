import React, {useContext, useEffect} from 'react';
import {Icon, ImagesGrid, Post} from "../../../components/index.js";
import {UserContext} from "../../../context/user.jsx";
import {Box, GridItem, Input, Text} from "@chakra-ui/react";
import {AiOutlinePlus} from "react-icons/ai";


function MyPosts() {
  const  {myPosts,handleUpload,handleFetchPosts} = useContext(UserContext)
    useEffect(() => {
        return () => {
            handleFetchPosts()
        };
    }, []);

    return (
        <>
          <Box align="center" mb="30px">
            <Text as="label" htmlFor="file-input"
                  onChange ={(e) => handleUpload(e)}
                  cursor="pointer">
              <Input
                  display="none"
                  type="file"
                  id="file-input"/>
              <Icon IconComponent={AiOutlinePlus} size={25} />
            </Text>
          </Box>
        <ImagesGrid>
            {myPosts && myPosts.map((file) =>{
                return  <GridItem
                    maxW="200px"
                     key={file.createdAt} className="chakra-grid__item"
                    cursor="pointer"
                >
                    <Post key={file.uuid} file={file}/>
                </GridItem>
            })}
        </ImagesGrid>
          </>
    );
}

export default MyPosts;