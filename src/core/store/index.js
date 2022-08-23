// import {
//   isNotEmptyString,
//   isArray,
//   getSchema,
//   getFormData,
//   include,
//   isPlainObject,
// } from "../helper";
import { isArray, isPlainObject, getSchema, isNotEmptyString } from "../helper";
import types from "./types";
import StoreConf from "./StoreConf";
import Rule from "../rule";
// const Vuex = require("vuex");
import Vuex from "vuex";
// 这里就做两件事 new一个vuex并挂载到自己的身上
export default class Store {
  constructor(option = {}) {
    this.$$store = {};
    this.$$types = Object.assign({}, types);
    this.$$init(option);
  }
  $$init(option) {
    this.$$store = new Vuex.Store(
      new StoreConf({
        Rule: option.Rule || Rule,
      })
    );
  }
  // 将传入进来的自定义的widgets注册在state上
  initWidgets(widgets) {
    if (!isArray(widgets)) {
      return console.warn("widgets should be type of array");
    }
    this.$$store.commit(this.$$types.$WIDGETS_SET, { widgets });
  }
  getSchema() {
    // 获取state中的schema  合并数据来源
    const { rootSchema, store } = this.$$store.state;
    return getSchema(rootSchema, store);
  }
  getRootSchema() {
    return this.$$store.state.rootSchema;
  }
  // 初始化的时候如果有传入schema，则调用这个方法格式化传入进来的
  initRootSchema(rootSchema) {
    this.$$store.commit(this.$$types.$ROOT_SCHEMA_SET, { rootSchema });
  }
  // 获得拍平后的widgets list的引用
  getFlatWidgets() {
    return this.$$store.getters.flatWidgets;
  }
  // design和view模式的标志
  getTab() {
    return this.$$store.state.tab;
  }
  // 切换模式
  updateTab(tab) {
    if (!isNotEmptyString(tab)) {
      return;
    }

    this.$$store.commit(this.$$types.$TAB_UPDATE, { tab });
  }
  // 通过select的widgets的key，去上面的flatwidgets中获取到widgets的setting
  getSettingWidget() {
    return this.$$store.getters.settingWidget;
  }
  // 获取styles的模板
  getStylesWidget() {
    return this.$$store.getters.styleWidget;
  }
  // 是否有选中的widgets
  isSelected() {
    return this.$$store.getters.isSelected;
  }
  // 获取整个state
  getState() {
    return this.$$store.state;
  }
  // 选中某一个widgets，传入key判断flatwidgets中是否注册，是否选中了同一个，然后更新slectSchema
  selectWidget(key) {
    if (!isNotEmptyString(key)) {
      return;
    }
    this.$$store.commit(this.$$types.$WIDGET_SELECT, { key });
  }
  // 获得被选中的schema结构
  getSelectedSchema() {
    return this.$$store.state.selectedSchema;
  }
  // 在state中，根据每个widgets的key获取绑定的值
  getModel(option) {
    if (!option) {
      return this.$$store.state.model;
    }
    if (typeof option === "string") {
      return this.$$store.state.model[option];
    }
  }
  // 根据key:value设置用户的值
  updateModel(model = {}, useName = false) {
    this.$$store.commit(this.$$types.$MODEL_SET, { model, useName });
  }
  copyWidget(key) {
    if (!isNotEmptyString(key)) {
      return;
    }

    this.$$store.commit(this.$$types.$WIDGET_COPY, { key });
  }
  // 用于获取state中的widgets数组
  getWidgets() {
    return this.$$store.state.widgets;
  }
  // 新增widgets
  addWidget(widget) {
    if (!isNotEmptyString(widget)) {
      if (isPlainObject(widget) && isNotEmptyString(widget.widget)) {
        this.$$store.commit(this.$$types.$WIDGET_ADD, {
          widget: null,
          schema: widget,
        });
      } else {
        return console.warn(
          "widget should be a non-empty string or schema object"
        );
      }
    } else {
      this.$$store.commit(this.$$types.$WIDGET_ADD, { widget, schema: null });
    }
  }
  // 返回被拍平的schema
  getFlatSchemas() {
    return this.$$store.state.flatSchemas;
  }
}
