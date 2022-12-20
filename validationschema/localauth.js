const authorization = {
    type: 'object',
    properties: {
        username: { 
            type: 'string', 
            minLength: 3,
            maxLength: 40,
        },
        password: { 
            type: 'string',
            minLength: 5,
            maxLength: 30, 
        },
    },
    required: ['username', 'password'],
}

module.exports = authorization;