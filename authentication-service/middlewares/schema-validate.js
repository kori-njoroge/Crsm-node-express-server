module.exports = {
    SchemaValidateMiddleware: async (req, res, next, schema) => {
        try {
            let data = await schema.validateAsync(req.body, { abortEarly: false });
            if (data) {
                next();
            }
        } catch (error) {
            res.status(400).json(error.details?.map(err => err.message));
        }
    }
}