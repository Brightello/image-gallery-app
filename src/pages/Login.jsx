import React, {useRef, useState} from 'react';
import {
    Button,
    Flex,
    FormControl,
    Heading,
    Input,
    Stack,
    Link,
    Box,
    Image,
    InputRightElement,
    InputGroup, useRadio
} from "@chakra-ui/react";
import {Link as ReachLink} from 'react-router-dom';
import picture from '../assets/art-4946528_1920.jpg'
import {BiLockAlt,BiLockOpenAlt} from 'react-icons/bi';
import {auth} from "../firebase/config.js";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("")
    const formRef = useRef(null);

    const onChange = (e) =>{
        switch(e.target.id){
            case "form_email": setEmail(e.target.value);
                break;
            case "form_password":setPassword(e.target.value)
                break;
        }
    }
   const userLogIn = async (e) =>{
        e.preventDefault()
     try{
         const {user} = await auth.signInWithEmailAndPassword(email,password)
         formRef.current.reset()
         console.log(user)

     }catch (error){
    console.log(error.message)
     }

   }
    const showMyPassword = () =>{
        setShowPassword(prevState => !prevState)
    }
    return (

        <Flex display="flex" direction="column" align="center" justify="center">
            <Heading mb="30px" as="h1">Login</Heading>

        <FormControl isRequired as="form" mb="20px" onSubmit={(e) => userLogIn(e)}>
            <Stack spacing={4} >
            <Input type='email' placeholder="Email" onChange={(e) => onChange(e)}/>
                <InputGroup>
            <Input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => onChange(e)}/>
                    <InputRightElement
                        onClick={ () => showMyPassword()}
                    children={showPassword ? <BiLockOpenAlt/> : <BiLockAlt/>}
                        cursor="pointer"
                    />
                </InputGroup>
            <Button colorScheme="blue"
                    type="submit">Login</Button>
           <Link as={ReachLink} to="/register" align="center" >Don't have an account?</Link></Stack>
        </FormControl>
             <Box w="300px" h="400px">
                 <Image
                     src={picture}
                     alt="Placeholder"
                     w="100%"
                     h="100%"
                     objectFit="cover"
                 />
             </Box>
        </Flex>
    );
}

export default Login;