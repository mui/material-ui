import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { TransitionMotion, spring, presets } from 'react-motion';

class AnimatedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { key: 't1', data: { text: 'React' } },
        { key: 't2', data: { text: 'React-Motion' } },
        { key: 't3', data: { text: 'Next Js' } },
      ],
    };
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      key: 't' + Date.now(),
      data: { text: this.state.value },
    };
    this.setState({ todos: [newItem].concat(this.state.todos) });
  };


  getDefaultStyles = () => {
    return this.state.todos.map(todo => ({ ...todo, style: { height: 0, opacity: 1 } }));
  };

  getStyles = () => {
    const { todos, value, selected } = this.state;
    return todos
      .map((todo, i) => {
        return {
          ...todo,
          style: {
            height: spring(60, presets.gentle),
            opacity: spring(1, presets.gentle),
          }
        };
      });
  };

  willEnter() {
    return {
      height: 0,
      opacity: 1,
    };
  };

  willLeave() {
    return {
      height: spring(0),
      opacity: spring(0),
    };
  };

  render() {
    const { todos, value } = this.state;
    return (
      <section>
        <header>

          <Typography type="display1" gutterBottom>
            Todos
          </Typography>

          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Insert Todo"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              value={value}
              onChange={this.handleChange}
              margin="normal"
            />
          </form>
        </header>
        <section>
          <TransitionMotion
            defaultStyles={this.getDefaultStyles()}
            styles={this.getStyles()}
            willLeave={this.willLeave}
            willEnter={this.willEnter}>
            {styles =>
              <List>
                {styles.map(({ key, style, data: { isDone, text } }) =>
                  <ListItem button style={style} key={key}>
                    <ListItemText primary={text} />
                  </ListItem>

                )}
              </List>
            }
          </TransitionMotion>
        </section>
      </section>
    );
  };
}

export default AnimatedList;