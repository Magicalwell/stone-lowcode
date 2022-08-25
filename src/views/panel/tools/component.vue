<template>
  <div class="tools-components">
    <h3>组件库</h3>
    <a-input placeholder="搜索组件"></a-input>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="系统组件" force-render>
        <a-collapse
          v-model:activeKey="collapseActiveKey"
          ghost
          expand-icon-position="right"
        >
          <a-collapse-panel
            :header="item.title"
            v-for="(item, index) in widgets"
            :key="index"
          >
            <div
              v-for="(i, d) in item.widgets"
              :key="d"
              class="epc-widgets-single-item"
              @click="addWidget(i)"
            >
              <ExperimentTwoTone />
              {{ i.Schema.title }}
            </div>
          </a-collapse-panel>
        </a-collapse>
      </a-tab-pane>
      <a-tab-pane key="2" tab="自定义组件">自定义组件</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Tabs, TabPane, Collapse, CollapsePanel, Input } from "ant-design-vue";
import { ExperimentTwoTone } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    ATabs: Tabs,
    ATabPane: TabPane,
    ACollapse: Collapse,
    ACollapsePanel: CollapsePanel,
    AInput: Input,
    ExperimentTwoTone,
  },
  props: {
    widgets: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeKey: "1",
      collapseActiveKey: 0,
    };
  },
  created(){
    console.log(this.widgets,'-------------------');
  },
  methods: {
    addWidget(widget) {
      if (!widget) return;
      //   if (!isFunction(widget.Schema)) return;
      this.$emit("on-add", widget.Schema.widget);
    },
  },
});
</script>

<style lang="scss" scoped>
.tools-components {
  height: 100%;
  ::v-deep(.ant-collapse-header) {
    padding: 0 !important;
  }
  ::v-deep(.ant-collapse-content > .ant-collapse-content-box) {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
  }
  ::v-deep(.ant-collapse-header) {
    height: 34px;
    align-items: center !important;
  }
}
.epc-widgets-single-item {
  width: 110px;
  flex: 0 0 110px;
  border: 1px solid #e8e9eb;
  border-radius: 4px;
  padding: 0 8px;
  height: 32px;
  display: flex;
  align-items: center;
  margin: 0 4px 10px;
}
</style>
