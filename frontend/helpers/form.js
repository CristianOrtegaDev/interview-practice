export function hasSpecialCharacter(inputString) {
    const specialCharacterRegex = /[^A-Za-z0-9]/;
    return specialCharacterRegex.test(inputString);
}

// Mock functions to simulate server responses
export function postResolved(body, ms = 2000) {
    return new Promise(resolve => setTimeout(() => resolve({ status: 201, message: 'User created' }), ms));
}

export function postRejected(body, ms = 1000) {
    return new Promise((resolve, reject) => setTimeout(() => reject({ status: 500, message: 'Error in user creation. Try Again' }), ms));
}

