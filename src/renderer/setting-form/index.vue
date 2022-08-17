<template>
  <a-form
    :model="store"
    :label-col="{ style: { width: '100px' } }"
    @click="show"
  >
    <a-form-item label="唯一标识key:">
      <a-input :disabled="true" v-model:value="selectedSchema.key" />
    </a-form-item>
    <a-form-item label="占位文本:">
      <a-input v-model:value="selectedSchema.placeholder" />
    </a-form-item>
    <!-- <a-form-item label="Resources">
      <a-radio-group v-model:value="formState.resource">
        <a-radio value="1">Sponsor</a-radio>
        <a-radio value="2">Venue</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="Activity form">
      <a-input v-model:value="formState.desc" type="textarea" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px">Cancel</a-button>
    </a-form-item> -->
  </a-form>
  <EpWidgetRule />
</template>
<script>
import EpWidgetRule from "./rule.vue";
import { Form, FormItem, Radio, RadioGroup, Input } from "ant-design-vue";
export default {
  components: {
    EpWidgetRule,
    AForm: Form,
    AFormItem: FormItem,
    // ARadio: Radio,
    // ARadioGroup: RadioGroup,
    AInput: Input,
  },
  props: {
    orders: {
      type: Array,
      default: () => [
        { key: "key" },
        { key: "name" },
        { key: "label" },
        { key: "placeholder" },
        { key: "description" },
        { key: "help" },
        { key: "hidden" },
        { key: "disabled" },
        { key: "dynamic" },
        { key: "rule" },
      ],
    },
    store: {
      type: Object,
      default: () => ({
        types: {},
        state: {},
      }),
    },
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
