import { hook, helper, Rule, Store } from "../core";

const { isArray, isFunction, usePlugins, isPlainObject } = helper;
export default class Epage {
  constructor(opt = {}) {
    this.el = opt.el;
    this.widgets = opt.widgets; // 需要注册的组件
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
    // usePlugins(Vue, [Vuex, iview]);   暂时不注入插件
    // 注册插件
    // this.$initPlugins();
    // 调用设计器初始化生命周期
    this.callPlugin("life", "init", { ctx: this });
    this.store = new Store({ Rule: opt.Rule || Rule });
    const widgets =
      this.widgets || (this[this.view] ? this[this.view].widgets || [] : []);

    if (isArray(widgets)) {
      this.store.initWidgets(widgets);

      if (isPlainObject(this.schema)) {
        this.store.initRootSchema(this.schema);
      }

      this.$$origin = this.render();
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
}
