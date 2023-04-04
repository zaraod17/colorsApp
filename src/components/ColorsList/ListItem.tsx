import classes from "./ColorList.module.scss";
import { CSSProperties, ReactNode } from "react";

interface StyleProps extends CSSProperties {
  "--color"?: string;
}

const ListItem: React.FC<{ hex: string; children: ReactNode }> = ({
  hex,
  children,
}) => {
  return (
    <>
      <li key={hex}>
        <div className={classes.boxWrapper}>
          <div
            className={classes.colorRect}
            style={{ "--color": hex } as StyleProps}
          ></div>

          {children}
        </div>
        <span>{hex.toUpperCase()}</span>
      </li>
    </>
  );
};

export default ListItem;
