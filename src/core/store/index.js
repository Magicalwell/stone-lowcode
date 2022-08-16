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
  initWidgets(widgets) {
    if (!isArray(widgets)) {
      return console.warn("widgets should be type of array");
    }
    this.$$store.commit(this.$$types.$WIDGETS_SET, { widgets });
  }
  getSchema() {
    const { rootSchema, store } = this.$$store.state;
    return getSchema(rootSchema, store);
  }
  getRootSchema() {
    return this.$$store.state.rootSchema;
  }
  initRootSchema(rootSchema) {
    this.$$store.commit(this.$$types.$ROOT_SCHEMA_SET, { rootSchema });
  }
  getFlatWidgets() {
    return this.$$store.getters.flatWidgets;
  }
  getTab() {
    return this.$$store.state.tab;
  }
  updateTab(tab) {
    if (!isNotEmptyString(tab)) {
      return;
    }

    this.$$store.commit(this.$$types.$TAB_UPDATE, { tab });
  }
  getSettingWidget() {
    return this.$$store.getters.settingWidget;
  }
  isSelected() {
    return this.$$store.getters.isSelected;
  }
  getState() {
    return this.$$store.state;
  }
  selectWidget(key) {
    if (!isNotEmptyString(key)) {
      return;
    }
    this.$$store.commit(this.$$types.$WIDGET_SELECT, { key });
  }
  getSelectedSchema() {
    return this.$$store.state.selectedSchema;
  }
  getModel(option) {
    console.log(option, "--------------------------");
    if (!option) {
      return this.$$store.state.model;
    }
    if (typeof option === "string") {
      return this.$$store.state.model[option];
    }
  }
  updateModel(model = {}, useName = false) {
    console.log(model);
    this.$$store.commit(this.$$types.$MODEL_SET, { model, useName });
  }
}
