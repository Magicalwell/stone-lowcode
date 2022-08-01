import types from "../types";
export default {
  [types.$WIDGETS_SET](state, { widgets }) {
    state.widgets = widgets;
  },
};
