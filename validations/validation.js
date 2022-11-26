//importing library for validation
const joi = require('joi')

//register validation
register_valid = (data) => {
    const schema_valid = joi.object({
        username: joi.string().min(4).max(256).required(),
        email: joi.string().min(6).max(256).required().email(),
        password: joi.string().min(6).max(1024).required()
    })
    return schema_valid.validate(data)
}



//login validation
const login_valid = (data) => {
    const schema_valid = joi.object({
        email: joi.string().min(6).max(255).required().email(),
        password: joi.string().required().min(6).max(1024)

    })
    return schema_valid.validate(data)
}

// post validation
const post_valid = (data) => {
    const schema_valid = joi.object({
        title: joi.string().min(4).max(255).required(),
        description: joi.string().min(6).max(1024).required()

    })
    return schema_valid.validate(data)
}

module.exports.register_valid = register_valid
module.exports.login_valid = login_valid
module.exports.post_valid = post_valid