import React, { useRef} from 'react';
import {useForm} from 'react-hook-form'
import {
    Box,
    Button,
    Flex,
    FormControl,
    Heading,
    Input,
    Link,
    Select,
    Stack,
} from "@chakra-ui/react";
import {Link as ReachLink, useNavigate} from "react-router-dom";
import picture from "../assets/art-4946528_1920.jpg";
import countries from "../constants/countries.js";
import {colRef} from "../firebase/config.js";
import {setDoc,doc} from "firebase/firestore"
import checkIfUserExists from "../utils/emailChecker.js";
import {useAuth} from "../context/auth.jsx";
import getErrorMessage from "../utils/errorMessage.js";
import useCustomToast from "../hooks/useCustomToast.js";



function Register() {
    const formRef = useRef(null);
    const {register,handleSubmit,formState:{errors},watch,} = useForm()
    const navigate = useNavigate()
    const {firstname,lastname,email,country,password} = watch({})
    const {registerUser} = useAuth()
    const showToast = useCustomToast()


    const handleRegister = async () => {
        try {
            const { user } = await registerUser(email, password);
            const uid = user.uid;
            const createdAt = new Date().toDateString()
            const userData = {
                firstname,
                lastname,
                country,
                email,
                profile_photo:"",
                createdAt,
                uid,

            };
            const docRef = doc(colRef, uid);
            await setDoc(docRef, userData);
            formRef.current.reset();
            navigate('/dashboard');
            showToast("User successfully registered", "success", 3, "Welcome!");
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (e) =>{
        e.preventDefault()
        if (Object.keys(errors).length !== 0) {
            const messages = getErrorMessage(errors);
            // })
showToast("Invalid input","error",6,<ul>
               {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                 ))}
             </ul>)
        }
     await handleRegister()
    }

    return (

        <Flex display="flex" direction="column" align="center" justify="center" >
            <Heading mb="30px" as="h1">Register</Heading>
            <FormControl as="form" isRequired   mb="20px" onSubmit={handleSubmit(handleRegister)}
                         ref={formRef}  noValidate>
                <Stack spacing={4} >
                    <Input type='text' placeholder="Firstname" id="form_firstname"
                           isInvalid={errors.firstname}
                     position="relative"
                    {...register("firstname",{
                        required: {value: true, message:"Firstname is required"},
                        pattern: {
                            value:/^[A-Za-z]+$/g,
                            message:"Firstname can contain only letters"
                        }
                    })}
                    />
                    <Input type='text' placeholder="Lastname" id="form_lastname"
                           isInvalid={errors.lastname}
                           {...register("lastname",{
                               required: {value: true, message:"Lastname is required"},
                               pattern: {
                                   value:/^[A-Za-z]+$/g,
                                   message:"Firstname can contain only letters"
                               }
                           })}
                    />
                    <Select
                        isInvalid={errors.country}
                      cursor="pointer"
                      id="form_country"
                      {...register("country",{
                          required:{value:true,message:"Please select a country"},
                      })}
                    >
                        <option value="">Select a country</option>
                        {countries.map((country) =>{
                        return <option key={country.name} value={country.value}>
                            {country.name} ({country.value})
                        </option>

                        })}
                    </Select>
                    <Input type='email' placeholder="Email" id="form_email"
                           isInvalid={errors.email}
                           {...register("email",{
                               required:{value:true,message:"Email is required"},
                               pattern:{
                                   value:/^[a-zA-Z0-9._%+-]+@(gmail|yahoo|hotmail|outlook|aol|msn|live|icloud|me|yandex|mail|gmx|protonmail)\.[a-zA-Z]{2,}$/g,
                                   message: "Email is invalid"
                               },
                                validate:async (value) => await checkIfUserExists(value) || "E-mail already in use"
                           })}
                    />
                    <Input type='password' placeholder="Password" id="form_password" autoComplete="off"
                           isInvalid={errors.password}
                           {...register("password",{
                               required:{value:true,message:"Password is required"},
                               pattern: {
                                   value:/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,15}$/g,
                                   message:
                                       `Password should contain at least 1 capital,
                                       1 special letter and digit and be between 6 and 15 length`
                               }
                           })}
                    />
                    <Input type='password' placeholder="Repeat a password" id="repeat_password" autoComplete="off"
                           isInvalid={errors.repeat_password}
                           {...register("repeat_password",{
                               required:"Repeat password,please",
                               validate: (value) =>
                                   value === password || "Passwords do not match"
                           })}
                    />
                    <Button colorScheme="blue"
                            type="submit"
                            onClick={(e) => onSubmit(e)}
                    >Register</Button>
                    <Stack/>
                    <Link as={ReachLink} to="/login" align="center" >Already have an account?</Link>
                </Stack>
            </FormControl>
        </Flex>
);
}
export default Register;