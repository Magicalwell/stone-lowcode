<template>
  <div class="home" id="lowcode_edit" ref="lowcode_edit">11</div>
</template>

<script>
import { defineComponent } from "vue";
import Epage from "./entry";
import config from "./editConfig";

export default defineComponent({
  name: "Home",
  components: {},
  data() {
    return {
      epage: {},
    };
  },
  mounted() {
    const el = this.$refs.lowcode_edit;
    const option = { ...config, el };
    // 设计器
    this.epage = new Epage(option);
    window.ee = this.epage;
    // this.epage.$render.store.updateModel(this.model);
  },
});
</script>
