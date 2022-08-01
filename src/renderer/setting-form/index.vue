<template>
  <div>setting表单</div>
  <EpWidgetRule />
</template>
<script>
import EpWidgetRule from "./rule.vue";

export default {
  components: {
    EpWidgetRule,
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
