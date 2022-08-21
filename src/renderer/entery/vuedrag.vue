<template>
  <div ref="vuedrag">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Sortable from 'sortablejs'
export default defineComponent({
  mounted() {
    console.log(this.$attrs, 'this.$attrsthis.$attrsthis.$attrsthis.$attrs')
    const {handle,draggable,ghostClass} = this.$attrs
    const sortable = new Sortable(this.$refs.vuedrag, {
      handle,
      draggable,
      ghostClass,
      sort: true,
      animation: 150,
      easing: 'cubic-bezier(1, 0, 0, 1)',
      group: { name: 'g1' }
    })
  },
})
</script>
