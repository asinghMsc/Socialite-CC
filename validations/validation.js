const joi = require('joi')

//register validation
const registerValidation = (data) => {
    const schema_validation = joi.object({
        username: joi.string().min(4).max(255).required(),
        email: joi.string().min(6).max(255).required().email(),
        password: joi.string().required().min(6).max(1024)

    })
    return schema_validation.validate(data)
}

const login_validation = (data) => {
    const schema_validation = joi.object({
        email: joi.string().min(6).max(255).required().email(),
        password: joi.string().required().min(6).max(1024)

    })
    return schema_validation.validate(data)
}

const post_validation = (data) => {
    const schema_validation = joi.object({
        title: joi.string().min(4).max(255).required(),
        description: joi.string().min(6).max(1024).required()

    })
    return schema_validation.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.login_validation = login_validation
module.exports.post_validation = post_validation