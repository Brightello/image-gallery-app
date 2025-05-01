import { Input as ChakraInput, InputGroup } from "@chakra-ui/react"

function Input({ placeholder, value, fontSize }) {
  return (
    <InputGroup>
      <ChakraInput
        placeholder={placeholder}
        fontSize={fontSize}
        value={value}
        _hover={{
          opacity: "0.8"
        }}
        _focus={{ boxShadow: "none" }}
        borderRadius="md"
        border="none"
        px="4"
      />
    </InputGroup>
  )
}
export default Input
