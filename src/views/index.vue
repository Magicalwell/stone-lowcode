<template>
  <div>
    <div>999</div>
    <div ref="design-pc"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
const defaultHeader = () => ({
  left: {},
  center: {},
  right: {},
});
const defaultPanels = () => ({
  preview: true,
  logic: true,
  schema: true,
  header: defaultHeader(),
  tool: true,
  setting: true,
  footer: false,
});
export default defineComponent({
  data() {
    return {
      design: {
        view: "pc", // pc | h5
        pc: null,
        h5: null,
      },
      panels: defaultPanels(), // 展示模式
      settings: [],
      ready: {
        pc: false,
        h5: false,
      },
    };
  },
  computed: {
    store() {
      return this.$root.$options.extension.store; // 在epage.js中 createapp传入了extension 相当于把他挂载到vue实例的$root.$options
    },
  },
  beforeMount() {
    const ext = this.$root.$options.extension || {};
    Object.assign(this.panels, ext.panels);
    this.settings = ext.settings;
    this.design.view = ext.view || "pc";
    this.setReady();
  },

  mounted() {
    this.renderDesignView(this.design.view);
    // this.renderRef(this.panels, "setting");  // 用于手动生成setting
    // this.renderRef(this.panels, "tool");   // 用于手动生成tool
    // this.renderRef(this.panels, "footer");   // 用于手动生成footer
    // // 切换到设计模式用于更新tab
    // this.store.updateTab("design");
  },
  methods: {
    setReady() {
      // 用于判断是否初始化工作完成
      const ext = this.$root.$options.extension || {};
      const { pc, h5 } = ext;
      const hasPC = pc && pc.widgets && pc.Render;
      const hasH5 = h5 && h5.widgets && h5.Render;

      this.ready.pc = !!hasPC;
      this.ready.h5 = !!hasH5;
    },
    renderDesignView(view) {
      this.renderView(view, "design");
    },
    renderView(view, mode) {
      if (!view || !mode) return;
      const VIEWS = ["pc", "h5"];
      const el = this.$refs[mode + "-" + view];
      const schema = this.store.getSchema();
      const { pc, h5 } = this[mode];
      const ext = this.$root.$options.extension;
      const { setRender, callPlugin, Render, widgets, component } = ext;

      this[mode].view = view;
      // if (!helper.include(VIEWS, view)) return;
      const ins = this.getIns(view); // 这里获取对应view的预设拓展  就是render widgets component

      if (!ins) return;

      // 这里为了兼容直接传参而非pc|h5对象
      const _Render = Render || ext[view].Render;
      const _widgets = widgets || ext[view].widgets;
      const _component = component || ext[view].component;

      if (!_Render || !_widgets || !_widgets.length || !_component) return;

      const args = { el, mode: "edit" };
      // 设计模式
      if (mode === "design") {
        this.store.initWidgets(_widgets);
        args.store = this.store;
        // 预览模式
      } else {
        args.schema = schema;
        args.widgets = _widgets;
      }
      args.component = _component;
      args.callPlugin = callPlugin;
      this[mode][view] = new _Render(args); // 调用对应模式的render入口

      // 设计模式下，把当前设计视图的渲染器实例告诉设计器实例
      if (mode === "design") {
        setRender(this.design[view]);
      }
      // if (view === "pc") this.destoryRender(h5);
      // if (view === "h5") this.destoryRender(pc);
    },
    getIns(view) {
      const ext = this.$root.$options.extension || {};
      return ext[view];
    },
  },
});
</script>
