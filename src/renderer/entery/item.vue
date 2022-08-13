<template>
  <div class="ep-widget-item ep-widget-item-handle" :class="cls">
    <div class="ep-widget-item-name">
      {{ schema.name }}
    </div>

    <div class="ep-widget-btn ep-widget-btn-delete ep-icon ep-icon-trash">
      删除
    </div>
    <div class="ep-widget-btn ep-widget-btn-clone ep-icon ep-icon-copy">
      复制
    </div>
    <template v-if="schema.container">
      <div>如果是布局组件,或内部有子组件</div>
    </template>
    <template v-else>
      <div>
        <component :is="flatWidgets[schema.widget].View"></component>
        <div>title</div>
        <div></div>
      </div>
    </template>
  </div>
  <!-- <div
    class="ep-widget-item"
    :class="cls"
    :style="getStyle()"
    @click="onOriginViewSelect($event, schema)"
  >
    <div class="ep-widget-item-name" v-if="tab === 'design'">
      {{ schema.name }}
    </div>
    <div v-if="tab === 'design'">
      <div
        class="ep-widget-btn ep-widget-btn-delete ep-icon ep-icon-trash"
        title="删除"
        @click="onOriginViewDelete($event, schema)"
      ></div>
      <div
        class="ep-widget-btn ep-widget-btn-clone ep-icon ep-icon-copy"
        title="复制"
        @click="onOriginViewCopy($event, schema)"
      ></div>
    </div>
    <template v-if="schema.container">
      <template v-if="!schema.dynamic || tab === 'design'">
        <Row
          v-if="schema.option"
          type="flex"
          :gutter="schema.option.gutter"
          :align="schema.option.align"
          :justify="schema.option.justify"
        >
          <Col
            v-for="(item, k) in schema.children"
            :key="k"
            :span="item.span"
            :offset="item.offset"
          >
            <template v-if="Array.isArray(item.list)">
              <template v-if="tab !== 'design'">
                <ep-widget-item
                  v-for="(child, j) in item.list"
                  :key="child.key"
                  :schema="child"
                  :flat-widgets="flatWidgets"
                  :flat-schemas="flatSchemas"
                  :root-schema="rootSchema"
                  v-show="!child.hidden"
                  @on-add="onViewAdd"
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
                :list="item.list"
                :animation="200"
              >
                <transition-group mode="fade">
                  <div
                    class="ep-widget-item"
                    v-if="item.list.length === 0"
                    key="placeholder"
                    :class="getPlaceholderCls()"
                  ></div>
                  <template v-else="v-else">
                    <ep-widget-item
                      v-for="(child, j) in item.list"
                      :key="child.key"
                      :schema="child"
                      :flat-widgets="flatWidgets"
                      :flat-schemas="flatSchemas"
                      :selected-schema="selectedSchema"
                      :root-schema="rootSchema"
                      :class="{
                        'ep-widget-selected': child.key === selectedSchema.key,
                      }"
                      @on-select="onViewSelect"
                      @on-delete="onViewDelete"
                      @on-copy="onViewCopy"
                      @on-add="onViewAdd"
                      @on-event="onEvent"
                    ></ep-widget-item>
                  </template>
                </transition-group>
              </vue-drag>
            </template>
          </Col>
        </Row>
        <div class="ep-widget-description" v-if="schema.description">
          {{ schema.description }}
        </div>
      </template>
      <template v-else="v-else">
        <div v-for="(sub, s) in schema.list" style="position: relative">
          <Row
            v-if="sub.option"
            type="flex"
            :gutter="sub.option.gutter"
            :align="sub.option.align"
            :justify="sub.option.justify"
            :class="tab !== 'design' ? 'ep-widget-dynamic-container' : ''"
          >
            <Col
              v-for="(item, k) in sub.children"
              :key="k"
              :span="item.span"
              :offset="item.offset"
            >
              <template
                v-if='Array.isArray(item.list) &amp;&amp; tab !== "design"'
              >
                <ep-widget-item
                  v-for="(child, j) in item.list"
                  :key="child.key"
                  :schema="child"
                  :flat-widgets="flatWidgets"
                  :flat-schemas="flatSchemas"
                  :root-schema="rootSchema"
                  @on-add="onViewAdd"
                  @on-event="onEvent"
                  @on-dynamic-add="onDynamicAdd"
                  @on-dynamic-remove="onDynamicRemove"
                ></ep-widget-item>
              </template>
            </Col>
          </Row>
          <div class="ep-widget-description" v-if="sub.description">
            {{ sub.description }}
          </div>
          <div
            class="epiv-widget-dynamic-remove ep-icon ep-icon-minus"
            title="删除"
            @click="onOriginDynamicRemove($event, schema, s)"
          ></div>
        </div>
      </template>
      <Button
        v-show="schema.dynamic"
        type="dashed"
        style="margin-top: 5px"
        :size="schema.size || rootSchema.size"
        @click="onOriginDynamicAdd($event, schema)"
        >添加</Button
      >
    </template>
    <template v-else="v-else">
      <FormItem
        v-if="!schema.dynamic || tab === 'design'"
        :class="{ 'ep-widget-item-fullcol': !schema.label }"
        :label="schema.label"
        :prop="schema.key"
        ><span v-if="schema.help" slot="label"
          >{{ schema.label }}
          <Tooltip :content="schema.help" :transfer="true">
            <Icon type="ios-information-outline"></Icon>
          </Tooltip>
        </span>
        <component
          class="ep-widget-control"
          :is="flatWidgets[schema.widget].View"
          :schema="schema"
          @on-event="onEvent"
        ></component>
        <div class="ep-widget-description" v-if="schema.description">
          {{ schema.description }}
        </div>
        <Button
          v-if="schema.dynamic"
          style="margin-top: 5px"
          :size="schema.size || rootSchema.size"
          type="dashed"
          >添加</Button
        >
      </FormItem>
      <template v-else="v-else">
        <FormItem
          v-if="schema.list.length === 0"
          :class="{ 'ep-widget-item-fullcol': !schema.label }"
          :label="schema.label"
        >
          <Button
            style="margin-top: 5px"
            :size="schema.size || rootSchema.size"
            type="dashed"
            @click="onOriginDynamicAdd($event, schema)"
            >添加</Button
          >
        </FormItem>
        <FormItem
          v-for="(sc, index) in schema.list"
          :key="sc.key"
          :class="{ 'ep-widget-item-fullcol': !sc.label }"
          :label="index === 0 ? schema.label : undefined"
          :prop="sc.key"
          ><span v-if="sc.help" slot="label"
            >{{ sc.label }}
            <Tooltip :content="sc.help" :transfer="true">
              <Icon type="ios-information-outline"></Icon>
            </Tooltip>
          </span>
          <component
            class="ep-widget-control"
            :is="flatWidgets[sc.widget].View"
            :schema="schema.list[index]"
            @on-event="onEvent"
          ></component>
          <div class="ep-widget-description" v-if="sc.description">
            {{ sc.description }}
          </div>
          <div
            class="epiv-widget-dynamic-remove ep-icon ep-icon-minus"
            title="删除"
            @click="onOriginDynamicRemove($event, schema, index)"
          ></div>
        </FormItem>
        <FormItem
          v-if="schema.list.length !== 0"
          :class="{ 'ep-widget-item-fullcol': !schema.label }"
          label=" "
        >
          <Button
            type="dashed"
            style="margin-top: 5px"
            :size="schema.size || rootSchema.size"
            @click="onOriginDynamicAdd($event, schema)"
            >添加</Button
          >
        </FormItem>
      </template>
    </template>
  </div> -->
</template>
<script>
import { defineComponent } from "vue";
import { Input } from "ant-design-vue";
export default defineComponent({
  name: "EpWidgetItem",
  components: {
    // AInput: Input,
  },
  props: {
    schema: {
      type: Object,
      default: () => ({}),
    },
    selectedSchema: {
      type: Object,
      default: () => ({
        key: "",
      }),
    },
    flatWidgets: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      value: "",
    };
  },
  computed: {
    store() {
      return this.$root.$options.extension.store;
    },
    cls() {
      return {
        // "ep-widget-selected": this.schema.key === this.selectedSchema.key,
        "ep-widget-container": this.schema.container,
        "ep-widget-selected": true,

        "ep-widget-item-handle": true,
      };
    },
    tab() {
      return this.store.getTab();
    },
  },
  created() {
    console.log(this.flatWidgets);
  },
});
</script>

<style lang="scss" scoped>
// @import url("../styles/main.scss");
@import "../styles/widgets.scss";
</style>
