<template>
  <div class="ep-fullscreen" v-show="visible">
    <div class="ep-fullscreen-header" v-if="$slots.header">
      <slot name="header"></slot>
      <span class="ep-fullscreen-close" @click="onClose">
        <CloseCircleOutlined />
      </span>
    </div>
    <div class="ep-fullscreen-body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { CloseCircleOutlined } from '@ant-design/icons-vue'
export default {
  components: {
    CloseCircleOutlined,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClose() {
      this.$emit('on-close')
    },
  },
}
</script>
<style lang="scss" scoped>
.ep-fullscreen {
  position: fixed;
  z-index: 9;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  transition: 0.3s ease right;
  .ep-fullscreen-header {
    padding-left: 16px;
    padding-right: 16px;
    position: absolute;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ep-fullscreen-close {
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    text-align: center;
    height: 40px;
    line-height: 40px;
    width: 40px;
    font-size: 18px;
    font-weight: 200;
    // background-color:rgba(0,0,0,.1);
    transition: 0.2s ease all;
    color: #666;
    cursor: pointer;
    &:hover {
      color: #000;
      // background-color:rgba(0,0,0,.2);
    }
  }
  .ep-fullscreen-body {
    padding: 16px;
    position: absolute;
    width: 100%;
    overflow: auto;
    top: 40px;
    bottom: 0;
  }
}
</style>
