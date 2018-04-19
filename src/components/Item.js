import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { Button, Icon } from "semantic-ui-react";

class Item extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func
  };
  render() {
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === "available";
    return (
      <li className="menu-item">
        <img src={image} alt={name} />
        <h3 className="item-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <Button
          animated="vertical"
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(this.props.index)}
        >
          <Button.Content hidden>
            {isAvailable ? "Add To Order" : "Sold Out!"}
          </Button.Content>
          <Button.Content visible>
            <Icon ClassName="shop" />
          </Button.Content>
        </Button>
        {/* <button
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(this.props.index)}
        >
          {isAvailable ? "Add To Order" : "Sold Out!"}
        </button> */}
      </li>
    );
  }
}

export default Item;
