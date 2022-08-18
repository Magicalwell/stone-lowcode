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
      <Collapse
        v-model:activeKey="activeKey"
        :bordered="false"
        style="width: 100%; background-color: #fff"
      >
        <template #expandIcon="{ isActive }">
          <SmileTwoTone :rotate="isActive ? 90 : 0" />
        </template>
        <CollapsePanel  header="表单组件" v-for="item in widgets[0].widgets" :key='item.key'>
          <p>11111111</p>
        </CollapsePanel>
      </Collapse>
    </TabPane>
  </Tabs>
  <div class="draw-btn">
    <caret-left-outlined @click="switchBar" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Collapse, CollapsePanel, Tabs, TabPane } from 'ant-design-vue'
import {
  SmileTwoTone,
  CaretLeftOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue'
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
  mounted(){
    console.log(this.widgets);
  },
  data() {
    return {
      // 这里工具栏做成amis的样子 把widgets和tooldata合并，导出位置在render中的widgets/index，在每个item外面套上vuedraggable提供拖拽
      toolData: [
        { id: 'components', label: '组件', component: '' },
        { id: 'outline', label: '文档树', component: '' },
        { id: 'code', label: '代码', component: '' },
      ],
    }
  },
  methods: {},
})
</script>
<style lang="scss" scoped>
.ep-toolbar {
  height: 100%;
  ::v-deep(.ant-tabs-content) {
    .ant-tabs-tabpane {
      padding-left: 0 !important;
    }
  }
  ::v-deep(.ant-tabs-nav-list) {
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
