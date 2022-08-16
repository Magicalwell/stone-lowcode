<template>
  <Tabs v-model:activeKey="activeKey" @click="show">
    <TabPane
      :key="index"
      :tab="item.name"
      v-for="(item, index) in widgetSettings"
    >
      <component :is="item.component"></component>
    </TabPane>
  </Tabs>
  <!-- <ep-tabs :value="tab" :tabs="widgetSettings" @on-click="onChangeTab">
    <ep-tabs-pane
      v-for="(item, index) in widgetSettings"
      :key="index"
      v-show="item.key === tab"
    >
      <div class="ep-setting-prop">
        <component
          v-if="isVue(item)"
          :is="item.component"
          :store="store"
          :schema="selectedSchema"
          :root="item.key === 'global'"
        ></component>
        <div v-show="!isVue(item)" ref="settings"></div>
      </div>
    </ep-tabs-pane>
  </ep-tabs> -->
</template>

<script>
import { defineComponent, markRaw } from "vue";
import { helper } from "../../../core";
import { Tabs, TabPane } from "ant-design-vue";
import EpStyleSetting from "./style.vue";

const { isArray, isFunction, isPlainObject, isString } = helper;
// 预设的菜单
const globalDefaultSettings = [
  {
    key: "style",
    name: "样式",
    framework: "vue",
    component: markRaw(EpStyleSetting),
  },
  {
    key: "global",
    name: "页面",
    framework: "vue",
    // component: FormSetting,
  },
];
export default defineComponent({
  components: { Tabs: markRaw(Tabs), TabPane: markRaw(TabPane) },
  props: {
    settings: {
      type: Array,
      // [{ title: '', key: '', component: {}}]
      default: () => [],
    },
    store: {
      type: Object,
      default: () => ({
        types: {},
        state: {},
      }),
    },
  },
  data() {
    return {
      markRaw,
      filterSettings: [],
      defaultSettings: [...globalDefaultSettings],
    };
  },
  computed: {
    widgetSettings() {
      return this.isSelected ? this.filterSettings : this.defaultSettings;
    },
    settingWidget() {
      return this.store.getSettingWidget(); // 获取实例上之前挂载的setting
    },
    isSelected() {
      return this.store.isSelected();
    },
    selectedSchema() {
      return this.store.getSelectedSchema();
    },
  },
  watch: {
    selectedSchema() {
      // 监听计算属性返回的被选中的seting
      this.selectedSettings();
    },
  },
  mounted() {
    this.selectedSettings();
    console.log(this.settingWidget);
  },
  methods: {
    selectedSettings() {
      const defaultSettings = [...globalDefaultSettings];
      const globalSettings = [...this.settings];
      let settings = [];
      if (isArray(this.settingWidget)) {
        settings = settings.concat(this.settingWidget);

        // function ({ el, store }) {}
      } else if (isFunction(this.settingWidget)) {
        settings.unshift({
          key: "prop",
          name: "属性",
          component: markRaw(this.settingWidget),
        });

        // default vue component
        // { el, data, render, ... }
      } else if (isPlainObject(this.settingWidget)) {
        settings.unshift({
          key: "prop",
          name: "属性",
          framework: "vue",
          component: markRaw(this.settingWidget),
        });
      }
      console.log(settings, defaultSettings, globalSettings);
      let result = [];
      result = [].concat(settings, globalSettings, defaultSettings); // 合并三个菜单
      result = this.unique(result); // 利用对象去重
      if (this.isSelected) {
        // 若被选择了，则
        this.filterSettings = [...result];
      } else {
        this.defaultSettings = [...result];
      }
      this.renderSettings();
    },
    unique(settings = []) {
      const keys = {};
      return settings.filter((setting) => {
        if (!setting || !setting.component) return false;
        if (!setting.key || !isString(setting.key)) return false;
        if (setting.key in keys) return false;
        keys[setting.key] = true;
        return true;
      });
    },
    renderSettings() {
      // 这里因为之前在store上面存的component和setting是一个函数，在这里直接传入el调用即可
      this.$nextTick(() => {
        const els = this.$refs.settings;
        if (
          !els ||
          els.length <= 0 ||
          els.length !== this.widgetSettings.length
        )
          return;

        this.widgetSettings.forEach((setting, index) => {
          const el = els[index];
          const { component } = setting;

          if (isFunction(component)) {
            component({ el, store: this.store });
          }
        });
      });
    },
    show() {
      console.log(this.isSelected, this.widgetSettings);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "../../styles/panel/setting.scss";
</style>
