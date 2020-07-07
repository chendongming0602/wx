// components/nav/nav.js
const APP=getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: APP.nav.StatusBar,
    CustomBar: APP.nav.CustomBar,
    Custom: APP.nav.Custom
  },

  /**
   * 组件的方法列表
   */
  methods: {
    myIndex(){
      this.triggerEvent('myIndex', {});
    }
  }
})
