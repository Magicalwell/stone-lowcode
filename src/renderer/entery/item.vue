<template>
  <div
    class="epc-widget-item"
    :class="cls"
    @click="onOriginViewSelect($event, schema)"
  >
    <div class="epc-widget-item-name">
      {{ schema.name }}
    </div>
    <div v-if="tab === 'design'">
      <div class="epc-widget-btn epc-widget-btn-delete">
        删除
      </div>
      <div
        class="epc-widget-btn epc-widget-btn-clone"
        @click="onCopyWidget($event, schema)"
      >
        复制
      </div>
      <div class="epc-widget-btn epc-widget-btn-move">
        移动
      </div>
    </div>
    <!-- 有嵌套的情况下 -->
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
              <!-- 区分渲染设计模式和预览模式 -->
              <template v-if="tab !== 'design'">
                <ep-widget-item
                  v-for="child in item.list"
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
                v-else
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
                  <template v-else>
                    <ep-widget-item
                      v-for="child in item.list"
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
        <template v-else>
          <div
            v-for="(sub, s) in schema.list"
            style="position: relative"
            :key="s"
          >
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
                    v-for="child in item.list"
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
        <AButton
          v-show="schema.dynamic"
          type="dashed"
          style="margin-top: 5px"
          :size="schema.size || rootSchema.size"
          @click="onOriginDynamicAdd($event, schema)"
          >添加</AButton
        >
      </template>
    </template>
    <template v-else>
      <div
        v-if="!schema.dynamic || tab === 'design'"
        class="epc-widget-item-default"
        :class="{ 'ep-widget-item-full': !schema.label }"
        :label="schema.label"
        :prop="schema.key"
      >
        <span v-if="schema.label" class="epc-widget-item-label">{{
          schema.label
        }}</span>
        <!-- 这个地方的component把实例转成了响应式对象 需要优化 -->
        <component
          class="ep-widget-instance"
          :is="flatWidgets[schema.widget].View"
          :schema="schema"
          @on-event="onEvent"
        ></component>
        <div class="epc-widget-description" v-if="schema.description">
          {{ schema.description }}
        </div>
        <AButton
          v-if="schema.dynamic"
          style="margin-top: 5px"
          :size="schema.size || rootSchema.size"
          type="dashed"
          >添加</AButton
        >
      </div>
      <template v-else>
        <!-- list为空的情况 -->
        <div
          v-if="schema.list.length === 0"
          :class="{ 'epc-widget-item-full': !schema.label }"
          :label="schema.label"
        >
          <AButton
            style="margin-top: 5px"
            :size="schema.size || rootSchema.size"
            type="dashed"
            @click="onOriginDynamicAdd($event, schema)"
            >添加</AButton
          >
        </div>
        <div
          v-for="(sc, index) in schema.list"
          :key="sc.key"
          :class="{ 'epc-widget-item-full': !sc.label }"
          :label="index === 0 ? schema.label : undefined"
          :prop="sc.key"
        >
          <span v-if="sc.help"
            >{{ sc.label }}
            <!-- <Tooltip :content="sc.help" :transfer="true">
              <Icon type="ios-information-outline"></Icon>
            </Tooltip> -->
          </span>
          <component
            class="epc-widget-instance"
            :is="flatWidgets[sc.widget].View"
            :schema="schema.list[index]"
            @on-event="onEvent"
          ></component>
          <div class="epc-widget-description" v-if="sc.description">
            {{ sc.description }}
          </div>
          <div
            class="epc-view-widget-remove"
            title="删除"
            @click="onOriginDynamicRemove($event, schema, index)"
          ></div>
        </div>
        <div
          v-if="schema.list.length !== 0"
          :class="{ 'epc-widget-item-full': !schema.label }"
          label=" "
        >
          <AButton
            type="dashed"
            style="margin-top: 5px"
            :size="schema.size || rootSchema.size"
            @click="onOriginDynamicAdd($event, schema)"
            >添加</AButton
          >
        </div>
      </template>
    </template>
  </div>
</template>
<script>
import { defineComponent, markRaw } from 'vue'
import { Button, Col, Row } from 'ant-design-vue'
import vueDrag from './vuedrag.vue'
export default defineComponent({
  name: 'EpWidgetItem',
  components: {
    vueDrag,
    AButton: markRaw(Button),
    Col,
    Row,
  },
  props: {
    schema: {
      type: Object,
      default: () => ({}),
    },
    selectedSchema: {
      type: Object,
      default: () => ({
        key: '',
      }),
    },
    flatWidgets: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      markRaw,
      value: '',
      testList: [
        { id: 1, label: '11111' },
        { id: 2, label: '22222' },
      ],
    }
  },
  computed: {
    store() {
      return this.$root.$options.extension.store
    },
    cls() {
      return {
        'epc-widget-selected': this.schema.key === this.selectedSchema.key,
        'epc-widget-container': this.schema.container,
        // "ep-widget-item-handle": this.tab === "design",
        // "ep-widget-selected": true,
        // "ep-widget-item-handle": true,
      }
    },
    tab() {
      return this.store.getTab()
    },
  },
  created() {
    console.log(this.flatWidgets, this.schema, '+++++++++++++++++++++++')
  },
  methods: {
    getPlaceholderCls() {
      const placeholder =
        !Object.keys(this.$slots).length && this.tab === 'design'
      return placeholder ? 'ep-widget-grid-placeholder' : ''
    },
    onEvent(key, eventType, ...args) {
      // this.dispatchEvent(key, eventType);
      this.$emit('on-event', ...arguments)
    },
    onOriginViewSelect(e, schema) {
      // 预览模式下，为了级联、下拉框菜单点击空白处收起，需要事件冒泡到document
      // this.store.getTab() === "design" && e.stopPropagation();
      console.log('click')
      this.$emit('on-select', schema)
    },
    onCopyWidget(e, schema) {
      e.stopPropagation()
      this.$emit('on-copy', schema)
    },
    onDynamicAdd(){
      console.log('动态数据');
    }
  },
})
</script>

<style lang="scss" scoped>
@import '../styles/main.scss';
@import '../styles/widgets.scss';
</style>
