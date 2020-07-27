import setErrors from './setErrors';

export default async function handleDataPost(formData, setError, endPoint) {
    const response = await fetch('http://127.0.0.1:8000/api/' + endPoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    const data = await response.json();
    
    setErrors(setError, data.errors);
}