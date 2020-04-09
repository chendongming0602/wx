//app.js
import { config } from './utils/config.js';
try {
  wx.cloud.init({
    traceUser: true,
    env: config.cloudId
  });
} catch (err) { }
App({
  onLaunch: function () {
    // this.loginEvent();
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
