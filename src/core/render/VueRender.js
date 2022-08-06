import Vue from 'vue'
import Vuex from 'vuex'
import {
  isArray,
  isFunction,
  isPlainObject,
  usePlugins
} from '../helper'
export default class Render {
  constructor(option) {
    const {
      el,
      store,
      widgets = [],
      mode,
      schema,
      component,
      Rule: CustomRule,
      callPlugin
    } = option
    this.el = el
    this.mode = mode || 'edit'
    this.$$origin = null
    this.store = null
    // 优先自定义组件渲染
    this.component = component || null
    this.callPlugin = callPlugin || (() => 0)
    usePlugins(Vue, [Vuex])
    console.log(9999);
  }
}