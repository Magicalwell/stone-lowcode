import types from "../types";
import { getParentListByKey, getRootSchemaChildren } from "../../helper";
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
    state.selectedSchema = schema;
  },
  [types.$WIDGET_ADD](state, { widget, schema }) {
    const { selectedSchema, rootSchema, flatSchemas } = state;
    const { flatWidgets, isSelected } = this.getters;
    const wid = widget || schema.widget;
    const WidgetSchema = flatWidgets[wid].Schema;
    // if (!isFunction(WidgetSchema)) {
    //   return console.error("Schema should be a constructor");
    // }

    let childrenSchema = [];
    // 根据传入的完整schema添加，需额外配置args参数  默认新增的在最后，但拖拽的需要调用其他方法
    const args = !widget && schema ? { clone: true, schema, flatSchemas } : {};
    const newSchema = new WidgetSchema({ widgets: flatWidgets, ...args });

    // if (isSelected) {
    // 添加到指定容器中需要获取其父元素的引用
    //   childrenSchema = getParentListByKey(selectedSchema.key, rootSchema);
    //   const index = getIndexByKey(selectedSchema.key, childrenSchema);
    //   childrenSchema.splice(index + 1, 0, newSchema);
    // } else {
    //   childrenSchema = getRootSchemaChildren(rootSchema);
    //   childrenSchema.push(newSchema);
    // }
    childrenSchema = getRootSchemaChildren(rootSchema); // 若不往其他容器中添加，则直接获取根元素的json，添加在尾部
    childrenSchema.push(newSchema); // 获得了rootSchema的引用，push相当于往其中添加
    // 更新被拍平的schema结构，因为每个key都会对应一个自己的数据
    this.commit(types.$ROOT_SCHEMA_FLAT, {
      rootSchema: Object.assign({}, rootSchema),
    });
    // this.commit(types.$RULE_INIT, {
    //   rootSchema: Object.assign({}, rootSchema),
    // });

    // const type = getWidgetType(flatWidgets, newSchema.widget);
    // const model = getWidgetModel(type, newSchema, typeBuilder);
    // this.commit(types.$MODEL_SET, { model });
    state.selectedSchema = newSchema;
  },
};
