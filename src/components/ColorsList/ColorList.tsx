import classes from "./ColorList.module.scss";
import ListItem from "./ListItem";

interface ColorListProps {
  colors: { hex: string }[];
}

const ColorList: React.FC<ColorListProps> = ({ colors }) => {
  return (
    <div className={classes.listWrapper}>
      <ul>
        {colors.map(({ hex }) => (
          <ListItem key={Math.random().toString()} hex={hex} />
        ))}
      </ul>
    </div>
  );
};

export default ColorList;
