import {
  isNotEmptyString,
  isArray,
  getSchema,
  getFormData,
  include,
  isPlainObject,
} from "../helper";
import types from "./types";
// import StoreConf from './StoreConf'
// const Vuex = require("vuex");
import Vuex from "vuex";
export default class Store {
  constructor(option) {
    this.$$store = {};
    this.$$types = Object.assign({}, types);
    this.$$init(option);
  }
  $$init(option) {
    this.$$store = new Vuex.Store(
      // new StoreConf({
      //   Rule: option.Rule || Rule,
      // })
      {}
    );
  }
  initWidgets(widgets) {
    if (!isArray(widgets)) {
      return console.warn("widgets should be type of array");
    }

    this.$$store.commit(this.$$types.$WIDGETS_SET, { widgets });
  }
}
