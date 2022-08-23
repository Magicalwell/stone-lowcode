import { markRaw } from "vue";
import View from "./View";
import Setting from "./Setting";
import Schema from "./Schema";
const gridWidget = {
  View: markRaw(View),
  Setting,
  Schema,
};
export default gridWidget;
