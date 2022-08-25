import { markRaw } from "vue";
import View from "./View";
import Setting from "./Setting";
import Schema from "./Schema";
const tableWidget = {
  View: markRaw(View),
  Setting,
  Schema,
};
export default tableWidget;
