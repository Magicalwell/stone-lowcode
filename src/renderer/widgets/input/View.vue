<template>
  <Input v-if="schema.key" v-model.trim="model[schema.key]"></Input>
</template>
<script>
import viewExtend from "../../extends/view";
import { Input } from "ant-design-vue";
import { defineComponent, markRaw } from "vue";
export default defineComponent({
  extends: viewExtend,
  components: {
    Input: markRaw(Input),
  },
  mounted() {
    console.log(this);
  },
});
</script>
