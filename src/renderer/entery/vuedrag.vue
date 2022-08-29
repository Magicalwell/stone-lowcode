<template>
  <div ref="vuedrag">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Sortable from "sortablejs";
export default defineComponent({
  props: {},
  computed: {
    store() {
      return this.$root.$options.extension.store;
    },
  },
  mounted() {
    const { handle, draggable, ghostClass, list, group } = this.$attrs;
    const sortable = new Sortable(this.$refs.vuedrag, {
      handle,
      draggable,
      ghostClass,
      sort: true,
      animation: 150,
      easing: "cubic-bezier(1, 0, 0, 1)",
      group,
      onAdd: ({ oldIndex, newIndex, item }) => {
        list.splice(newIndex, 0, this.store.$$drag.list.splice(oldIndex, 1)[0]);
        item.remove();
      },
      onStart: (evt) => {
        if (!group) return;
        this.store.setDragSchemaData({ list, index: evt.oldIndex });
      },
      onEnd: ({ newIndex, oldIndex }) => {
        this.store.cleanDragSchemaData();
        console.log("end");
      },
      onUpdate({ oldIndex, newIndex }) {
        list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
      },
    });
  },
});
</script>
