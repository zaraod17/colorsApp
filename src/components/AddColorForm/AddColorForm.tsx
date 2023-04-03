import { ChangeEvent, FormEvent, useState } from "react";

import classes from "./AddColorForm.module.scss";

interface AddColorFormProps {
  onAddColor: (color: string) => void;
}

const AddColorForm: React.FC<AddColorFormProps> = ({ onAddColor }) => {
  const [color, setColor] = useState("");

  const colorRegexPattern = /^#[0-9A-F]{0,6}$/i;

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (colorRegexPattern.test(color)) {
      alert("Please enter a valid HEX");
      return;
    }
    onAddColor(color.toUpperCase());
    setColor("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    if (colorRegexPattern.test(value)) {
      setColor(value.toUpperCase());
    }
  };

  return (
    <div className={classes.addColor}>
      <h4>Adding color</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="colorInput">Color:</label>
        <input
          id="colorInput"
          type="text"
          value={color}
          onChange={handleChange}
          maxLength={7}
          placeholder="#FFFFFF"
          required
        />
        <button type="submit">Add Color</button>
      </form>
    </div>
  );
};

export default AddColorForm;
