import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

import { Game } from "src/common/Game";
import { Board } from "src/common/Board";
import { Environment } from "src/common/Environment";
import { InteractiveBoard } from "src/web/interactive-board";
import { Point } from "src/web/point";

import "./style.scss";

export function PolicyGame() {
  const [policy, setPolicy] = useState(null);
  const [game, setGame] = useState(null);
  const [winner, setWinner] = useState(null);
  const [humanColor, setHumanColor] = useState(Board.RED);

  useEffect(() => {
    tf.loadLayersModel(
      "https://luissaybe.nyc3.digitaloceanspaces.com/connect-4-js/model.json",
    ).then((nextPolicy) => {
      setPolicy(nextPolicy);
      setGame(new Game(humanColor, 4));
    });
  }, []);

  const getPolicyAction = (game) => {
    const state = Environment.serializeWithAgentColor(game, game.getTurn());
    const tensor = tf.oneHot([state], 3);
    const result = policy.predict(tensor);
    const actionValues = Array.from(result.dataSync())
      .map((value, action) => ({
        value,
        action,
      }))
      .filter((actionValue) =>
        game.getAvailableActions().includes(actionValue.action),
      )
      .sort((a, b) => (b.value as number) - (a.value as number));
    result.dispose();

    return actionValues[0].action;
  };

  const onColumnClick = (column) => {
    const currentTurn = game.getTurn();
    game.drop(column, game.getTurn());

    if (game.hasWinner()) {
      setGame(game.clone());
      setWinner(currentTurn);
      return;
    }

    const action = getPolicyAction(game);
    const opponentColor = game.getTurn();
    game.drop(action, opponentColor);

    if (game.hasWinner()) {
      setGame(game.clone());
      setWinner(opponentColor);
      return;
    }

    setGame(game.clone());
  };

  const onReset = (policyStarts) => {
    const startingColor = policyStarts
      ? Board.oppositeColor(humanColor)
      : humanColor;
    const game = new Game(startingColor, 4);

    if (policyStarts) {
      const action = getPolicyAction(game);
      game.drop(action, game.getTurn());
    }

    setGame(game);
    setWinner(null);
    setHumanColor(Board.RED);
  };

  return (
    <div styleName="root">
      {!policy && <span>loading...</span>}
      {game && (
        <InteractiveBoard
          game={game}
          onColumnClick={(column) => onColumnClick(column)}
        />
      )}
      <div styleName="resets">
        <button onClick={() => onReset(false)}>reset</button>
        <button onClick={() => onReset(true)}>computer starts game</button>
      </div>
      {winner !== null && (
        <>
          <div>winner !</div>
          <Point color={Board.RED === winner ? "red" : "yellow"} />
        </>
      )}
    </div>
  );
}
