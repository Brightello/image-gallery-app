import { useToast } from '@chakra-ui/react';

function useCustomToast() {
    const toast = useToast();

    function showToast(title, status, duration, content) {
        toast({
            title,
            status,
            duration: duration * 1000,
            isClosable: true,
            description: content,
            position:"bottom-right",
            colorScheme:"blue"

        });

    }

    return showToast;
}

export default useCustomToast;
