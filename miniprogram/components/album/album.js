// components/album/album.js
const APP = getApp();
import gf from "../../utils/gf";
let time1 = null, time2 = null, time3 = null;
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
    canvasHeight: 0,
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closeIsAllAlbum() {
      this.setData({ isShow: false });
      this.triggerEvent("textShow", {});
    },
    isShowEvent(e) {
      this._count = e.count;//选择的数量
      this.setData({ isShow: true });
    },
    // 压缩图片，当图片超过1mb时
    compressImage(temp) {
      let pmi = null;
      console.log(temp.size, "大100000就压缩")
      if (temp.size > 100000) {
        APP.loadShow("图片压缩中~");
        pmi = new Promise((reslove, reject) => {
          wx.getImageInfo({
            src: temp.path,
            success: res => {
              let { width, height } = res,
                ctx = wx.createCanvasContext('compress', this);
              height = height * (750 / width);
              ctx.height = height;
              // 可能它渲染还需要等一下
              this.setData({
                canvasHeight: height
              }, () => {
                time1 = setTimeout(() => {
                  ctx.drawImage(temp.path, 0, 0, 750, height);
                  ctx.draw(false, () => {
                    // 据说某些机型需要等待
                    time2 = setTimeout(() => {
                      wx.canvasToTempFilePath({
                        canvasId: 'compress',
                        fileType: 'jpg',
                        quality: 0.5,
                        destWidth: 750,
                        destHeight: height,
                        success: res => {
                          reslove(res.tempFilePath)
                        },
                        fail: reject
                      }, this);
                    }, 500);
                  });
                }, 500);
              });
            },
            fail: reject
          });
        })


        // wx.showLoading({title: '正在压缩图片', mask: true});

      } else {
        pmi = Promise.resolve(temp.path)
      }
      return pmi
    },
    cameraHandler() {
      wx.chooseImage({
        count: this._count,
        sizeType: ['original', 'compressed'],
        sourceType: ['camera'],
        success: (res) => {
          let img = res.tempFiles;
          this.getAlbum(img)
        }
      })
    },
    albumHandler() {
      wx.chooseImage({
        count: this._count,
        sizeType: ['original', 'compressed'],
        sourceType: ['album'],
        success: (res) => {
          let img = res.tempFiles;
          this.getAlbum(img)
        }
      })
    },
    async getAlbum(img) {
      if (this.isImg(img)) return APP.toastShow("请选择图片类型~");
      let arr = img.map(t => {
        return this.compressImage(t)
      });

      try { arr = await Promise.all(arr); } catch (err) { return APP.toastShow("图片压缩失败~"); }

      //给定时，以防审核太久
      time3 = setTimeout(() => {
        wx.hideLoading();
        this.closeIsAllAlbum();
        this.triggerEvent("albumEvent", { arr });
        this._ups = true;
        console.log("走了定时")
      }, 5000);
      try {
        await Promise.all(arr.map(t => { return gf.isAlbum(t) }));
      } catch (err) {
        clearTimeout(time3)
        if (this._ups) return this._ups = false;
        return APP.toastShow("图片存在违规可能性，请更换~");
      }
      clearTimeout(time3);
      if (this._ups) return this._ups = false;
      console.log("走了正常")
      wx.hideLoading();
      this.closeIsAllAlbum();
      this.triggerEvent("albumEvent", { arr });
    },
    isImg(res) {//判断是否是图片类型(true==不合格)
      let reg = /\.(png|jpg|jpeg)(\?.*)?$/, isJpg = res.map(t => {
        return reg.test(t.path)
      }).some(t => !t);
      return isJpg;
    },
  }
})
