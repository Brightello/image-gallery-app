import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Link,
  Stack
} from "@chakra-ui/react"
import { Card } from "@components/index"
import { useAuth } from "@context/auth.jsx"
import useCustomToast from "@hooks/useCustomToast.js"
import { doc, setDoc } from "firebase/firestore"
import React from "react"
import { useForm } from "react-hook-form"
import { Link as ReachLink, useNavigate } from "react-router-dom"

import { colRef } from "#firebase/config.js"
import { FIREBASE_AUTH_ERROR_CODE } from "#firebase/constants"

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm()
  const navigate = useNavigate()
  const { firstname, lastname, email, password } = watch({})
  const { registerUser } = useAuth()
  const showToast = useCustomToast()

  const handleRegister = async () => {
    try {
      const { user } = await registerUser(email, password)

      const uid = user.uid

      const createdAt = new Date().toDateString()

      const userData = {
        firstname,
        lastname,
        email,
        createdAt,
        uid
      }
      const docRef = doc(colRef, uid)

      await setDoc(docRef, userData)

      reset()

      navigate("/dashboard")

      showToast("User successfully registered", "success", 3, "")
    } catch (error) {
      if (error.code === FIREBASE_AUTH_ERROR_CODE.EMAIL_IN_USE) {
        showToast("User credentials error", "error", 3, "Email already in-use")
      }
    }
  }

  return (
    <Flex as="main" justify="center" align="center" minH="100vh">
      <Card title="Register">
        <Heading mb={30} as="h1" align="center">
          Register
        </Heading>
        <FormControl
          as="form"
          mb={5}
          isRequired
          onSubmit={handleSubmit(handleRegister)}
        >
          <Stack spacing={4}>
            <FormControl isInvalid={errors.firstname}>
              <Input
                type="text"
                placeholder="Firstname"
                id="form_firstname"
                isInvalid={errors.firstname}
                position="relative"
                {...register("firstname", {
                  required: { value: true, message: "Firstname is required" },
                  pattern: {
                    value: /^[A-Za-z]+$/g,
                    message: "Firstname can contain only letters"
                  }
                })}
              />
              <FormErrorMessage m={1}>
                Firstname can contain only letters
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.lastname}>
              <Input
                type="text"
                placeholder="Lastname"
                id="form_lastname"
                isInvalid={errors.lastname}
                {...register("lastname", {
                  required: { value: true, message: "Lastname is required" },
                  pattern: {
                    value: /^[A-Za-z]+$/g,
                    message: "Firstname can contain only letters"
                  }
                })}
              />
              <FormErrorMessage mt={1}>
                Firstname can contain only letters
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <Input
                type="email"
                placeholder="Email"
                id="form_email"
                isInvalid={errors.email}
                {...register("email", {
                  required: { value: true, message: "Email is required" }
                })}
              />
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <Input
                type="password"
                placeholder="Password"
                id="form_password"
                autoComplete="off"
                isInvalid={errors.password}
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{6,}$/g,
                    message: `Password should contain at least 1 capital,
                                       1 special letter and digit and be at lest 6 characters`
                  }
                })}
              />
              <FormErrorMessage mt={1}>
                Password should contain at least 1 uppercase letter, 1 special
                character, 1 digit, and be at least 6 characters long.
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.repeat_password}>
              <Input
                type="password"
                placeholder="Repeat a password"
                id="repeat_password"
                autoComplete="off"
                isInvalid={errors.repeat_password}
                {...register("repeat_password", {
                  required: { value: true, message: "Repeat password, please" },
                  validate: (value) =>
                    value === password || "Passwords do not match"
                })}
              />
              <FormErrorMessage mt={1}>Passwords should match</FormErrorMessage>
            </FormControl>
            <Button
              isDisabled={!!Object.keys(errors).length || !email || !password}
              colorScheme="blue"
              type="submit"
            >
              Register
            </Button>
          </Stack>
        </FormControl>
        <Stack justifyContent="center">
          <Link as={ReachLink} to="/login" textAlign="center">
            Already have an account?
          </Link>
        </Stack>
      </Card>
    </Flex>
  )
}
export default Register
