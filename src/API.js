// const webhoseio = require("webhoseio");
import webhoseio from "webhoseio";
import react from "react";

const client = webhoseio.config({
  token: "f28deb4c-502f-4eb3-a7ee-080c94333eb6"
});
let d = new Date();

export default {
  getItems: function(stuff) {
    return client.query("productFilter", {
      // q: "name:jackets last_changed:>1523862000000"
      q: `name:${stuff} last_changed:>${d.setDate(d.getDate() - 1)}`
    });
  }
};
