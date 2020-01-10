//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
      

    // 在全局去请求配置的文章链接和信息；
    this.globalData = {
      pageTitles: [
        { _id:"1",titleInput: "寻匠心 | 朋友圈消失2年，他带回34省市简称字体，《人民日报》点赞，看看你的家乡有多美！",
        articleSrc: "https://mp.weixin.qq.com/s/GRfIFPCRkyc5K_izevK4tw" },

        { _id:"2",titleInput: "在人间 | 93岁奶奶恶搞27岁孙子，一夜爆红，狂吸1300万人围观：这个奶奶真酷",
        articleSrc: "https://mp.weixin.qq.com/s/nLmBquPTjIBy1hQGHw7CfA"  }]
    }
  }
})
