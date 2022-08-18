<template>
  <Input
    v-if="schema.key"
    v-model:value="model[schema.key]"
    :placeholder="schema.placeholder"
    @input="show"
  ></Input>
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
  methods: {
    show() {
      console.log(this.model, this.schema.key, this.store);
    },
  },
});
</script>
