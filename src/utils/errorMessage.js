const getErrorMessage = (errors) => {

        let errorMessages = [];
        (Object.values(errors).forEach((error) =>{
         errorMessages.push(error.message)
        }))
        return  errorMessages;


};

export default getErrorMessage;
