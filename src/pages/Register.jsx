import React, {useState,useRef} from 'react';
import {Box, Button, Flex, FormControl, Heading, Image, Input, Link, Select, Stack} from "@chakra-ui/react";
import {Link as ReachLink, useNavigate} from "react-router-dom";
import picture from "../assets/art-4946528_1920.jpg";
import countries from "../constants/countries.js";
import {auth,colRef} from "../firebase/config.js";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {addDoc} from "firebase/firestore"


function Register() {
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [country,setCountry] = useState("")
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("")
    const formRef = useRef(null);
    const navigate = useNavigate()
    const userRegister = async (e) =>{
        e.preventDefault()
       try{
            const {user} = await createUserWithEmailAndPassword(auth,email,password)
        await addDoc(colRef,{
             country,
             email,
             firstName,
             lastName,
             uuid: user.uid
         })

           formRef.current.focus();
           navigate("/")
       }catch (error){
       console.log("Error creating user:",error)
       }


    }
    const onChange = (e) =>{
        switch(e.target.id){
            case "form_email": setEmail(e.target.value);
            break;
            case "form_password":setPassword(e.target.value)
                break;
            case "form_firstname":setFirstName(e.target.value);
            break;
            case "form_lastname":setLastName(e.target.value)
                break;
            case "form_country":setCountry(e.target.value)
break;
        }
    }
    return (
        <Flex display="flex" direction="column" align="center" justify="center">
            <Heading mb="30px" as="h1">Register</Heading>
            <FormControl as="form" isRequired   mb="20px" onSubmit={(e) => userRegister(e)} ref={formRef}>
                <Stack spacing={4} >
                    <Input type='text' placeholder="Firstname" id="form_firstname" value={firstName} onChange={(e) => onChange(e)}/>
                    <Input type='text' placeholder="Lastname" id="form_lastname" value={lastName} onChange={(e) => onChange(e)}/>
                    <Select
                      cursor="pointer"
                      id="form_country"
                      onChange={(e) => onChange(e)}
                    >
                        <option value="default">Select a country</option>
                        {countries.map((country) =>{
                        return <option key={country.name} value={country.value}>
                            {country.name} ({country.value})
                        </option>

                        })}
                    </Select>
                    <Input type='email' placeholder="Email" id="form_email" value={email} onChange={(e) => onChange(e)}/>
                    <Input type='password' placeholder="Password" id="form_password" autoComplete="off" value={password} onChange={(e) => onChange(e)}/>
                    <Input type='password' placeholder="Repeat a password" id="password" autoComplete="off"/>
                    <Button colorScheme="blue"
                            type="submit"
                    >Register</Button>
                    <Link as={ReachLink} to="/login" align="center" >Already have an account?</Link></Stack>
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

export default Register;