// components/pop/pop.js
Component({
    options: {
        multipleSlots: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        direction: {
            type: String,
            value: "below"
        },
        width: {
            type: Number,
            value: 100
        },
        is_close: {
            type: Boolean,
            value: true
        },
        is_mask: {
            type: Boolean,
            value: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        open: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        show() {
            this.setData({open:true});
        },
        close() {
            this.setData({open:false});
        }
    }
})
