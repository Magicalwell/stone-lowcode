import * as _setting from "./setting";
export const setting = _setting;
export { default as viewExtend } from "./extends/view";
export { default as entry } from "./entery/index.vue";
import inputWidget from "./widgets/input";
// export const textareaWidget = require("./widgets/textarea");
// export const textWidget = require("./widgets/text");
// export const inputNumberWidget = require("./widgets/inputNumber");
// export const selectWidget = require("./widgets/select");
// export const cascaderWidget = require("./widgets/cascader");
// export const autoCompleteWidget = require("./widgets/autoComplete");
import radioWidget from "./widgets/radio";
// export const checkboxWidget = require("./widgets/checkbox");
// export const datePickerWidget = require("./widgets/datePicker");
// export const timePickerWidget = require("./widgets/timePicker");
// export const switchWidget = require("./widgets/switch");
// export const rateWidget = require("./widgets/rate");
// export const uploadWidget = require("./widgets/upload");
// export const lineWidget = require("./widgets/line");
import tableWidget from './widgets/table'
import gridWidget from "./widgets/grid"
// export const buttonWidget = require("./widgets/button");
export { inputWidget, radioWidget, gridWidget, tableWidget };
export default [
  {
    title: "表单",
    key: "form",
    widgets: [
      inputWidget,
      // textareaWidget,
      // inputNumberWidget,
      // selectWidget,
      // cascaderWidget,
      // autoCompleteWidget,
      radioWidget,
      // checkboxWidget,
      // datePickerWidget,
      // timePickerWidget,
      // switchWidget,
      // rateWidget,
      // uploadWidget,
      // buttonWidget,
    ],
  },
  {
    title: "展示",
    key: "display",
    widgets: [
      tableWidget,
    ],
  },
  {
    title: "布局容器",
    key: "layout",
    widgets: [gridWidget],
  },
];
