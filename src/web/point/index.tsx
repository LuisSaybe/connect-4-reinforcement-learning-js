import React from "react";

import "./style.scss";

interface IInterface extends React.HTMLAttributes<HTMLDivElement> {
  color: string;
}

export function Point(props: IInterface) {
  const { color, ...rest } = props;
  return <div {...rest} styleName={`point ${color}`}></div>;
}
