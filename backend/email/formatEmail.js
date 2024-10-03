const passwordReset = (resetLink, emailTo) => {

    return {
        Destination: {
            ToAddresses: [emailTo]
        },
        Message: {
            Body: {
                Text: {
                    Data: 'Reset Link: ' + resetLink
                }
            },
            Subject: {
                Data: 'Unibuds Password Reset URL'
            }
        },
        Source: 'adrianjohn.developer@gmail.com'
    };
} 


module.exports = { passwordReset };