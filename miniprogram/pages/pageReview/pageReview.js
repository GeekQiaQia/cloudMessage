// pages/pageReview/pageReview.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleSrc: "",
    pageId:"",
    pageTitles: []
  },
  toGetCurrentPage:function(){
    let that=this;
    let pageTitles=this.data.pageTitles
    console.log(this.data.pageTitles,this.data.articleSrc);
    let result =pageTitles.filter((item)=>{
        return item._id===that.data.pageId
    });
    console.log(result);
    this.setData({
    
      articleSrc:result[0].createInfo.articleSrc
    });
    console.log(this.data.articleSrc);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.pageTitles);
    this.setData({
     
      pageId: options.id,
      pageTitles: app.globalData.pageTitles
    })
    this.toGetCurrentPage();
    
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