import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Step, Button, Icon } from "semantic-ui-react";

class Order extends React.Component {
  static propTypes = {
    itemes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  };
  renderOrder = key => {
    const item = this.props.itemes[key];
    const count = this.props.order[key];
    const isAvailable = item && item.status === "available";
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 500, exit: 500 }
    };
    // Make sure the item is loaded before we continue!
    if (!item) return null;

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {item ? item.name : "item"} is no longer available
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            {item.name}
            {formatPrice(count * item.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
            <Step.Group>
              <Step
                icon="credit card"
                title="Checkout"
                description=""
                href={this.props.itemes[key].url}
                target="_blank"
              />
            </Step.Group>
          </span>
        </li>
      </CSSTransition>
    );
  };
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const item = this.props.itemes[key];
      const count = this.props.order[key];
      const isAvailable = item && item.status === "available";
      if (isAvailable) {
        return prevTotal + count * item.price;
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
        <Button
          classNames="primary"
          animated="vertical"
          disabled={total === 0}
          // onClick={() => addClassName("loading"))}
        >
          <Button.Content hidden>
            {total !== 0
              ? "Select 'checkout' to buy"
              : "Add Items to yor Order"}
          </Button.Content>
          <Button.Content visible>
            <Icon className="payment" />
          </Button.Content>
        </Button>
      </div>
    );
  }
}

export default Order;
