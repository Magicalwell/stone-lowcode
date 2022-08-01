<template>
  <div>
    <vue-drag
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
          v-for="item in childrenSchema"
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
import { defineComponent } from "vue";
import vueDrag from "vuedraggable";
export default defineComponent({
  components: { vueDrag },
});
</script>
