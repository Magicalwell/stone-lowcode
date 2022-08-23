<template>
  <SettingForm :store="store" :key-list="keyList"></SettingForm>
</template>
<script>
import settingExtend from '../../extends/setting'

export default {
  extends: settingExtend,
  methods: {
    onMoveUp (index) {
      const key = this.selectedSchema.key
      this.store.moveWidgetChild(key, index - 1, index)
    },
    onMoveDown (index) {
      const key = this.selectedSchema.key
      this.store.moveWidgetChild(key, index, index + 1)
    },
    onRemove (index) {
      const key = this.selectedSchema.key
      this.store.removeWidgetChild(key, index)
    },
    onAdd (index) {
      const key = this.selectedSchema.key
      this.store.addWidgetChild(key, index, { span: 12, list: [] })
    }
  }
}
</script>
