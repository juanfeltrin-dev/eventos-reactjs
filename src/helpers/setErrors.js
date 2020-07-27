export default function setErrors(setError, errors) {
    for (var error in errors) {
        const errorArray = errors[error];

        errorArray.map(e => {
            setError(error, {
                type: "manual",
                message: e
            })
        })
    }
}