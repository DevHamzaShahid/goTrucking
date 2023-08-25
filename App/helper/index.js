export const isValidEmail = (email) => {
    const emailRegex = /^[a-z0-9._-][a-z0-9._-]*@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailRegex.test(email);
}

export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\-_=|\\]{8,}$/;
    return passwordRegex.test(password);
}

