import Vue, { createApp, h } from "vue";
import Vuex from "vuex";
import { isArray, isFunction, isPlainObject, usePlugins } from "../helper";
import Rule from "../rule";
import Store from "../store";
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
      callPlugin,
    } = option;
    this.el = el;
    this.mode = mode || "edit";
    this.$$origin = null;
    this.store = null;
    // 优先自定义组件渲染
    this.component = component || null;
    this.callPlugin = callPlugin || (() => 0);
    usePlugins(Vue, [Vuex]);
    this.callPlugin("render", "init", { Vue, ctx: this });
    if (store) {
      this.store = store;
      this.$$origin = this.render();
      this.callPlugin("render", "created", { ctx: this });
    } else {
      this.store = new Store({ Rule: CustomRule || Rule });
      if (isArray(widgets)) {
        this.store.initWidgets(widgets);
        if (isPlainObject(schema)) {
          this.store.initRootSchema(schema);
        }
        this.$$origin = this.render();
        this.callPlugin("render", "created", { ctx: this });
      } else {
        console.error("widgets must be an array");
      }
    }
    this.on = component.on;
    this.off = component.off;
  }
  render(option = {}) {
    const { el, store, mode, component } = this;
    const extension = { store, $render: this, mode: option.mode || mode };
    const root = document.createElement("div");

    el.appendChild(root);
    this.callPlugin("render", "beforeCreate", { ctx: this });
    console.log(component);
    const ins = createApp({
      extension,
      el: root,
      render: () => h(component),
    }).mount(root);
      // 这里createApp出来的是纯净的vue实例，在main里面use(Antd)挂载的组件，这里面没有的，可以在后面.use(antd)
    return ins;
  }
}
