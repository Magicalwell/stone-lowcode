<template>
  <div>
    <EpHeader
      :header="panels.header"
      :store="store"
      :design-view="design"
      :ready="ready"
    />
    <div>999</div>
    <div class="ep-work-design">
      <div ref="design-pc"></div>
    </div>
  </div>
  <!-- <div class="ep-editor ep-layout">
  <ep-header class="ep-layout-header" v-if="panels.header !== false" :header="panels.header" :store="store" :design-view="design" :ready="ready" @change-view="renderDesignView" @preview="onPreview" @show-schema="showSchemaPanel" @show-logic="showLogicPanel"></ep-header>
  <div class="ep-layout-body">
    <template v-if="panels.tool">
      <div class="ep-layout-left" v-if="panels.tool.render" ref="tool" :style="(panels.tool || {}).style || &quot;&quot;"></div>
      <div class="ep-layout-left" v-else="v-else" :style="(panels.tool || {}).style || &quot;&quot;">
        <div class="ep-layout-left-nav" v-if="false">
          <div class="ep-layout-left-nav-item" v-for="item in nav.list" :key="item.key" :class="{&quot;ep-layout-left-nav-active&quot;: nav.active === item.key}" @click="nav.active = item.key"><span class="ep-layout-left-nav-text">{{item.value}}</span></div>
        </div>
        <div class="ep-layout-left-content">
          <div class="ep-tool" v-show="nav.active === &quot;widget&quot;">
            <ep-tool :widgets="widgets" @on-add="onAddWidget"></ep-tool>
          </div>
          <ep-store v-show="nav.active === &quot;store&quot;" :store="store"></ep-store>
        </div>
      </div>
    </template>
    <div class="ep-side-right" v-show="nav.active === &quot;store&quot;">
      <ep-store-setting v-show="nav.active === &quot;store&quot;" :store="store"></ep-store-setting>
    </div>
    <div class="ep-layout-center ep-work" v-show="nav.active === &quot;widget&quot;">
      <ep-panel class="ep-work-design">
        <div v-show="design.view === &quot;pc&quot;">
          <div class="design-pc" ref="design-pc"></div>
        </div>
        <div v-show="design.view === &quot;h5&quot;">
          <ep-h5-emulator>
            <div class="design-h5" ref="design-h5"></div>
          </ep-h5-emulator>
        </div>
      </ep-panel>
    </div>
    <template v-if="panels.setting">
      <div class="ep-layout-right" v-show="nav.active === &quot;widget&quot;">
        <div class="ep-setting" v-if="panels.setting.render" ref="setting" :style="(panels.setting || {}).style || &quot;&quot;"></div>
        <div class="ep-setting" v-else="v-else" :style="(panels.setting || {}).style || &quot;&quot;">
          <ep-setting :store="store" :settings="settings"></ep-setting>
        </div>
      </div>
    </template>
  </div>
  <template v-if="panels.footer">
    <div class="ep-layout-footer" v-if="panels.footer.render" ref="footer" :style="(panels.footer || {}).style || &quot;&quot;"></div>
  </template>
  <ep-fullscreen :visible="!!preview.view" @on-close="closePreview">
    <div slot="header" style="font-size: 12px;font-weight: normal;text-align: center;">
      <RadioGroup class="ep-preview-header-view" v-if="ready.pc &amp;&amp; ready.h5" v-model="preview.view" type="button" size="small" @on-change="changePreview">
        <Radio label="pc">PC</Radio>
        <Radio label="h5">H5</Radio>
      </RadioGroup>
    </div>
    <template v-show="preview.view === &quot;pc&quot;">
      <div class="ep-preview-pc" ref="preview-pc"></div>
    </template>
    <div v-show="preview.view === &quot;h5&quot;">
      <ep-h5-emulator>
        <div ref="preview-h5"></div>
      </ep-h5-emulator>
    </div>
  </ep-fullscreen>
  <ep-fullscreen :visible="!!schemaPanel.visible" @on-close="closeSchemaPanel">
    <div slot="header"><span>Schema</span></div>
    <ep-schema v-if="schemaPanel.visible" v-model="rootSchema" :store="store"></ep-schema>
  </ep-fullscreen>
  <ep-fullscreen :visible="!!logicPanel.visible" @on-close="closeLogicPanel">
    <div slot="header"><span>Logic</span></div>
    <ep-logic v-if="logicPanel.visible" :store="store"></ep-logic>
  </ep-fullscreen>
