export default function handleError(setError, errors) {
    if (errors.response.data.errors) {
        const errorData = errors.response.data.errors;
        console.log(errorData)
        for (var error in errorData) {
            const errorsValue = errorData[error];

            errorsValue.map(e => {
                setError(error, {
                    type: "manual",
                    message: e
                })
            })
        }

    }
}