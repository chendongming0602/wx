// components/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabCount: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [
      {
        name: "最爱",
        url: "https://lovers-1300783623.cos.ap-shanghai.myqcloud.com/web/tab/tab1.png",
        urlNo: "https://lovers-1300783623.cos.ap-shanghai.myqcloud.com/web/tab/notab1.png"
      },
      {
        name: "分类",
        url: "https://lovers-1300783623.cos.ap-shanghai.myqcloud.com/web/tab/tab2.png",
        urlNo: "https://lovers-1300783623.cos.ap-shanghai.myqcloud.com/web/tab/notab2.png"
      },
      {
        name:"互动",
        url: "https://lovers-1300783623.cos.ap-shanghai.myqcloud.com/web/tab/tab3.png",
        urlNo: "https://lovers-1300783623.cos.ap-shanghai.myqcloud.com/web/tab/notab3.png"
      },
      {
        name: "我的",
        url: "https://lovers-1300783623.cos.ap-shanghai.myqcloud.com/web/tab/tab4.png",
        urlNo: "https://lovers-1300783623.cos.ap-shanghai.myqcloud.com/web/tab/notab4.png"
      }
    ],
    // count:1
  },
  attached() {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    tabEvent(e) {
      let { index } = e.currentTarget.dataset;
      this.triggerEvent("tabIdex", index);

    }
  }
})
