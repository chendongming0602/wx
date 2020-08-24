// components/nav/nav.js
const APP=getApp(),
att=function(){
  APP.navEvent().then(nav=>{
    this.setData(nav)
  })
};
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
   
  },
  lifetimes: {
    attached: att,
  },
  attached: att,
  /**
   * 组件的方法列表
   */
  methods: {
    myIndex(){
      this.triggerEvent('myIndex', {});
    }
  }
})
