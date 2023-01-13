import classNames from "classnames";

import styles from "./Callout.module.scss";

interface CalloutProps {
  className?: string;
  variant?: "yellow" | "red" | "blue" | "blueBold";
}

export const Callout: React.FC<React.PropsWithChildren<CalloutProps>> = ({
  children,
  className,

  variant = "yellow",
}) => {
  const containerStyles = classNames(styles.container, className, {
    [styles.yellow]: variant === "yellow",
    [styles.red]: variant === "red",
    [styles.blue]: variant === "blue",
    [styles.blueBold]: variant === "blueBold",
  });

  return <div className={containerStyles}>{children}</div>;
};
