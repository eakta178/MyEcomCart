import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";
import API from "../API";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
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

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
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

  addFish = fish => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. Update that state
    console.log(updatedFish);
    fishes[key] = updatedFish;
    // 3. Set that to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // 1. take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. update the state
    fishes[key] = null;
    // 3.  update state
    this.setState({ fishes });
  };

  // loadSampleFishes = () => {
  //   this.setState({ fishes: sampleFishes });
  // };

  loadSampleFishes = event => {
    const fishes = { ...this.state.fishes };
    const name = { ...this.state.name };
    const price = { ...this.state.price };
    const desc = { ...this.state.desc };
    const image = { ...this.state.image };
    const status = { ...this.state.status };
    event.preventDefault();

    API.getItems()
      .then(res => {
        let data = res["products"];
        //let newFish = {}
        console.log(data);
        for (let i = 1; i < 20; i++) {
          if (data[i]["images"].length > 0) {
            fishes[`fish${i}`] = {
              name: data[i]["name"],
              price: data[i]["price"] * 100,
              desc: data[i]["description"],
              image: data[i]["images"][0],
              status: "available"
            };
          }
        }

        this.setState({
          fishes: fishes
          // name: name,
          // price,
          // desc,
          // status,
          // image
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
          <Header tagline="Shop till you drop!!!" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
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
