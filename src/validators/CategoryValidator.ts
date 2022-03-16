import Joi from 'joi';

const CategoryValidator = Joi.object().keys({
  name: Joi.string().alphanum().min(3).lowercase().max(20).required(),
});

export default CategoryValidator;
