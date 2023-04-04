import React, { Component, ReactNode } from "react";

import classes from "./FilterColorForm.module.scss";

interface FilterColorFormProps {
  onFilterColors: () => void;
}

interface ColorFilter {
  red: boolean;
  green: boolean;
  blue: boolean;
  saturation: boolean;
}

interface FilterColorState extends ColorFilter {}

class FilterColorForm extends Component<
  FilterColorFormProps,
  FilterColorState
> {
  constructor(props: FilterColorFormProps) {
    super(props);
    this.state = {
      red: false,
      green: false,
      blue: false,
      saturation: false,
    };
  }

  componentDidUpdate(
    prevProps: Readonly<FilterColorFormProps>,
    prevState: Readonly<FilterColorState>,
    snapshot?: any
  ): void {
    console.log(this.state);
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const value = target.checked;

    this.setState({
      [name]: value,
    } as Pick<FilterColorState, keyof FilterColorState>);
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onFilterColors(); // this.props.onFilterColors(this.state)
  };

  render(): ReactNode {
    return (
      <>
        <form className={classes.filtersForm} onSubmit={this.handleSubmit}>
          <h2>Filter Colors</h2>
          <div>
            <div className={classes.container}>
              <input
                type="checkbox"
                name="red"
                checked={this.state.red}
                onChange={this.handleInputChange}
                id="red"
              />
              <label htmlFor="red">Red {">"} 50%</label>
            </div>
            <div className={classes.container}>
              <input
                id="green"
                type="checkbox"
                name="green"
                checked={this.state.green}
                onChange={this.handleInputChange}
              />
              <label htmlFor="green">Green {">"} 50%</label>
            </div>
            <div className={classes.container}>
              <input
                type="checkbox"
                name="blue"
                checked={this.state.blue}
                onChange={this.handleInputChange}
                id="blue"
              />
              <label htmlFor="blue">Blue {">"} 50%</label>
            </div>
            <div className={classes.container}>
              <input
                id="saturation"
                type="checkbox"
                name="saturation"
                checked={this.state.saturation}
                onChange={this.handleInputChange}
              />
              <label htmlFor="saturation">Saturation {">"} 50%</label>
            </div>
          </div>
          <button type="submit">Filter</button>
        </form>
      </>
    );
  }
}

export default FilterColorForm;
