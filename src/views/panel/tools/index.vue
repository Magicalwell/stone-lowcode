<template>
  <Tabs v-model:activeKey="activeKey" tab-position="left" @tabScroll="callback">
    <TabPane v-for="i in 30" :key="i" :tab="`Tab-${i}`">
      <Collapse
        v-model:activeKey="activeKey"
        :bordered="false"
        style="width: 100%; background-color: #fff"
      >
        <template #expandIcon="{ isActive }">
          <SmileTwoTone :rotate="isActive ? 90 : 0" />
        </template>
        <CollapsePanel key="1" header="表单组件">
          <p>11111111</p>
        </CollapsePanel>
        <CollapsePanel key="2" header="This is panel header 2">
          <p>22222222</p>
        </CollapsePanel>
        <CollapsePanel key="3" header="This is panel header 3">
          <p>33333333</p>
        </CollapsePanel>
      </Collapse>
    </TabPane>
  </Tabs>
  <div class="draw-btn">
    <caret-left-outlined />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Collapse, CollapsePanel, Tabs, TabPane } from "ant-design-vue";
import { SmileTwoTone, CaretLeftOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    Collapse,
    CollapsePanel,
    SmileTwoTone,
    Tabs,
    TabPane,
    CaretLeftOutlined,
  },
});
</script>
<style lang="scss" scoped>
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
