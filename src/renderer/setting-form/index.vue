<template>
  <a-form
    :model="store"
    :label-col="{ style: { width: '100px' } }"
    @click="show"
    class="epc-setting-default-style"
  >
    <a-form-item label="唯一标识key:" v-if="keyList.includes('key')">
      <a-input :disabled="true" v-model:value="selectedSchema.key" />
    </a-form-item>
    <a-form-item label="占位文本:" v-if="keyList.includes('placeholder')">
      <a-input v-model:value="selectedSchema.placeholder" />
    </a-form-item>
    <a-form-item label="标题:" v-if="keyList.includes('label')">
      <a-input v-model:value="selectedSchema.label" />
    </a-form-item>
  </a-form>
</template>
<script>
import EpWidgetRule from "./rule.vue";
import { Form, FormItem, Input } from "ant-design-vue";
export default {
  components: {
    AForm: Form,
    AFormItem: FormItem,
    AInput: Input,
  },
  props: {
    // orders: {
    //   type: Array,
    //   default: () => [
    //     { key: "key" },
    //     { key: "name" },
    //     { key: "label" },
    //     { key: "placeholder" },
    //     { key: "description" },
    //     { key: "help" },
    //     { key: "hidden" },
    //     { key: "disabled" },
    //     { key: "dynamic" },
    //     { key: "rule" },
    //   ],
    // },
    store: {
      type: Object,
      default: () => ({
        types: {},
        state: {},
      }),
    },
    keyList: { type: Array, default: () => ["key", "label"] },
  },
  data() {
    return {};
  },
  computed: {
    selectedSchema() {
      return this.store.getSelectedSchema();
    },

    rules() {
      return this.store.getSelectedSchema().rules || [];
    },

    selectedValidators() {
      const widgetsValidators = this.store.getWidgetsValidators();
      return widgetsValidators[this.selectedSchema.widget] || [];
    },
  },
  methods: {
    show() {
      console.log(this.selectedSchema);
    },
    onRuleTypeChange(type, index) {
      const { key } = this.selectedSchema;
      this.store.updateRule(key, index, { type });
    },

    onRuleMessageChange({ index, message }) {
      const { key } = this.selectedSchema;
      this.store.updateRule(key, index, { message });
    },

    addRule() {
      const { key } = this.selectedSchema;
      this.store.addRule(key);
    },

    deleteRule(index) {
      const { key } = this.selectedSchema;
      this.store.removeRule(key, index);
    },
  },
};
</script>
