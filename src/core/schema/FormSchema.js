import Schema from "./BaseSchema";
import { setKeyAndName, updateRequiredRule, getSchemaType } from "../helper";

export default class FormSchema extends Schema {
  constructor(props) {
    const { schema, widgets = {} } = props || {};
    super();
    this.name = "";
    this.type = getSchemaType(schema, new.target);
    this.label = "";
    this.description = "";
    this.labelOptions = {
      width: "80px",
      "text-align": "left",
      hidden: false,
    };
    this.help = "";
    this.disabled = false;
    this.rules = [
      {
        required: false,
        message: "必填",
        type: "string",
        trigger: "blur",
      },
    ];
    this.create(props);

    if (widgets[this.widget]) {
      updateRequiredRule(this, widgets[this.widget].Schema);
    }
  }

  // over write the base Schema method
  create(props) {
    const { clone, dynamic, flatSchemas } = props || {};
    Schema.prototype.create.call(this, props);
    setKeyAndName(this, clone, dynamic, flatSchemas);
  }

  updateRequiredRule(rule, Schema) {
    updateRequiredRule(this, Schema, rule);
  }
}
