<template>
  <div ref="vuedrag">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Sortable from "sortablejs";
export default defineComponent({
  props: {
    group: {
      type: Object,
      default: () => ({ name: "g1" }),
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    console.log(this.$attrs, "this.$attrsthis.$attrsthis.$attrsthis.$attrs");
    const { handle, draggable, ghostClass } = this.$attrs;
    const sortable = new Sortable(this.$refs.vuedrag, {
      handle,
      draggable,
      ghostClass,
      sort: true,
      animation: 150,
      easing: "cubic-bezier(1, 0, 0, 1)",
      group: "g1",
      list: this.list,
      fallbackOnBody: true,
      onAdd: (...arg) => {
        console.log(arg);
      },
    });
  },
});
</script>
