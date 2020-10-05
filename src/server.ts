import http from "http";
import express from "express";
import { compute } from "./compute";

const app = express();

app.use(express.json());

app.post("/compute", (request, response) => {
  const game = request.body.game;
  // TODO: Validate input
  
  const score = compute(game);
console.log(score)
  // TODO: Return response
});

export const createServer = () => http.createServer(app);
