import http from "http";
import express from "express";
import { compute } from "./compute";
import {
  ContainerTypes,
  ValidatedRequestSchema,
  ValidatedRequest,
  createValidator,
} from "express-joi-validation";

const app = express();
const Joi = require("@hapi/joi");
const validator = createValidator();

const querySchema = Joi.object({
  frame1: Joi.object({
    throw1: Joi.number().integer().min(0).max(10).required(),
    throw2: Joi.number().integer().min(0).max(10).required(),
  }),
  frame2: Joi.object({
    throw1: Joi.number().integer().min(0).max(10).required(),
    throw2: Joi.number().integer().min(0).max(10).required(),
  }),
  frame3: Joi.object({
    throw1: Joi.number().integer().min(0).max(10).required(),
    throw2: Joi.number().integer().min(0).max(10).required(),
  }),
  frame4: Joi.object({
    throw1: Joi.number().integer().min(0).max(10).required(),
    throw2: Joi.number().integer().min(0).max(10).required(),
  }),
  frame5: Joi.object({
    throw1: Joi.number().integer().min(0).max(10).required(),
    throw2: Joi.number().integer().min(0).max(10).required(),
  }),
  frame6: Joi.object({
    throw1: Joi.number().integer().min(0).max(10).required(),
    throw2: Joi.number().integer().min(0).max(10).required(),
  }),
  frame7: Joi.object({
    throw1: Joi.number().integer().min(0).max(10).required(),
    throw2: Joi.number().integer().min(0).max(10).required(),
  }),
  frame8: Joi.object({
    throw1: Joi.number().integer().min(0).max(10).required(),
    throw2: Joi.number().integer().min(0).max(10).required(),
  }),
  frame9: Joi.object({
    throw1: Joi.number().integer().min(0).max(10).required(),
    throw2: Joi.number().integer().min(0).max(10).required(),
  }),
  frame10: Joi.object({
    throw1: Joi.number().integer().min(0).max(10).required(),
    throw2: Joi.number().integer().min(0).max(10).required(),
    throw3: Joi.number().integer().min(0).max(10).required(),
  }),
});

interface RequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    frame1: number[];
    frame2: number[];
    frame3: number[];
    frame4: number[];
    frame5: number[];
    frame6: number[];
    frame7: number[];
    frame8: number[];
    frame9: number[];
    frame10: number[];
  };
}

app.use(express.json());

app.post(
  "/compute",
  validator.query(querySchema),
  (request: ValidatedRequest<RequestSchema>, response) => {
    const game = request.body.game;

    const score = compute(game);
    response.status(200).json({ score: score });
    
  }
);

export const createServer = () => http.createServer(app);
