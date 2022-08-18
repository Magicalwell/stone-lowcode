<template>
  <div class="ep-header-container">
    <div
      class="ep-header"
      v-if="header.render"
      ref="header"
      :style="header.style || ''"
    ></div>
    <div class="ep-header" v-else :style="header.style || ''">
      <div
        class="ep-header-left"
        v-if="header.left &amp;&amp; header.left.render"
        ref="left"
        :style="(header.left || {}).style || ''"
      ></div>
      <div
        class="ep-header-left"
        v-else
        :style="(header.left || {}).style || ''"
      >
        EasePageCreator
      </div>
      <div
        class="ep-header-center"
        v-if="header.center &amp;&amp; header.center.render"
        ref="center"
        :style="(header.center || {}).style || ''"
      ></div>
      <div
        class="ep-header-center"
        v-else
        :style="(header.center || {}).style || ''"
      >
        <!-- <RadioGroup
          v-if="ready.pc &amp;&amp; ready.h5"
          v-model="designView.view"
          type="button"
          size="small"
          @on-change="onChangeView"
        >
          <Radio label="pc">PC</Radio>
          <Radio label="h5">H5</Radio>
        </RadioGroup> -->
        <RadioGroup
          v-model:value="test.view"
          button-style="solid"
          @change="onChangeView"
        >
          <RadioButton value="pc">pc</RadioButton>
          <RadioButton value="h5">h5</RadioButton>
        </RadioGroup>
      </div>
      <div
        class="ep-header-right"
        v-if="header.right &amp;&amp; header.right.render"
        ref="right"
        :style="(header.right || {}).style || ''"
      ></div>
      <div
        class="ep-header-right"
        v-else
        :style="(header.right || {}).style || ''"
      >
        <Button
          class="ep-header-right-item"
          size="small"
          type="ghost"
          @click="onShowLogic"
          >logic</Button
        >
        <Button
          class="ep-header-right-item"
          size="small"
          type="ghost"
          @click="onShowSchema"
          >schema</Button
        >
        <Button
          class="ep-header-right-item"
          size="small"
          type="ghost"
          @click="onPreview"
          >预览</Button
        >
        <!-- <a
          class="ep-header-right-item"
          href="http://epage.didichuxing.com"
          target="_blank"
          ><i class="ep-icon ep-icon-help"></i><span>&nbsp;帮助</span></a
        > -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs } from "vue";
import { RadioGroup, RadioButton, Button } from "ant-design-vue";
export default defineComponent({
  components: {
    RadioGroup,
    RadioButton,
    Button,
  },
  props: {
    header: {
      type: Object,
      default: () => ({}),
    },
    store: {
      type: Object,
      default: () => ({ state: {} }),
    },
    designView: {
      type: Object,
      default: () => ({
        view: "pc",
      }),
    },
    ready: {
      type: Object,
      default: () => ({
        pc: false,
        h5: false,
      }),
    },
  },
  setup(props) {
    const { designView: test } = toRefs(props);
    return { test };
  },
  mounted() {
    // if (this.header.render) {
    //   this.renderRef(this, 'header')
    // } else {
    //   this.renderRef(this.header, 'left')
    //   this.renderRef(this.header, 'center')
    //   this.renderRef(this.header, 'right')
    // }
  },
  methods: {
    renderRef(obj, ref) {
      console.log(obj, ref);
      if (!obj[ref] || typeof obj[ref].render !== "function") return;
      const el = this.$refs[ref];
      const ctx = { $emit: this.$emit.bind(this) };
      const { store } = this;

      obj[ref].render({ el, store, ctx });
    },
    onChangeView(view) {
      this.$emit("change-view", view);
    },
    onPreview() {
      this.$emit("preview");
    },
    onShowSchema() {
      this.$emit("show-schema");
    },
    onShowLogic() {
      this.$emit("show-logic");
    },
    onChangeLange(lang) {
      this.$emit("change-lang", lang);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "../../styles/panel/header.scss";
</style>
