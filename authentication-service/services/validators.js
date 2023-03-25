const createValidator = (schema) => (data) => {
    const { error, value } = schema.validate(data, { abortEarly: false });
    if (error) {
        throw new Error(`${error.message}`);
    } else {
        return value;
    }
};
module.exports = createValidator;

