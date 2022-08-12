// import pcWidgets, { entry as pcEntry } from "../renderer";
import { render, helper } from "../core";
import pcWidgets, { entry as pcEntry } from "../renderer";
import schema from "./schema.json";
export default {
  env: "production",
  // el: document.getElementById('id'),
  // 以下3个属性将移动到 pc | h5属性中
  widgets: pcWidgets,
  Render: render.VueRender,
  component: pcEntry,

  schema,
  panels: {
    footer: {},
    // tool: false,
    tool: {
      // render: function({ el, store, ctx }) {
      //   el.innerHTML ='tool'
      // },
      // style: 'font-size: 40px;'
    },
    // setting: false,
    // setting: {
    //   // render: function ({ el, store, ctx }) {
    //   //   el.innerHTML = 'sss'
    //   // },
    //   style: ''
    // },
    //   // 自定义顶栏面板
    // header: false
    header: {
      // render: function ({ el, store, ctx }) {
      //   console.log(11, el, store)
      //   new Vue({
      //     data () {
      //       return {
      //         title: 'ssss'
      //       }
      //     },
      //     template: '<div style="border-bottom: 1px solid #ddd;"><h2>{{title}}<button @click="click">click</button></h2></div>',
      //     mounted () {
      //       console.log(this.title)
      //     },
      //     methods: {
      //       click () {
      //         ctx.$emit('change-view', 'h5')
      //         console.log('clicked: ', this.title)
      //       }
      //     }
      //   }).$mount(el)
      // },

      // left: {
      //   // render: function({ el, store, ctx }) {
      //   //   console.log(9999, el)
      //   //   el.innerText = 'Epage演示示例'
      //   // },
      //   // style: 'color:#f00'
      // },
      center: {
        // render: function({ el, store, ctx }) {
        //   return 'PC + H5'
        // },
        // style: 'font-size: 20px;'
      },
      right: {
        // logic: false,
        // schema: false,
        // preview: false,
        // help: false,
        // render: function({ el, store, ctx }) {
        // },
        style: "",
      },
      // style: 'color: red;',
      // render: function(el, store) {
      // }
    },
  },
  // 默认渲染视图，pc还是h5
  view: "pc", // pc | h5,
  //   h5: {
  //     component: h5Entry,
  //     widgets: h5Widgets,
  //     Render: render.VueRender,
  //   },
  pc: {
    component: pcEntry,
    widgets: pcWidgets,
    Render: render.VueRender,
  },
};
