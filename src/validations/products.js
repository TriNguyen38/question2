import Joi from "joi";

const productsValidator = Joi.object({
    id: Joi.number().integer(),
    sku: Joi.string().min(3).max(256).required(),
    price: Joi.number(),
    description: Joi.string(),
    instock: Joi.number().integer()
});

export default productsValidator;