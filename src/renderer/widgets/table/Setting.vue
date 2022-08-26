<template>
  <div>
    <SettingForm :store="store">
      <FormItem label="配置列" @click="logtest">
        <Table
          size="small"
          :columns="defaultRow"
          :data-source="selectedSchema.option.columns"
          :scroll="{ y: 240 }"
          bordered
          :pagination="false"
        ></Table>
        <Button
          type="primary"
          shape="circle"
          style="margin: 10px 0"
          @click="showTableSetting"
        >
          <template #icon><PlusOutlined /></template>
        </Button>
        <small style="display: block"
          >注:目前静态数据，可配置的字段只有name、address、age</small
        >
      </FormItem>
    </SettingForm>
    <Modal
      v-model:visible="visible"
      :bodyStyle="{ height: '400px', 'overflow-y': 'auto' }"
      title="表格属性配置"
      :destroyOnClose="true"
    >
      确认提交之后全量替换，这里也支持拖拽排序等
      <Form :model="newRow" ref="newRow">
        <Space
          v-for="(item, index) in newRow.data"
          :key="index"
          style="display: flex; margin-bottom: 8px"
          align="baseline"
        >
          <FormItem
            :name="['data', index, 'title']"
            :rules="{
              required: true,
              message: '请输入列标题',
            }"
          >
            <Input v-model:value="item.title" placeholder="列标题" />
          </FormItem>
          <FormItem
            :name="['data', index, 'dataIndex']"
            :rules="{
              required: true,
              message: 'Missing last name',
            }"
          >
            <Input v-model:value="item.dataIndex" placeholder="输入列字段" />
          </FormItem>
          <MinusCircleOutlined @click="removeUser(user)" />
        </Space>
        <FormItem>
          <Button type="dashed" block @click="addFormData">
            <PlusOutlined />
            添加新的一列
          </Button>
        </FormItem>
      </Form>
      <template #footer>
        <Button key="back" @click="handleCancel">取消</Button>
        <Button key="submit" type="primary" @click="handleOk">提交</Button>
      </template>
    </Modal>
  </div>
</template>
<script>
import settingExtend from "../../extends/setting";
import {
  FormItem,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
} from "ant-design-vue";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons-vue";
import { markRaw } from "vue";

const defaultCol = (index) => ({
  type: "html",
  title: `标题${index + 1}`,
  key: "",
  align: "left",
});
const defaultRow = [
  { title: "列标题", dataIndex: "title" },
  { title: "列字段", dataIndex: "dataIndex" },
];
export default {
  extends: settingExtend,
  components: {
    FormItem: markRaw(FormItem),
    Table: markRaw(Table),
    Modal: markRaw(Modal),
    Form: markRaw(Form),
    Space: markRaw(Space),
    Input,
    Button,
    PlusOutlined,
    MinusCircleOutlined,
  },
  data() {
    return {
      defaultRow,
      visible: false,
      newRow: { data: [] },
    };
  },
  methods: {
    onMoveUp(index) {
      const { key, option } = this.selectedSchema;
      const columns = [...option.columns];
      columns.splice(
        index - 1,
        1,
        ...columns.splice(index, 1, columns[index - 1])
      );

      this.store.updateWidgetOption(key, { columns });
    },

    onMoveDown(index) {
      const { key, option } = this.selectedSchema;
      const columns = [...option.columns];
      columns.splice(index, 1, ...columns.splice(index + 1, 1, columns[index]));

      this.store.updateWidgetOption(key, { columns });
    },

    onDelete(index) {
      const { key, option } = this.selectedSchema;
      option.columns.splice(index, 1);

      this.store.updateWidgetOption(key, { columns: option.columns });
    },

    onAdd(index) {
      const { key, option } = this.selectedSchema;
      const defaultValue = defaultCol(index);
      option.columns.splice(index + 1, 0, defaultValue);

      this.store.updateWidgetOption(key, { columns: option.columns });
    },

    onSuccess(res) {
      // TODO: should check format about response
      const { key, option: schemaOption } = this.selectedSchema;
      const page = Object.assign({}, schemaOption.page, res.page);
      const option = {
        page,
        dynamicData: res.data,
      };

      this.store.updateWidgetOption(key, option);
    },
    showTableSetting() {
      this.visible = true;
      this.newRow.data = JSON.parse(
        JSON.stringify(this.selectedSchema.option.columns)
      );
    },
    addFormData() {
      this.newRow.data.push({ title: "", dataIndex: "", id: Date.now() });
    },
    handleOk() {
      const tableValidate = this.$refs.newRow.validate();
      tableValidate.then((val) => {
        this.visible = false;
        val.data.forEach((element) => {
          this.selectedSchema.option.columns.push(element);
        });
      });
    },
    logtest() {
      console.log(this.selectedSchema.option.columns);
    },
  },
};
</script>
