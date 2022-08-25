<template>
  <SettingForm :store="store" :key-list="keyList"></SettingForm>
</template>
<script>
import settingExtend from '../../extends/setting'

const defaultCol = (index) => ({
  type: 'html',
  title: `标题${index + 1}`,
  key: '',
  align: 'left',
})
export default {
  extends: settingExtend,
  methods: {
    onMoveUp(index) {
      const { key, option } = this.selectedSchema
      const columns = [...option.columns]
      columns.splice(
        index - 1,
        1,
        ...columns.splice(index, 1, columns[index - 1])
      )

      this.store.updateWidgetOption(key, { columns })
    },

    onMoveDown(index) {
      const { key, option } = this.selectedSchema
      const columns = [...option.columns]
      columns.splice(index, 1, ...columns.splice(index + 1, 1, columns[index]))

      this.store.updateWidgetOption(key, { columns })
    },

    onDelete(index) {
      const { key, option } = this.selectedSchema
      option.columns.splice(index, 1)

      this.store.updateWidgetOption(key, { columns: option.columns })
    },

    onAdd(index) {
      const { key, option } = this.selectedSchema
      const defaultValue = defaultCol(index)
      option.columns.splice(index + 1, 0, defaultValue)

      this.store.updateWidgetOption(key, { columns: option.columns })
    },

    onSuccess(res) {
      // TODO: should check format about response
      const { key, option: schemaOption } = this.selectedSchema
      const page = Object.assign({}, schemaOption.page, res.page)
      const option = {
        page,
        dynamicData: res.data,
      }

      this.store.updateWidgetOption(key, option)
    },
  },
}
</script>
