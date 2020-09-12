//app.js
import { config } from './utils/config.js';
try {
  wx.cloud.init({
    traceUser: true,
    env: config.cloudId
  });
} catch (err) { }
App({
  nav: {//自定义导航
    Custom:{},
    CustomBar:64,
    StatusBar:20,
    is:false
  },
  onLaunch: function () {
    // this.loginEvent();
  },
  navEvent(){
    return new Promise((resolve,reject)=>{
      if(this.nav.is) return resolve(this.nav);
      wx.getSystemInfo({//自定义导航
        success: e => {
          // 是否为iPhoneX
          // -1 < e.model.indexOf("iPhone X") && (this.isX = !0);
          this.nav.StatusBar = e.statusBarHeight;
          let capsule = wx.getMenuButtonBoundingClientRect();
          if (capsule) {
            this.nav.Custom = capsule;
            this.nav.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;//整体高度
          } else {
            this.nav.CustomBar = e.statusBarHeight + 50;//整体高度
          };
          this.nav.is=true;
          resolve(this.nav)
          // console.log(this.nav)
        }
      });
    });
  },
  loginEvent(){//登录请求不走封装（以防登录失效重新登录继续之前的请求）
    return new Promise((resolve,reject)=>{
      wx.login({
        success: res => {
          wx.request({
            url: `${config.apiHost}/wx/wxLogin`,
            method: "POST",
            data: {
              code: res.code
            },
            success: user => {
              let datas = user.data;
              if (datas.code === 1) {
                wx.setStorageSync("tokens", datas.data.token);
                return resolve();
              }
              reject();
            }
          })
        }
      });
    });
  },
  request({ path = '/', method, data }) {//封装的请求
    let tokens = "";
    try {
      tokens = wx.getStorageSync("tokens");
    } catch (err) {
      console.log("获取缓存token失败", tokens)
    }
    return new Promise((resolve, reject) => {
      const headers = {
        "XX-Wxapp-AppId": config.appid,
        "XX-Token": tokens ? tokens : '',
        "XX-Api-Version": config.version,
        "XX-Device-Type": config.deviceType
      };
      wx.request({
        url: `${config.apiHost}${path}`,
        method: method || 'GET',
        header: headers,
        data: data || {},
        success: res => {
          console.log(res)
        },
        fail: reject
      });
    });
  },
  uploadFile({ path = "/", data, segment = 0, }) {//封装的图片上上传请求
    let tokens = "";
    try {
      tokens = wx.getStorageSync("tokens");
    } catch (err) {
      console.log("获取缓存token失败", tokens)
    };
    const headers = {
      "XX-Wxapp-AppId": config.appid,
      "XX-Token": tokens ? tokens : '',
      "XX-Api-Version": config.version,
      "XX-Device-Type": config.deviceType
    };
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: `${config.apiHost}${path}`,
        filePath: data,
        name: 'file',
        header: headers,
        formData: {
          segment,//是否为抠图，1抠，0不抠
        },
        success: res => {
          if (res.statusCode === 200) {
            resolve(res)
          } else {
            reject();
          }
        },
        fail: reject
      })
    })
  },
  loadShow(e = "加载中...", mask = true) {
    wx.showLoading({
      title: e,
      mask: mask
    });
  },
  toastShow(e = "提示") {
    wx.showToast({
      title: e,
      icon: "none",
      duration: 2000
    });
  },
})
