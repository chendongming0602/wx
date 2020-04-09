//index.js
const app = getApp()

Page({
  data: {
    tabCount: 0,//选择的tab
    tabIf: [false, false, false, false,],
  },
  tabIdex(e){//tab触发
    let count = e.detail;
    this.tabTwo(count)
  },
  tabTwo(count) {//控制tab切换
    this.setData({
      tabCount: count,
      [`tabIf[${count}]`]: true
    });
  },
  onLoad: function() {
    this.setData({
      [`tabIf[${this.data.tabCount}]`]: true
    });
  },
  
})
