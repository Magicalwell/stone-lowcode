// import {
//   isNotEmptyString,
//   isArray,
//   getSchema,
//   getFormData,
//   include,
//   isPlainObject,
// } from "../helper";
import { isArray, isPlainObject } from "../helper";
import types from "./types";
// import StoreConf from './StoreConf'
// const Vuex = require("vuex");
import Vuex from "vuex";
export interface StoreOptions {
  element: Element;
}
export default class Store {
  $$store: any;
  $$types: any;
  constructor(option: Partial<StoreOptions> = {}) {
    this.$$store = {};
    this.$$types = Object.assign({}, types);
    this.$$init(option);
  }
  public $$init(option: Partial<StoreOptions>): void {
    this.$$store = new Vuex.Store(
      // new StoreConf({
      //   Rule: option.Rule || Rule,
      // })
      {}
    );
  }
  public initWidgets(widgets: any) {
    if (!isArray(widgets)) {
      return console.warn("widgets should be type of array");
    }

    this.$$store.commit(this.$$types.$WIDGETS_SET, { widgets });
  }
}
