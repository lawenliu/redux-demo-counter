import React, { Component, PropTypes } from 'react'
import classes from './counter.scss'

class Counter extends Component {
  constructor (props) {
    super(props)
    this.incrementAsync = this.incrementAsync.bind(this)
    this.incrementIfOdd = this.incrementIfOdd.bind(this)
  }

  incrementIfOdd () {
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement()
    }
  }

  incrementAsync () {
    setTimeout(this.props.onIncrement, 1000)
  }

  render () {
    const { value, onIncrement, onDecrement } = this.props
    return (
      <div className={classes.container}>
        <span className={classes.status}>Current number is : <b>{value}</b></span>
        <div className={classes['button-list']}>
          <div className={classes['button-line']}>
            <button onClick={onIncrement}>+</button>
            <button onClick={onDecrement}>-</button>
          </div>
          <div>
            <button onClick={this.incrementIfOdd}>Increment if odd</button>
            <button onClick={this.incrementAsync}>Increment async</button>
          </div>
        </div>
      </div>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
}

export default Counter
