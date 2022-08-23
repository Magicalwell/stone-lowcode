<template>
  <div class="epc-editor-container epc-layout">
    <EpcHeader
      :header="panels.header"
      :store="store"
      :design-view="design"
      :ready="ready"
      @preview="onPreview"
    />
    <div class="epc-layout-body">
      <template v-if="panels.tool">
        <div
          class="epc-layout-left"
          v-if="panels.tool.render"
          ref="tool"
          :style="(panels.tool || {}).style || ''"
        ></div>
        <div v-else class="epc-layout-left">
          <EpcTool :widgets="widgets" @on-add="onAddWidget"></EpcTool>
        </div>
      </template>
      <div class="epc-layout-main epc-workspace">
        <div class="epc-workspace-design">
          <div ref="design-pc"></div>
          <div ref="design-h5"></div>
        </div>
      </div>
      <template v-if="panels.setting">
        <div class="epc-layout-right">
          <div
            class="epc-setting-box"
            v-if="panels.setting.render"
            ref="setting"
            :style="(panels.setting || {}).style || ''"
          ></div>
          <div
            class="epc-setting-box"
            v-else
            :style="(panels.setting || {}).style || ''"
          >
            <EpcSetting :store="store" :settings="settings"></EpcSetting>
          </div>
        </div>
      </template>
    </div>
    <epc-fullscreen :visible="!!preview.view" @on-close="closePreview">
      <template #header>
        <RadioGroup v-model="preview.view" button-style="solid">
          <RadioButton label="pc">PC</RadioButton>
          <RadioButton label="h5" disabled>H5</RadioButton>
        </RadioGroup>
      </template>
      <div ref="preview-pc" v-show="preview.view === 'pc'"></div>
      <div ref="preview-h5" v-show="preview.view === 'h5'"></div>
    </epc-fullscreen>
    <epc-fullscreen :visible="!!schemaPanel.visible">
      <template #header>
        <span>Schema</span>
      </template>
      待完善schema预览
      <!-- <epc-schema-view
        v-if="schemaPanel.visible"
        v-model="rootSchema"
        :store="store"
      ></epc-schema-view> -->
    </epc-fullscreen>
    <!-- <epc-fullscreen :visible="!!logicPanel.visible" @on-close="closeLogicPanel">
      <template #header>
        <span>Logic</span>
      </template>
      事件和接口等考虑还是每个widgets自定义
    </epc-fullscreen> -->
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { EpcHeader, EpcSetting, EpcTool } from "./panel";
import EpcFullscreen from "./components/fullscreen";
import { RadioButton, RadioGroup } from "ant-design-vue";
import { helper } from "../core";
const defaultHeader = () => ({
  left: {},
  center: {},
  right: {},
});
// 自定义的布局
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
  components: {
    EpcHeader,
    EpcSetting,
    EpcTool,
    EpcFullscreen,
    RadioButton,
    RadioGroup,
  },
  data() {
    return {
      design: {
        view: "pc", // pc | h5
        pc: null,
        h5: null,
      },
      preview: {
        view: "", // pc | h5
        pc: null,
        h5: null,
      },
      panels: defaultPanels(), // 自定义展示显隐以及内容
      settings: [],
      schemaPanel: {
        visible: false,
      },
      logicPanel: {
        visible: false,
      },
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
    widgets() {
      return this.store.getWidgets();
    },
  },
  beforeMount() {
    const ext = this.$root.$options.extension || {};
    Object.assign(this.panels, ext.panels);
    this.settings = ext.settings;
    this.design.view = ext.view || "pc";
    console.log(this.settings, "settingssettingssettingssettings");
    this.setReady();
  },

  mounted() {
    this.renderDesignView(this.design.view);
    // this.renderRef(this.panels, "setting");  // 用于手动生成setting
    // this.renderRef(this.panels, "tool");   // 用于手动生成tool
    // this.renderRef(this.panels, "footer");   // 用于手动生成footer
    // // 切换到设计模式用于更新tab
    this.store.updateTab("design");
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
      // 根据传入的类型获取到对应的元素，把内容挂载到其下
      const el = this.$refs[mode + "-" + view];
      const schema = this.store.getSchema();
      const { pc, h5 } = this[mode];
      const ext = this.$root.$options.extension; // 拿到之前传过来的所有数据
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
        this.store.initWidgets(_widgets); // 此处挂载了两次widgets为了兼容设计和渲染模式
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
    onAddWidget(widget) {
      this.store.addWidget(widget);
    },
    onPreview() {
      this.renderPreview(this.design.view);
    },
    renderPreview(view) {
      this.renderView(view, "preview");
    },
    closePreview() {
      this.preview.view = "";
      const { h5, pc } = this.preview;
      console.log(this.preview);
      this.destoryRender(h5);
      this.destoryRender(pc);
    },
    destoryRender(render) {
      console.log(render);
      if (!render) return;
      if (!helper.isFunction(render.destroy)) return;
      render.destroy();
    },
    changePreview(view) {
      this.renderPreview(view);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "./styles/panel/base.scss";
</style>
<style lang="scss">
@import "./styles/panel/setting.scss";
</style>
