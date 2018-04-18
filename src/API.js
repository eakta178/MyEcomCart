// const webhoseio = require("webhoseio");
import webhoseio from "webhoseio";

const client = webhoseio.config({
  token: "f28deb4c-502f-4eb3-a7ee-080c94333eb6"
});
const query_params = {
  q: "name:jackets last_changed:>1523862000000"
};

export default {
  getItems: function() {
    return client.query("productFilter", query_params);
    //console.log(output["products"][0]["name"]); // Print the name of the product
    //console.log(output["products"][0]["price"]); // Print the price of the product
  }
};
