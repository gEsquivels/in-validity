const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const Route = express.Router();

const UserController = require('./app/controllers/UserController');
const StoreController = require('./app/controllers/StoreController');
const ProductController = require('./app/controllers/ProductController');
const SessionController = require('./app/controllers/SessionController');
const PasswordController = require('./app/controllers/PasswordController');

const Authenticate =  require('./app/middlewares/auth');

Route.post('/login', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
}), SessionController.create);

Route.post('/forgot-password', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    newPassword: Joi.string().required()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), Authenticate, PasswordController.forgot);

Route.get('/user', UserController.view);
Route.post('/user', celebrate({
  [Segments.BODY]: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  })
}), UserController.create);

Route.get('/store', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), Authenticate, StoreController.view);
Route.post('/store', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), Authenticate, StoreController.crate);
Route.delete('/store/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().required()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), Authenticate, StoreController.delete);

Route.get('/product', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), Authenticate, ProductController.view);
Route.post('/product', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
	  description: Joi.string(),
	  validity: Joi.string(),
	  price: Joi.number().required(),
	  status: Joi.string().required(),
	  lot: Joi.number(),
	  type_id: Joi.number(),
	  store_id: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), Authenticate, ProductController.create);
Route.put('/product/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), Authenticate, ProductController.update);
Route.delete('/product/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().required()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), Authenticate, ProductController.delete);


module.exports = Route;
