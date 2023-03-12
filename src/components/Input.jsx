import { Input as ChakraInput, InputGroup, InputLeftElement } from "@chakra-ui/react";
// import {IoSearchOutline} from "react-icons/io"
function Input({placeholder,value}) {
    return (
        <InputGroup>
            {/*<InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.500" />} />*/}
            <ChakraInput
                placeholder={placeholder}
                value={value}
                _hover={{
                    opacity:"0.8"
                }}
                _focus={{ boxShadow: 'none' }}
                borderRadius="md"
                border="none"
                px="4"
            />
        </InputGroup>
    );
}
export default Input;