// import Schema from "./base/grid/Schema";

/**
 * root schema
 */
import Schema from "./base/grid/Schema";
export default class RootSchema extends Schema {
  constructor(props) {
    super();
    this.title = "这是一个新的页面";
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
      title: {
        padding: "10px",
        "border-bottom": "1px dashed #aaa",
      },
      "font-size": 0,
    };
    this.create(props);
    this.createChildren(props);
  }
}
