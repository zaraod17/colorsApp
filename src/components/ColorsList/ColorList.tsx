import classes from "./ColorList.module.scss";
import ListItem from "./ListItem";

interface ColorListProps {
  colors: { id: string; hex: string }[];
  onRemoveColor: (color: { id: string; hex: string }) => void;
}

const ColorList: React.FC<ColorListProps> = ({ colors, onRemoveColor }) => {
  return (
    <div className={classes.listWrapper}>
      <ul>
        {colors.map(({ id, hex }) => (
          <ListItem key={Math.random().toString()} hex={hex}>
            {id.includes("#") ? (
              <button
                onClick={() => onRemoveColor({ id, hex })}
                type="button"
              >
                <span>&times;</span>
              </button>
            ) : (
              <div></div>
            )}
          </ListItem>
        ))}
      </ul>
    </div>
  );
};

export default ColorList;
