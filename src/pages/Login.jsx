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
    InputGroup
} from "@chakra-ui/react";
import {Link as ReachLink, useNavigate} from 'react-router-dom';
import picture from '../assets/art-4946528_1920.jpg'
import {BiLockAlt,BiLockOpenAlt} from 'react-icons/bi';
import {auth} from "../firebase/config.js";
import {signInWithEmailAndPassword} from "firebase/auth";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("")
    const formRef = useRef(null);
    const navigate = useNavigate();

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
         await signInWithEmailAndPassword(auth,email,password)
         formRef.current.reset()
         navigate("/")

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

        <FormControl ref={formRef} isRequired as="form" mb="20px" onSubmit={(e) => userLogIn(e)}>
            <Stack spacing={4} >
            <Input id="form_email" type='email' placeholder="Email" onChange={(e) => onChange(e)} value={email}/>
                <InputGroup>
            <Input type={showPassword ? "text" : "password"}
                   id="form_password"
                   placeholder="Password" onChange={(e) => onChange(e)} value={password}
                  autoComplete="off"
            />
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