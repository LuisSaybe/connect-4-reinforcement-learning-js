import React from "react";

import { Board } from "src/common/Board";

import { Point } from "src/web/point";

import "./style.scss";

export function InteractiveBoard({ game, onColumnClick }) {
  const columns = [];

  for (let columnIndex = 0; columnIndex < game.getColumns(); columnIndex++) {
    const column = [];

    for (let rowIndex = game.getRows() - 1; rowIndex > -1; rowIndex--) {
      const color = game.get(rowIndex, columnIndex);
      let colorName = "";

      if (color === Board.RED) {
        colorName = "red";
      } else if (color === Board.YELLOW) {
        colorName = "yellow";
      }

      column.push(
        <div key={`${columnIndex}-${rowIndex}`} styleName="point-container">
          <Point color={colorName} />
        </div>,
      );
    }

    columns.push(
      <button
        styleName="column"
        onClick={() => onColumnClick(columnIndex)}
        key={columnIndex}
      >
        {column}
      </button>,
    );
  }

  return <div styleName="interactive-board">{columns}</div>;
}
