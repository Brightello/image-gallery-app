import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack
} from "@chakra-ui/react"
import { Card } from "@components/index"
import { useAuth } from "@context/auth.jsx"
import useCustomToast from "@hooks/useCustomToast.js"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link as ReachLink, useNavigate } from "react-router-dom"

import { FIREBASE_AUTH_ERROR_CODE } from "#firebase/constants"

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm()
  const { email, password } = watch({})
  const { loginUser } = useAuth()
  const showToast = useCustomToast()

  const handleLogin = async () => {
    try {
      await loginUser(email, password)

      reset()

      navigate("/dashboard")

      showToast("User successfully logged in", "success", 3, "Welcome!")
    } catch (error) {
      if (
        error.code === FIREBASE_AUTH_ERROR_CODE.WRONG_PASSWORD ||
        error.code === FIREBASE_AUTH_ERROR_CODE.INVALID_EMAIL ||
        error.code === FIREBASE_AUTH_ERROR_CODE.USER_NOT_FOUND
      ) {
        showToast(
          "User credentials error",
          "error",
          3,
          "Incorrect email/password. Please try again"
        )
      }
    }
  }

  const showMyPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <Flex as="main" justify="center" align="center" minH="100vh">
      <Card title="Login">
        <Heading mb="30px" as="h1" align="center">
          Login
        </Heading>
        <FormControl
          isRequired
          as="form"
          mb="20px"
          onSubmit={handleSubmit(handleLogin)}
          noValidate
        >
          <Stack spacing={5}>
            <FormControl isInvalid={errors.email}>
              <Input
                id="form_email"
                type="email"
                placeholder="Email"
                isInvalid={errors.email}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please, provide an e-mail"
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/u,
                    message: "Invalid e-mail"
                  }
                })}
              />
              {errors.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="form_password"
                  placeholder="Password"
                  autoComplete="off"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Please, provide a password"
                    }
                  })}
                />

                <InputRightElement
                  onClick={() => showMyPassword()}
                  userSelect="none"
                  cursor="pointer"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
            </FormControl>

            <Button colorScheme="blue" type="submit">
              Login
            </Button>
            <Link as={ReachLink} to="/register" align="center">
              Don&apos;t have an account?
            </Link>
          </Stack>
        </FormControl>
      </Card>
    </Flex>
  )
}

export default Login
