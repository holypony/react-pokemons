import React from "react";

export const BackgroundComponent = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}): JSX.Element => {
  return <div className="rootStyle">{children}</div>;
};

export default BackgroundComponent;
