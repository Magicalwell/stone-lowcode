<template>
  <div>rules</div>
</template>
<script>
export default {
  props: {
    rule: {
      type: Object,
      default: () => ({}),
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    "rule.message"(message) {
      this.$emit("on-message-change", { index: this.index, message });
    },
  },
};
</script>
