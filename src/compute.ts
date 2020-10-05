import { Game, Frame, LastFrame } from "./types";

export function compute(game: Game): number {
  return game
    .map((e) =>
      isNormalFrame(e) ? calculateNormal(e, game) : calculateLast(e)
    )
    .reduce((sum: number, score: number) => sum + score, 0);
}

function isNormalFrame(frame: Frame | LastFrame): frame is Frame {
  return frame !== undefined && frame.length == 2;
}

function calculateNormal(frame: Frame, game: Game): number {
  if (isStrike(frame)) {
    return calculateStrike(frame, game);
  } else {
    return isSpare(frame)
      ? 10 + game[game.indexOf(frame) + 1][0]
      : frame.reduce((sum: number, pins: number) => sum + pins, 0);
  }
}

function calculateLast(frame: LastFrame): number {
  return frame.reduce((sum: number, pins: number) => sum + pins, 0);
}

function isStrike(frame: Frame | LastFrame): boolean {
  return frame[0] == 10 ? true : false;
}

function isSpare(frame: Frame | LastFrame): boolean {
  return frame[0] + frame[1] == 10 ? true : false;
}

function calculateStrike(frame: Frame, game: Game): number {
  if (
    isStrike(game[game.indexOf(frame) + 1]) &&
    isNormalFrame(game[game.indexOf(frame) + 2])
  ) {
    return 10 + 10 + game[game.indexOf(frame) + 2][0];
  } else {
    return !isNormalFrame(game[game.indexOf(frame) + 1])
      ? 10 + game[game.indexOf(frame) + 1][0] + game[game.indexOf(frame) + 1][1]
      : 10 +
          game[game.indexOf(frame) + 1][0] +
          game[game.indexOf(frame) + 2][0];
  }
}
