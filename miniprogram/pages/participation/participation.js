// pages/participation/participation.js
// ../room/room   进入聊天室
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    isCard:true,
    pageTitles:[]
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      console.log(userInfo);
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  isCard(e) {
    console.log(e);
    this.setData({
      isCard: e.detail.value
    })
  },
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  handleArticleTap(e){
    console.log(e);
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../pageReview/pageReview?id=' + id,
 
      success: function (res) {
       console.log(res);
      }
    })
  },
  /**
   * @description:合并两个数组且去重；
   * 
  */
  uniqueArr:function(arr1,arr2){
    arr1.push(...arr2);
    return [...new Set(arr1)]
  },
  // 查询数据库数据；

  onQuery: async function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 pageTitles
    await db.collection('pageTitles').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        // this.setData({
        //   queryResult: JSON.stringify(res.data, null, 2)
        // })
        // 返回的res.data 数组类型；
        console.log('[数据库] [查询记录] 成功: ', res)
        app.globalData.pageTitles=this.uniqueArr(app.globalData.pageTitles, res.data);
        
        this.setData({
          pageTitles: res.data
        });
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log(res);
          wx.getUserInfo({
            success: res => {
              console.log(res);
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    });
    this.onQuery();
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onQuery();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})