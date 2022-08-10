<template>
  <div>
    <vue-drag
      handle=".ep-widget-item-handle"
      draggable=".ep-widget-item"
      ghost-class="ep-widget-ghost"
      v-bind="{ group: { name: 'g1' } }"
      :list="childrenSchema"
      :animation="200"
    >
      <template #item="{ element }">
        <ep-widget-item
          :key="element.key"
          :schema="element"
          :flat-widgets="flatWidgets"
          :flat-schemas="flatSchemas"
          :selected-schema="selectedSchema"
          :root-schema="rootSchema"
          @on-select="onWidgetSelect"
          @on-delete="onWidgetDelete"
          @on-copy="onWidgetCopy"
          @on-add="onWidgetAdd"
          @on-event="onEvent"
        ></ep-widget-item>
      </template>
    </vue-drag>
  </div>
  <!-- <div class="ep-render-container" :style="containerStyle">
    <Form
      class="ep-widget-form"
      ref="epForm"
      :rules="rules"
      :model="model"
      :label-width="rootSchema.label.width"
      :label-position="rootSchema.label.position"
      :class="`ep-mode-${mode}`"
      :style="contentStyle"
    >
      <template v-if="state.tab !== 'design'">
        <ep-widget-item
          v-for="(item, k) in childrenSchema"
          v-show="!item.hidden"
          :key="item.key"
          :schema="item"
          :flat-widgets="flatWidgets"
          :flat-schemas="flatSchemas"
          :root-schema="rootSchema"
          @on-add="onWidgetAdd"
          @on-event="onEvent"
          @on-dynamic-add="onDynamicAdd"
          @on-dynamic-remove="onDynamicRemove"
        ></ep-widget-item>
      </template>
      <vue-drag
        v-else="v-else"
        handle=".ep-widget-item-handle"
        draggable=".ep-widget-item"
        ghost-class="ep-widget-ghost"
        v-bind="{ group: { name: 'g1' } }"
        :list="childrenSchema"
        :disabled="state.tab !== 'design'"
        :animation="200"
      >
        <transition-group>
          <ep-widget-item
            v-for="(item, k) in childrenSchema"
            :key="item.key"
            :schema="item"
            :flat-widgets="flatWidgets"
            :flat-schemas="flatSchemas"
            :selected-schema="selectedSchema"
            :root-schema="rootSchema"
            @on-select="onWidgetSelect"
            @on-delete="onWidgetDelete"
            @on-copy="onWidgetCopy"
            @on-add="onWidgetAdd"
            @on-event="onEvent"
          ></ep-widget-item>
        </transition-group>
      </vue-drag>
    </Form>
  </div> -->

  <a-button type="primary">Primary Button</a-button>
</template>

<script>
import { defineComponent } from 'vue'
import vueDrag from 'vuedraggable'
import EpWidgetItem from './item'
export default defineComponent({
  components: { vueDrag, EpWidgetItem },
  data() {
    return {
      childrenSchema: [
        { id: 1, label: '2222' },
        { id: 2, label: '3333' },
      ],
    }
  },
  computed: {
    store() {
      return this.$root.$options.extension.store
    },
    $$store() {
      return this.$root.$options.extension.store.$$store
    },
    state() {
      return this.$$store.state
    },
  },
  created() {
    const { mode } = this.$root.$options.extension

    // if (mode) {
    //   this.mode = mode
    //   this.changeMode(mode)
    // }
    console.log(this.$$store.state.widgets);
  },
})
</script>
