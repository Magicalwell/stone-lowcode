// import Schema from "./base/grid/Schema";

/**
 * root schema
 */
export default class RootSchema {
  constructor() {
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
    console.log(111);
    // this.create(props);
    // this.createChildren(props);
  }
}
