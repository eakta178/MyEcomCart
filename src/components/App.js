import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Item from "./Item";
import base from "../base";
import API from "../API";

class App extends React.Component {
  state = {
    itemes: {},
    order: {},
    url: "",
    name: "",
    image: "",
    desc: "",
    price: 0,
    status: ""
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/itemes`, {
      context: this,
      state: "itemes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addItem = item => {
    // 1. Take a copy of the existing state
    const itemes = { ...this.state.itemes };
    // 2. Add our new item to that itemes variable
    itemes[`item${Date.now()}`] = item;
    // 3. Set the new itemes object to state
    this.setState({ itemes });
  };

  updateItem = (key, updatedItem) => {
    // 1. Take a copy of the current state
    const itemes = { ...this.state.itemes };
    // 2. Update that state
    console.log(updatedItem);
    itemes[key] = updatedItem;
    // 3. Set that to state
    this.setState({ itemes });
  };

  deleteItem = key => {
    // 1. take a copy of state
    const itemes = { ...this.state.itemes };
    // 2. update the state
    itemes[key] = null;
    // 3.  update state
    this.setState({ itemes });
  };

  // loadSampleItemes = () => {
  //   this.setState({ itemes: sampleItemes });
  // };

  loadSampleItemes = event => {
    const itemes = { ...this.state.itemes };
    const url = { ...this.state.url };
    const name = { ...this.state.name };
    const price = { ...this.state.price };
    const desc = { ...this.state.desc };
    const image = { ...this.state.image };
    const status = { ...this.state.status };

    event.preventDefault();

    API.getItems(this.props.match.params.storeId)
      .then(res => {
        let data = res["products"];
        //let newItem = {}
        console.log(data);
        for (let i = 1; i < 20; i++) {
          if (data[i]["images"].length > 0) {
            itemes[`item${i}`] = {
              url: data[i]["url"],
              name: data[i]["name"],
              price: data[i]["price"] * 100,
              desc: data[i]["description"],
              image: data[i]["images"][0],
              status: "available"
            };
          }
        }

        this.setState({
          itemes: itemes
        });
      })
      .catch(err => console.log(err));
  };

  addToOrder = key => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. Either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({ order });
  };

  removeFromOrder = key => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. remove that itemf from order
    delete order[key];
    // 3. Call setState to update our state object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="It's An Add To Cart Kinda Day!!!" />
          <ul className="itemes">
            {Object.keys(this.state.itemes).map(key => (
              <Item
                key={key}
                index={key}
                details={this.state.itemes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          itemes={this.state.itemes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addItem={this.addItem}
          updateItem={this.updateItem}
          deleteItem={this.deleteItem}
          loadSampleItemes={this.loadSampleItemes}
          itemes={this.state.itemes}
          name={this.state.name}
          desc={this.state.desc}
          price={this.state.price}
          image={this.state.image}
          status={this.state.status}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
