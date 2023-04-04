import classes from "./ColorList.module.scss";
import { CSSProperties } from "react";

interface StyleProps extends CSSProperties {
    '--color'?: string
}

const ListItem: React.FC<{ hex: string }> = ({ hex }) => {
  

  return (
    <li key={hex}>
      <div className={classes.colorRect} style={{'--color': hex} as StyleProps} ></div>
      <span>{hex.toUpperCase()}</span>
    </li>
  );
};

export default ListItem;
