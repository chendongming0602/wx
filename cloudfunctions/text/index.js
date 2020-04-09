// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {//检验评论文字是否合格
    let res = await cloud.openapi.security.msgSecCheck({
      content: event.text
    });
    return res
  } catch (err) {
    return err
  }

}