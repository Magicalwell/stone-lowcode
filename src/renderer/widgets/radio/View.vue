<template>
  <RadioGroup v-model:value="model[schema.key]">
    <a-radio
      v-for="item in options"
      :key="item.key"
      :value="item.key"
      :disabled="item.disabled"
      >{{ item.value }}</a-radio
    >
  </RadioGroup>
</template>
<script>
import viewExtend from "../../extends/view";
import { Radio, RadioGroup } from "ant-design-vue";
import { defineComponent, markRaw } from "vue";
export default defineComponent({
  extends: viewExtend,
  components: {
    ARadio: markRaw(Radio),
    RadioGroup,
  },
  mounted() {
    this.model = 11111;
  },
  computed: {
    options() {
      const { type, data, dynamicData, dict: dictop } = this.schema.option; // data 静态选项 dynamicData 动态选项
      let result = [];

      if (type === "static") {
        result = data;
      }
      if (type === "dynamic") {
        result = dynamicData;
      }
      if (type === "dict") {
        result = this.getDictAPIData(dictop);
      }
      return result;
    },
  },
});
</script>
