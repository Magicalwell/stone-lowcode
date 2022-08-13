import types from "../types";
import RootSchema from "../../schema/RootSchema";
import { flattenSchema } from "../../helper";
export default {
  [types.$ROOT_SCHEMA_FLAT](state, { rootSchema }) {
    state.rootSchema = rootSchema;
    state.flatSchemas = flattenSchema(rootSchema);
  },
  [types.$ROOT_SCHEMA_SET](state, { rootSchema }) {
    const { flatWidgets } = this.getters;
    const model = {}; // 最终值
    const defaultModel = {}; // 根据schema实例定义的默认值
    const _rootSchema = new RootSchema({
      schema: rootSchema,
      widgets: flatWidgets,
    });
    // 初始化 model
    state.rootSchema = Object.assign({}, state.rootSchema, _rootSchema);
    this.commit(types.$ROOT_SCHEMA_FLAT, { rootSchema: state.rootSchema });  // 考虑将合并与赋值放在一个操作里面
  },
};
