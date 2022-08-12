import types from "../types";
import RootSchema from "../../schema/RootSchema";
export default {
  [types.$ROOT_SCHEMA_SET](state, { rootSchema }) {
    console.log(state.widgets);
    console.log(this.getters, "rootSchemarootSchemarootSchema");
    const { flatWidgets } = this.getters;
    const model = {}; // 最终值
    const defaultModel = {}; // 根据schema实例定义的默认值
    // const _rootSchema = new RootSchema({
    //   schema: rootSchema,
    //   widgets: flatWidgets,
    // });
    console.log(flatWidgets);
  },
};
