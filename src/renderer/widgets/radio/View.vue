<template>
  <a-radio v-model:value="model[schema.key]">Radio</a-radio>
</template>
<script>
import viewExtend from "../../extends/view";
import { Radio } from "ant-design-vue";
import { defineComponent, markRaw } from "vue";
export default defineComponent({
  extends: viewExtend,
  components: {
    ARadio: markRaw(Radio),
  },
  mounted() {
    this.model = 11111;
  },
});
</script>
