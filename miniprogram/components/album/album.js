// components/album/album.js
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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 压缩图片，当图片超过1mb时
    compressImage(temp) {
      let pmi = null;
      if (temp.size > 100000) {
        APP.loadShow("图片压缩中~", false);
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
    isImg(res) {//判断是否是图片类型(true==不合格)
      let reg = /\.(png|jpg|jpeg)(\?.*)?$/, isJpg = res.map(t => {
        return reg.test(t.path)
      }).some(t => !t);
      return isJpg;
    },
  }
})
