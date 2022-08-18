// export { default as View } from "./View";
// export { default as Setting } from "./Setting";
// export { default as Schema } from "./Schema";
import { markRaw } from "vue";
import View from "./View";
import Setting from "./Setting";
import Schema from "./Schema";
const inputWidget = {
  View: markRaw(View),
  Setting,
  Schema,
};
export default inputWidget;
