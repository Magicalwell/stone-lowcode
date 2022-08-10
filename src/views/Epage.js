import { createApp, h } from "vue";
import Vue from "vue";
import { hook, helper, Rule, Store } from "../core";
import Editor from "./index.vue";
import Vuex from "vuex";
// const { isArray, isFunction, usePlugins, isPlainObject } = helper;
const { isArray, isPlainObject, usePlugins } = helper;

const defaultView = (t) =>
  Object.assign(
    {
      component: null,
      widgets: [],
      Render: null,
    },
    t || {}
  );
export default class Epage {
  constructor(opt) {
    this.el = opt.el;
    this.widgets = opt.widgets; // 需要注册的组件
    this.pc = defaultView(opt.pc);
    // 移动端设计时，默认配置
    this.h5 = defaultView(opt.h5);
    // 当前环境，暂无特别用途
    this.env = opt.env || "production";
    // 默认设计视图
    this.view = opt.view || "pc";
    // 以下3个属性将移动到 pc | h5属性中，目前为了兼容老版本
    this.Render = opt.Render;
    // 待注册的widgets
    this.widgets = opt.widgets;
    // 渲染器入口文件，react对应.jsx文件，vue对应.vue文件
    this.component = opt.component;
    this.$hooks = {
      // 设计器生命周期
      life: {
        init: new hook.SyncHook(),
        beforeCreate: new hook.SyncHook(),
        created: new hook.SyncHook(),
        beforeDestroy: new hook.SyncHook(),
        destroyed: new hook.SyncHook(),
      },
      // schema 相关hook
      schema: {
        copy: new hook.SyncWaterfallHook(),
      },
      // 渲染器hook
      render: {
        init: new hook.SyncHook(),
        beforeCreate: new hook.SyncHook(),
        created: new hook.SyncHook(),
        beforeDestroy: new hook.SyncHook(),
        destroyed: new hook.SyncHook(),
      },
    };
    usePlugins(Vue, [Vuex]); // 相当于Vue.use(vuex)
    // 注册插件
    // this.$initPlugins();
    // 调用设计器初始化生命周期  调用init
    this.callPlugin("life", "init", { ctx: this });
    this.store = new Store({ Rule: opt.Rule || Rule });
    console.log(this.pc, opt, 11111111111111111111111);
    const widgets =
      this.widgets || (this[this.view] ? this[this.view].widgets || [] : []);
    if (isArray(widgets)) {
      // 初始化组件
      this.store.initWidgets(widgets);

      if (isPlainObject(this.schema)) {
        this.store.initRootSchema(this.schema);
      }
      this.$$origin = this.render(); // 这里的render主要做两件事，1从当前的this里面拿到数据并组装，2把数据传入h出来的editor
      this.callPlugin("life", "created", { ctx: this });
    } else {
      console.error("widgets must be an array");
    }
  }
  callPlugin(type, hook, ...args) {
    if (!this.$hooks[type]) return;
    const tasks = this.$hooks[type][hook];
    if (!tasks) return;
    return tasks.call(...args);
  }
  setRender(instance) {
    this.$render = instance;
  }
  render() {
    const {
      el,
      store,
      panels,
      settings,
      env,
      view,
      pc,
      h5,
      Render,
      widgets,
      component,
    } = this;
    const extension = {
      store,
      panels,
      settings,
      env,
      view,
      pc,
      h5,
      Render,
      widgets,
      component,
      setRender: this.setRender.bind(this),
      callPlugin: this.callPlugin.bind(this),
    };
    this.callPlugin("life", "beforeCreate", { ctx: this });
    /* eslint-disable no-new */
    const ins = createApp({ extension, el, render: () => h(Editor) }).mount(el);
    return ins;
  }
}
