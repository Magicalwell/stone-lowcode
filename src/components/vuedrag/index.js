import { defineComponent, h, nextTick } from "vue";
import { computeComponentStructure } from "./renderHelper";
import {
  getComponentAttributes,
  createSortableOption,
} from "./componentBuilderHelper";
import Sortable from "sortablejs";
function emit(evtName, evtData) {
  nextTick(() => this.$emit(evtName.toLowerCase(), evtData));
}

function manage(evtName) {
  return (evtData, originalElement) => {
    if (this.realList !== null) {
      return this[`onDrag${evtName}`](evtData, originalElement);
    }
  };
}
function manageAndEmit(evtName) {
  const delegateCallBack = manage.call(this, evtName);
  return (evtData, originalElement) => {
    delegateCallBack.call(this, evtData, originalElement);
    emit.call(this, evtName, evtData);
  };
}
let draggingElement = null;
const dragComponent = defineComponent({
  props: {
    list: {
      type: Array,
      required: false,
      default: null,
    },
    modelValue: {
      type: Array,
      required: false,
      default: null,
    },
    itemKey: {
      type: [String, Function],
      required: true,
    },
    clone: {
      type: Function,
      default: (original) => {
        return original;
      },
    },
    tag: {
      type: String,
      default: "div",
    },
    move: {
      type: Function,
      default: null,
    },
    componentData: {
      type: Object,
      required: false,
      default: null,
    },
  },
  render() {
    const { $slots, $attrs, tag, componentData, realList, getKey } = this;
    const componentStructure = computeComponentStructure({
      $slots,
      tag,
      realList,
      getKey,
    });
    this.componentStructure = componentStructure;
    const attributes = getComponentAttributes({ $attrs, componentData });
    console.log(componentStructure, "attributesattributesattributesattributes");
    return componentStructure.render(h, attributes);
  },
  mounted() {
    const { $attrs, $el, componentStructure } = this;
    componentStructure.updated();

    const sortableOptions = createSortableOption({
      $attrs,
      callBackBuilder: {
        manageAndEmit: (event) => manageAndEmit.call(this, event),
        emit: (event) => emit.bind(this, event),
        manage: (event) => manage.call(this, event),
      },
    });
    console.log("噢噢噢噢哦哦哦");
    const targetDomElement = $el.nodeType === 1 ? $el : $el.parentElement;
    this._sortable = new Sortable(targetDomElement, sortableOptions);
    // this.targetDomElement = targetDomElement;
    // targetDomElement.__draggable_component__ = this;
    // const sortable = new Sortable(this.$refs.vuedrag, {
    //   handle,
    //   draggable,
    //   ghostClass,
    //   sort: true,
    //   animation: 150,
    //   easing: "cubic-bezier(1, 0, 0, 1)",
    //   group: "g1",
    //   list: this.list,
    //   fallbackOnBody: true,
    //   onAdd: (...arg) => {
    //     console.log(arg);
    //   },
    // });
  },
  computed: {
    realList() {
      const { list } = this;
      return list ? list : this.modelValue;
    },
    getKey() {
      const { itemKey } = this;
      if (typeof itemKey === "function") {
        return itemKey;
      }
      return (element) => element[itemKey];
    },
  },
  methods: {
    onDragStart(evt, Element) {
      this.context = this.getUnderlyingVm(evt.item);
      evt.item._underlying_vm_ = this.clone(this.context.element);
      draggingElement = evt.item;
      console.log(evt, Element);
    },
    onDragMove(evt, originalEvent) {
      const { move, realList } = this;
      console.log(move, realList);
      if (!move || !realList) {
        return true;
      }

      const relatedContext = this.getRelatedContextFromMoveEvent(evt);
      const futureIndex = this.computeFutureIndex(relatedContext, evt);
      const draggedContext = {
        ...this.context,
        futureIndex,
      };
      const sendEvent = {
        ...evt,
        relatedContext,
        draggedContext,
      };
      return move(sendEvent, originalEvent);
    },

    onDragEnd() {
      draggingElement = null;
    },
  },
});
export default dragComponent;
