<template>
  <Input></Input>
</template>
<script>
import viewExtend from "../../extends/view";
import { Input } from "ant-design-vue";
import { defineComponent } from "vue";
export default defineComponent({
  extends: viewExtend,
  components: {
    Input,
  },
});
</script>