</div> -->
</template>

<script>
import { defineComponent } from 'vue'
import { EpHeader } from './panel'
const defaultHeader = () => ({
  left: {},
  center: {},
  right: {},
})
const defaultPanels = () => ({
  preview: true,
  logic: true,
  schema: true,
  header: defaultHeader(),
  tool: true,
  setting: true,
  footer: false,
})
export default defineComponent({
  components: {
    EpHeader,
  },
  data() {
    return {
      design: {
        view: 'pc', // pc | h5
        pc: null,
        h5: null,
      },
      panels: defaultPanels(), // 展示模式
      settings: [],
      ready: {
        pc: false,
        h5: false,
      },
    }
  },
  computed: {
    store() {
      return this.$root.$options.extension.store // 在epage.js中 createapp传入了extension 相当于把他挂载到vue实例的$root.$options
    },
  },
  beforeMount() {
    const ext = this.$root.$options.extension || {}
    Object.assign(this.panels, ext.panels)
    this.settings = ext.settings
    this.design.view = ext.view || 'pc'
    this.setReady()
  },

  mounted() {
    this.renderDesignView(this.design.view)
    // this.renderRef(this.panels, "setting");  // 用于手动生成setting
    // this.renderRef(this.panels, "tool");   // 用于手动生成tool
    // this.renderRef(this.panels, "footer");   // 用于手动生成footer
    // // 切换到设计模式用于更新tab
    // this.store.updateTab("design");
  },
  methods: {
    setReady() {
      // 用于判断是否初始化工作完成
      const ext = this.$root.$options.extension || {}
      const { pc, h5 } = ext
      const hasPC = pc && pc.widgets && pc.Render
      const hasH5 = h5 && h5.widgets && h5.Render

      this.ready.pc = !!hasPC
      this.ready.h5 = !!hasH5
    },
    renderDesignView(view) {
      this.renderView(view, 'design')
    },
    renderView(view, mode) {
      if (!view || !mode) return
      const VIEWS = ['pc', 'h5']
      const el = this.$refs[mode + '-' + view]
      const schema = this.store.getSchema()
      const { pc, h5 } = this[mode]
      const ext = this.$root.$options.extension
      const { setRender, callPlugin, Render, widgets, component } = ext

      this[mode].view = view
      // if (!helper.include(VIEWS, view)) return;
      const ins = this.getIns(view) // 这里获取对应view的预设拓展  就是render widgets component

      if (!ins) return

      // 这里为了兼容直接传参而非pc|h5对象
      const _Render = Render || ext[view].Render
      const _widgets = widgets || ext[view].widgets
      const _component = component || ext[view].component

      if (!_Render || !_widgets || !_widgets.length || !_component) return

      const args = { el, mode: 'edit' }
      // 设计模式
      if (mode === 'design') {
        this.store.initWidgets(_widgets)
        args.store = this.store
        // 预览模式
      } else {
        args.schema = schema
        args.widgets = _widgets
      }
      args.component = _component
      args.callPlugin = callPlugin
      this[mode][view] = new _Render(args) // 调用对应模式的render入口

      // 设计模式下，把当前设计视图的渲染器实例告诉设计器实例
      if (mode === 'design') {
        setRender(this.design[view])
      }
      // if (view === "pc") this.destoryRender(h5);
      // if (view === "h5") this.destoryRender(pc);
    },
    getIns(view) {
      const ext = this.$root.$options.extension || {}
      return ext[view]
    },
  },
})
</script>
