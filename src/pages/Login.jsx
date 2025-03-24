import React, {useRef, useState} from 'react';
import {
    Button,
    Flex,
    FormControl,
    Heading,
    Input,
    Stack,
    Link,
    InputRightElement,
    InputGroup, Text,
    useToast
} from "@chakra-ui/react";
import {Link as ReachLink, useNavigate} from 'react-router-dom';
import picture from '../assets/art-4946528_1920.jpg'
import {BiLockAlt,BiLockOpenAlt} from 'react-icons/bi';
import {useForm} from "react-hook-form";
import checkIfUserExists from "../utils/emailChecker.js";
import {useAuth} from "../context/auth.jsx";
import useCustomToast from "../hooks/useCustomToast.js";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const formRef = useRef(null);
    const navigate = useNavigate();
    const {register,handleSubmit,formState:{errors},watch} = useForm()
    const {email,password} = watch({})
    const {loginUser} = useAuth();
    const showToast = useCustomToast();

    const handleLogin = async () => {
        try {
        await loginUser(email, password);
           formRef.current.reset();
           navigate("/dashboard")
           showToast("User successfully logged in","success",3,"Welcome!")
        } catch (error) {
            if(error.code === "auth/wrong-password"){
                showToast("User credentials error","error",3,"Incorrect password. Please try again")
            }


        }
    };

    const showMyPassword = () =>{
        setShowPassword(prevState => !prevState)
    }
    return (

        <Flex display="flex" direction="column" align="center" justify="center">
            <Heading mb="30px" as="h1">Login</Heading>
        <FormControl
            ref={formRef} isRequired as="form" mb="20px" onSubmit={handleSubmit(handleLogin)}
            noValidate
        >
            <Stack spacing={4}>
            <Input id="form_email" type='email' placeholder="Email"
                   isInvalid={errors.email}
                   {...register("email",{
                       required: {value:true,message:"Please,provide an e-mail"},
                       validate:async (value) => !await checkIfUserExists(value) || "Invalid e-mail"
                   })}
            />
                {errors.email && <Text>{errors.email.message}</Text>}
                <InputGroup>
            <Input type={showPassword ? "text" : "password"}
                   id="form_password"
                   placeholder="Password"
                  autoComplete="off"

                   {...register("password",{
                       required: {value:true,message:"Please,provide a password"}
                   })
                   }
            />

                    <InputRightElement
                        onClick={ () => showMyPassword()}
                    children={showPassword ? <BiLockOpenAlt/> : <BiLockAlt/>}
                        cursor="pointer"
                    />
                </InputGroup>
                {errors.password && <Text>{errors.password.message}</Text>}
            <Button colorScheme="blue"
                    type="submit">Login</Button>
           <Link as={ReachLink} to="/register" align="center" >Don't have an account?</Link>
        </Stack>
        </FormControl>
         </Flex>
    )

}

export default Login;