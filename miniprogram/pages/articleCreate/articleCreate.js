// pages/articleCreate/articleCreate.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    titleInput:"", 
    descriptInput:"",
    articleSrc:"", 
    dialogShow: false,
    loading:false,
    creating:"创建",
    showOneButtonDialog: false,
    buttons: [{text: '取消'}, {text: '确定'}],
    oneButton: [{text: '确定'}],
    error: '',
    openid:'',
    descriptInputLen:0

  },
  formSubmit(e){
  
   
    // 如果必填项为空，则提示；
    if(e.detail.value.titleInput===""&& e.detail.value.articleSrc===""){
      this.setData({
        error: '必填项不可为空！'
    })
    }else if(e.detail.value.titleInput===""){
      // 如果为空，则提示；
      this.setData({
        error: '推文标题不可为空！'
        })
    }else if(e.detail.value.articleSrc===""){
        // 如果为空，则提示；
        this.setData({
          error: '推文链接路径不可为空！'
      })
    }else{
      // 校验通过则插入数据库；
      let createInfo=e.detail.value;
      let that=this;
      console.log(createInfo);
       
      this.setData({
        loading:true,
        creating:"创建ing",
      });
       // 新增到数据库
      const db = wx.cloud.database()
      db.collection('pageTitles').add({
        data: {
          createInfo
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
           console.log(res);
          wx.showToast({
            title: '新增记录成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })

     

      // 模拟插入数据库中ing
      setTimeout(function(){

        // 模拟插入数据库成功
        that.setData({
          loading:false,
          creating:"创建",
        });

      },5000);
     
     
       // 提示创建成功；
       wx.navigateTo({
         url: '../createSuccess/createSuccess',
      })
    }
  },


  tapDialogButton(e) {
    this.setData({
        dialogShow: false,
        showOneButtonDialog: false
    })
},
  formReset(e){
    console.log(e);
  },
  handleTextInput(e){
  
    let len=e.detail.value.length; 
    this.setData({
      descriptInputLen:len
    });

  },
  handleTitleInputBlur(e){
    console.log(e);
    if(e.detail.value==""){
        // 如果为空，则提示；
        this.setData({
          error: '推文标题不可为空！'
      })
    }
  },
  handleArticleSrcBlur(e){
    if(e.detail.value==""){
      // 如果为空，则提示；
      this.setData({
        error: '推文链接路径不可为空！'
    })
  }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
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