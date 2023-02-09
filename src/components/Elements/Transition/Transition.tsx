import React, { useEffect, useState } from "react";
import classNames from "classnames";

interface Props {
  animationClass: string;
  exit?: boolean;
  children: React.ReactNode;
}

const Transition: React.FC<Props> = ({ animationClass, exit, children }) => {
  const [isActive, setActive] = useState<boolean>();

  useEffect(() => {
    setTimeout(() => setActive(true), 0);
  }, []);

  useEffect(() => {
    if (exit) setActive(false);
  }, [exit]);

  return (
    <div
      className={classNames({
        [`${animationClass}-enter`]: isActive === undefined,
        [`${animationClass}-active`]: isActive === true,
        [`${animationClass}-exit`]: isActive === false,
      })}
    >
      {children}
    </div>
  );
};

export default Transition;
