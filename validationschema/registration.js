const registrationData = {
    type: 'object',
    properties: {
        username: { 
            type: 'string', 
            minLength: 3,
            maxLength: 40,
        },
        name: { 
            type: 'string', 
            minLength: 3,
            maxLength: 40, 
        },
        surname: { 
            type: 'string', 
            minLength: 3,
            maxLength: 40, 
        },
        email: { 
            type: 'string', 
            minLength: 7,
            maxLength: 40, 
        },
        phone: { 
            type: 'string',
            minLength: 9,
            maxLength: 15,
        },
        password: {
            type: 'string',
            minLength: 5,
            maxLength: 30, 
        }
    },
    required: ['username', 'name'],
}

module.exports = registrationData;

