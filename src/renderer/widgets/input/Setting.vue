<template>
  <SettingForm :store="store" :key-list="keyList"></SettingForm>
</template>
<script>
import settingExtend from "../../extends/setting";
import SettingForm from "../../setting-form/index.vue";
import { defineComponent, markRaw } from "vue";
export default defineComponent({
  extends: settingExtend,
  components: {
    SettingForm: markRaw(SettingForm),
  },
  data() {
    return {
      keyList: ["key", "placeholder", "label"],
    };
  },
});
</script>
