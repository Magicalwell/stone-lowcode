import types from "../types";
export default {
  [types.$WIDGETS_SET](state, { widgets }) {
    state.widgets = widgets;
  },
  [types.$WIDGET_SELECT](state, { key }) {
    const schema = state.flatSchemas[key];
    const isSameWidget = state.selectedSchema.key === key;

    if (state.tab !== "design" || isSameWidget || !schema) {
      return;
    }
    console.log(schema, state.selectedSchema);
    state.selectedSchema = schema;
  },
};
