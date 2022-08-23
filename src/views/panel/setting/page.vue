<template>
  <Form
    :label-col="{ style: { width: '80px' } }"
    class="epc-setting-default-style"
    id="globel_page_setting"
    labelAlign="left"
  >
    <FormItem label="页面标题">
      <Input
        v-model:value="rootSchema.title"
        placeholder="不显示标题为空即可"
      />
    </FormItem>
    <FormItem
      label="全局默认字体大小"
      style="display: block"
      :label-col="{ style: { width: '120px' } }"
    >
      <Slider @afterChange="test" />
    </FormItem>
    <FormItem
      label="全局默认字体颜色"
      :label-col="{ style: { width: '120px' } }"
    >
      <Popover trigger="click" v-bind="popoverSetting">
        <template #content>
          <Sketch v-model="rootSchema.style['color']" />
        </template>
        <div
          :style="{
            'background-color': rootSchema.style['color'] || '#000',
            width: '60px',
            height: '32px',
            'border-radius': '12px',
          }"
        ></div>
      </Popover>
    </FormItem>
    <FormItem label="全局默认字体" :label-col="{ style: { width: '120px' } }">
      <small>暂不支持更改字体噢！</small>
    </FormItem>
    <EpcCommonStyle :schema="rootSchema" :store="store" :root="true" />
  </Form>
</template>
<script>
import { defineComponent } from "vue";
import { Form, FormItem, Input, Slider, Popover } from "ant-design-vue";
import { Sketch } from "@ckpack/vue-color";
import EpcCommonStyle from "./common.vue";

export default defineComponent({
  components: {
    Form,
    FormItem,
    Input,
    Slider,
    Popover,
    Sketch,
    EpcCommonStyle,
  },
  props: {
    store: {
      type: Object,
      default: () => ({ state: {} }),
    },
  },
  data() {
    return {
      size: "small",
      popoverSetting: {
        getPopupContainer: () => document.querySelector("#globel_page_setting"),
      },
    };
  },
  computed: {
    rootSchema() {
      return this.store.getRootSchema();
    },
    fontSize: {
      get() {
        return parseInt(this.rootSchema.style["font-size"]);
      },
      set(val) {
        this.rootSchema.style["font-size"] = val + "px";
      },
    },
  },
  methods: {
    onPositionChange(value) {
      const DEFAULT_WIDTH = 80;
      const width = value === "top" ? 0 : DEFAULT_WIDTH;
      this.rootSchema.label.width = width;
    },
    test(val) {
      this.rootSchema.style["font-size"] = val + "px";
    },
  },
});
</script>
<style lang="scss" scoped>
.epc-setting-default-style {
  padding: 0 15px;
}
</style>
