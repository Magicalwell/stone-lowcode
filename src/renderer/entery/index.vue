<template>
  <div class="ep-render-container">
    <!-- <vue-drag
      handle=".ep-widget-btn-move"
      draggable=".ep-widget-item"
      ghost-class="ep-widget-ghost"
      v-bind="{ group: { name: 'g1' } }"
      v-model="childrenSchema"
      :animation="200"
      item-key="key"
    >
    </vue-drag> -->
    <div class="vue-drag" ref="vuedrag">
      <EpWidgetItem
        v-for="element in childrenSchema"
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
      ></EpWidgetItem>
    </div>
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
</template>

<script>
import { defineComponent, markRaw } from "vue";
// import vueDrag from "vuedraggable-es"; vue版本兼容问题，改为直接用sortable
import EpWidgetItem from "./item";
import Sortable from "sortablejs";
import { helper } from "../../core";
export default defineComponent({
  components: { EpWidgetItem },
  data() {
    return {
      // childrenSchema: [
      //   { id: 1, label: "2222", name: "啊啊啊啊" },
      //   { id: 2, label: "3333", name: "噢噢噢噢" },
      // ],
    };
  },
  computed: {
    childrenSchema() {
      const { store } = this.$root.$options.extension;
      return helper.getRootSchemaChildren(store.getRootSchema()) || [];
    },
    store() {
      return this.$root.$options.extension.store;
    },
    $$store() {
      return this.$root.$options.extension.store.$$store;
    },
    state() {
      return this.$$store.state;
    },
    flatWidgets() {
      return this.store.getFlatWidgets();
    },
    selectedSchema() {
      return this.store.getSelectedSchema();
    },
  },
  mounted() {
    const { mode } = this.$root.$options.extension;
    // if (mode) {
    //   this.mode = mode
    //   this.changeMode(mode)
    // }
    const sortable = new Sortable(this.$refs.vuedrag, {
      handle: ".ep-widget-btn-move",
      draggable: ".ep-widget-item",
      ghostClass: "ep-widget-ghost",
      sort: true,
      animation: 150,
      easing: "cubic-bezier(1, 0, 0, 1)",
    });
  },
  methods: {
    showElement() {
      console.log(this.childrenSchema, this.flatWidgets);
    },
    onWidgetSelect(currentSchema) {
      const { tab, selectedSchema } = this.store.getState();
      if (
        tab === "design" &&
        selectedSchema &&
        selectedSchema.key !== currentSchema.key
      ) {
        console.log('select');
        this.store.selectWidget(currentSchema.key);
        this.$emit("on-select", currentSchema);
      }
    },
    onWidgetDelete(selectedSchema) {
      this.store.removeWidget(selectedSchema.key);
      this.$emit("on-delete", selectedSchema);
    },
    onWidgetCopy(selectedSchema) {
      this.store.copyWidget(selectedSchema.key);
      this.$emit("on-copy", selectedSchema);
    },

    onWidgetAdd(schema) {
      this.store.addWidgetChild(
        schema.key,
        schema.children.length,
        schema.children[0]
      );
      this.$emit("on-add", schema);
    },
  },
});
</script>
