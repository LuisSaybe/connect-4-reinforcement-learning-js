import React from "react";

import "./style.scss";

interface IInterface extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
}

export function Point(props: IInterface) {
  const { color, ...rest } = props;

  return (
    <div styleName="point-container" {...rest}>
      <div styleName={`point ${color}`}></div>
    </div>
  );
}
