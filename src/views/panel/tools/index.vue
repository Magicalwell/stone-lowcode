<template>
  <Tabs
    v-model:activeKey="activeKey"
    tab-position="left"
    @tabScroll="callback"
    class="ep-toolbar"
  >
    <TabPane v-for="i in toolData" :key="i.id">
      <template #tab>
        <AppstoreOutlined :style="{ fontSize: '18px', color: '#2468f2' }" />
      </template>
      <component
        :is="i.component"
        :widgets="widgets"
        @on-add="
          (val) => {
            $emit('on-add', val);
          }
        "
      ></component>
    </TabPane>
  </Tabs>
  <div class="draw-btn">
    <caret-left-outlined @click="switchBar" />
  </div>
</template>

<script>
import { defineComponent, markRaw } from "vue";
import { Collapse, CollapsePanel, Tabs, TabPane } from "ant-design-vue";
import {
  SmileTwoTone,
  CaretLeftOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";
import ComponentBox from "./component.vue";
export default defineComponent({
  components: {
    Collapse,
    CollapsePanel,
    SmileTwoTone,
    Tabs,
    TabPane,
    CaretLeftOutlined,
    AppstoreOutlined,
  },
  props: {
    widgets: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // 这里工具栏做成amis的样子 把widgets和tooldata合并，导出位置在render中的widgets/index，在每个item外面套上vuedraggable提供拖拽
      toolData: [
        { id: "components", label: "组件", component: markRaw(ComponentBox) },
        { id: "outline", label: "文档树", component: "" },
        { id: "code", label: "代码", component: "" },
      ],
    };
  },
  methods: {},
  mounted() {
    console.log(this.widgets);
  },
});
</script>
<style lang="scss" scoped>
.ep-toolbar {
  height: 100%;
  ::v-deep(.ant-tabs-content) {
    .ant-tabs-tabpane {
      padding-left: 0 !important;
    }
  }
  > ::v-deep(.ant-tabs-nav) {
    .ant-tabs-tab {
      padding: 12px 12px;
      .anticon {
        margin-right: 0;
      }
      &.ant-tabs-tab-active {
        background-color: #eef3fe;
      }
    }
    .ant-tabs-tab-btn {
      width: 100%;
      text-align: center;
    }
  }
  > ::v-deep(.ant-tabs-content-holder) {
    padding: 10px;
  }
}
.draw-btn {
  position: absolute;
  right: -14px;
  top: 50%;
  width: 15px;
  height: 60px;
  border-radius: 0 6px 6px 0;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
