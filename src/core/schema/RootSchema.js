// import Schema from "./base/grid/Schema";

/**
 * root schema
 */
import Schema from './base/grid/Schema'
export default class RootSchema extends Schema {
  constructor() {
    super()
    this.title = "";
    this.description = "";
    this.size = "default";
    this.container = true;
    this.children = [
      {
        span: 24,
        list: [],
      },
    ];
    this.logics = [];
    // global setting for label
    this.label = {
      width: 80,
      position: "right",
      colon: false,
    };
    this.store = {
      dicts: [],
    };
    this.style = {
      "margin-right": "auto",
      "margin-left": "auto",
      background: [],
      container: {
        "background-color": "",
        background: [],
      },
    };
    console.log(this);
    // this.create(props);
    // this.createChildren(props);
  }
}
