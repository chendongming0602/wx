// components/pop/pop.js
const att=function(){
    this.setData({open:true});
};
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
    lifetimes: {
        attached: att,
    },
    attached: att,
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
        close() {
            this.setData({open:false});
            setTimeout(()=>{this.triggerEvent("close")},500);
        }
    }
})
