<template>
  <Tabs v-model:activeKey="activeKey">
    <TabPane key="1" tab="Tab 1">Content of Tab Pane 1</TabPane>
    <TabPane key="2" tab="Tab 2">Content of Tab Pane 2</TabPane>
    <TabPane key="3" tab="Tab 3">Content of Tab Pane 3</TabPane>
  </Tabs>
</template>

<script>
import { defineComponent } from "vue";
import { Tabs, TabPane } from "ant-design-vue";
export default defineComponent({
  components: { Tabs, TabPane },
});
</script>
<style lang="scss" scoped>
@import "../../styles/panel/setting.scss";
</style>
