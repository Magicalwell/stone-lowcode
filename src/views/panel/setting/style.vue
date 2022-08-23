<template>
  <Form
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
    class="epc-setting-default-style"
  >
    <FormItem label="布局">
      <RadioGroup v-model:value="getLabelStyle['text-align']" button-style="solid" size="small">
        <RadioButton value="a">内联</RadioButton>
        <RadioButton value="a">水平</RadioButton>
        <RadioButton value="a">垂直</RadioButton>
      </RadioGroup>
    </FormItem>
    <FormItem label="隐藏标题">
      <Switch v-model:checked="getLabelStyle.hidden" />
    </FormItem>
    <FormItem label="标题对齐方式">
      <RadioGroup
        v-model:value="getLabelStyle['text-align']"
        button-style="solid"
        size="small"
      >
        <RadioButton value="left">左对齐</RadioButton>
        <RadioButton value="right">右对齐</RadioButton>
        <RadioButton value="center">居中</RadioButton>
      </RadioGroup>
    </FormItem>
    <FormItem label="标题宽度">
      <Input v-model:value="getLabelStyle.width" />
    </FormItem>
  </Form>
</template>

<script>
import { defineComponent } from "vue";
import {
  Form,
  FormItem,
  RadioGroup,
  RadioButton,
  Switch,
  Input,
} from "ant-design-vue";
export default defineComponent({
  components: {
    Form,
    FormItem,
    RadioGroup,
    RadioButton,
    Switch,
    Input,
  },
  props: {
    schema: {
      type: Object,
      default: () => ({
        style: {},
      }),
    },
    root: {
      type: Boolean,
      default: true,
    },
    store: {
      type: Object,
      default: () => ({ state: {} }),
    },
  },
  computed: {
    getLabelStyle() {
      return this.schema.labelOptions || {};
    },
  },
  mounted() {
    console.log(this.schema);
  },
});
</script>
<style lang="scss" scoped>
.epc-setting-default-style {
  ::v-deep(.ant-form-item) {
    margin-bottom: 12px;
  }
}
</style>
