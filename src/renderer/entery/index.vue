<template>
  <div class="epc-main-render" :style="rootStyles">
    <h3 :style="titleStyle" v-if="rootSchema.title">{{ rootSchema.title }}</h3>
    <div class="vue-drag" ref="vuedrag">
      <template v-if="state.tab !== 'design'">
        <!-- 这里区分设计和渲染模式的显示，设计模式没有隐藏，隐藏体现在setting里面，所以要分开显示 -->
        <!-- 这里考虑使用计算属性过滤一遍 -->
        <EpcWidgetItem
          v-for="item in childrenSchema"
          :key="item.key"
          :schema="item"
          :flat-widgets="flatWidgets"
          :flat-schemas="flatSchemas"
          :root-schema="rootSchema"
          @on-add="onWidgetAdd"
          @on-event="onEvent"
          @on-dynamic-add="onDynamicAdd"
          @on-dynamic-remove="onDynamicRemove"
        ></EpcWidgetItem>
      </template>
      <template v-else>
        <!-- 这里区分设计和渲染模式的显示，设计模式没有隐藏，隐藏体现在setting里面，所以要分开显示 -->
        <EpcWidgetItem
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
        ></EpcWidgetItem>
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
// import vueDrag from "vuedraggable-es"; vue版本兼容问题，改为直接用sortable
import EpcWidgetItem from "./item";
import Sortable from "sortablejs";
import { helper } from "../../core";
export default defineComponent({
  components: { EpcWidgetItem },
  data() {
    return {};
  },
  computed: {
    childrenSchema() {
      const { store } = this.$root.$options.extension;
      console.log(store, "storestorestorestore");
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
    rootSchema() {
      return this.store.getRootSchema();
    },
    flatSchemas() {
      return this.store.getFlatSchemas();
    },
    rootStyles() {
      const rootStyle = this.store.getRootSchema().style || {};
      const style = Object.keys(rootStyle)
        .map((attr) => {
          if (typeof rootStyle[attr] === "object") return "";
          return `${attr}:${rootStyle[attr]};`;
        })
        .join("");

      return style;
    },
    titleStyle() {
      const rootStyle = this.store.getRootSchema().style || {};
      const titleStyle = rootStyle.title || {};
      return titleStyle;
    },
  },
  mounted() {
    const { mode } = this.$root.$options.extension;
    // if (mode) {
    //   this.mode = mode
    //   this.changeMode(mode)
    // }
    const sortable = new Sortable(this.$refs.vuedrag, {
      handle: ".epc-widget-btn-move",
      draggable: ".epc-widget-item",
      ghostClass: "epc-widget-ghost",
      sort: true,
      animation: 150,
      easing: "cubic-bezier(1, 0, 0, 1)",
    });
    console.log(this.rootSchema, "rootSchemarootSchemarootSchema");
  },
  methods: {
    onWidgetSelect(currentSchema) {
      const { tab, selectedSchema } = this.store.getState();
      if (
        tab === "design" &&
        selectedSchema &&
        selectedSchema.key !== currentSchema.key
      ) {
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
    onEvent() {
      console.log("event");
    },
    onDynamicAdd() {
      console.log("动态数据");
    },
    onDynamicRemove() {
      console.log("移出动态数据");
    },
  },
});
</script>
