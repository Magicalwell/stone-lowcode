<template>
  <a-radio v-model="model[schema.key]">Radio</a-radio>
</template>
<script>
import viewExtend from "../../extends/view";
import { Radio } from "ant-design-vue";

export default {
  extends: viewExtend,
  components: {
    ARadio: Radio,
  },
  mounted() {
    this.model = 11111;
  },
};
</script>
