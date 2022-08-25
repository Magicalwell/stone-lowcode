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
  },
  computed: {
    store() {
      return this.$root.$options.extension.store;
    },
  },
  mounted() {
    const { handle, draggable, ghostClass, list } = this.$attrs;
    const sortable = new Sortable(this.$refs.vuedrag, {
      handle,
      draggable,
      ghostClass,
      sort: true,
      animation: 150,
      easing: "cubic-bezier(1, 0, 0, 1)",
      group: "g1",
      onAdd: ({ oldIndex, newIndex,item}) => {
        list.splice(newIndex, 0, this.store.$$drag.list.splice(oldIndex, 1)[0]);
        item.remove()
        console.log(oldIndex, newIndex, list);
      },
      onStart: (evt) => {
        this.store.setDragSchemaData({ list, index: evt.oldIndex });
        console.log(list);
        console.log(this.store.$$drag);
      },
      onEnd: ({ newIndex, oldIndex }) => {
        console.log("end");
      },
    });
  },
});
</script>
