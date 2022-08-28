import BaseSchema from "../../BaseSchema";

export default class TableSchema extends BaseSchema {
  constructor(props) {
    super();
    this.label = "表格";
    this.labelOptions = {
      width: "80px",
      "text-align": "left",
      hidden: false,
    };
    this.option = {
      type: "static",
      columns: [
        {
          title: "序号",
          customRender: ({ index }) => index + 1,
          align: "left",
          key:'index'
        },
      ],
      page: {
        total: 0,
        current: 1,
        size: 10,
        showTotal: true,
        position: "right",
      },
      data: [],
      dynamicData: [],
      noDataText: "暂无内容",
    };
    this.create(props);
  }
}

// 静态配置，同类widget公有
Object.assign(TableSchema, {
  title: "表格",
  widget: "table",
  preview: "",
  logic: {
    // value: [],
    // event: []
  },
});
