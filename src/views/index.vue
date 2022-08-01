<template>
  <div>9999</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  beforeMount() {
    // const ext = this.$root.$options.extension || {};
    // Object.assign(this.panels, ext.panels);
    // this.settings = ext.settings;
    // this.design.view = ext.view || "pc";
    // this.setReady();
    console.log("77777");
  },

  mounted() {
    this.renderDesignView(this.design.view);
    // this.renderRef(this.panels, "setting");
    // this.renderRef(this.panels, "tool");
    // this.renderRef(this.panels, "footer");
    // // 切换到设计模式
    // this.store.updateTab("design");
  },
  methods: {
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
      const ins = this.getIns(view);

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

      this[mode][view] = new _Render(args);

      // 设计模式下，把当前设计视图的渲染器实例告诉设计器实例
      if (mode === "design") {
        setRender(this.design[view]);
      }
      if (view === "pc") this.destoryRender(h5);
      if (view === "h5") this.destoryRender(pc);
    },
  },
});
</script>
