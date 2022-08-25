<template>
  <Table :columns="columns" :data-source="tabled"></Table>
</template>
<script>
import viewExtend from '../../extends/view'
import { Table } from 'ant-design-vue'

export default {
  extends: viewExtend,
  components: {
    Table,
  },
  data() {
    return {
      worker: null,
      columns: [
        {
          name: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
        },
        {
          title: 'Action',
          key: 'action',
        },
      ],
      tabled: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ],
    }
  },
  computed: {
    pageClass() {
      let pos = 'left'
      const positions = 'left|center|right'.split('|')
      const { position } = this.schema.option.page

      if (positions.indexOf(position) > -1) {
        pos = position
      }
      return `epiv-table-page-${pos}`
    },
  },
  mounted() {
    this.listenerMessage()
    this.getDynamicData()
  },
  methods: {
    getColumns() {
      const columns = this.schema.option.columns || []
      const result = columns.map((col) => {
        col.render = 'return params.row.name'
        const newCol = { ...col }
        if (!('render' in newCol)) return newCol
        if (!newCol.render) {
          newCol.render = undefined
        } else {
          /* eslint-disable no-new-func */
          newCol.render = new Function('h', 'params', newCol.render)
        }
        return newCol
      })
      return [...result]
    },
    tableData() {
      const { page = {}, dynamicData } = this.schema.option
      const tab = this.store.getTab()
      let result = []
      if (tab !== 'design') {
        result = dynamicData.slice(0, page.size)
      }
      return result
    },

    listenerMessage() {
      this.worker.onmessage = (e) => {
        const { message, success, data } = e.data

        if (success) {
          const { key } = this.schema
          const option = { page: data.page, dynamicData: data.data }

          this.store.updateWidgetOption(key, option)
        } else {
          console.log('error: ', message)
        }
        this.worker.terminate()
      }
    },
  },
}
</script>
