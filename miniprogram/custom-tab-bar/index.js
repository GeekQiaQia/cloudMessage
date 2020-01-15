Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
  
  },
  attached() {
  },
  methods: {
    handleSquare(e){
      const data = e.currentTarget.dataset
      const url = "../index/index";
      console.log(e);
      wx.switchTab({
        url,
        success(res) {
          console.log(res);
        },
        fail(err) {
          console.log(err);
        },
        complete() {

        }
      })
      this.setData({
        selected: data.index
      })
    },
    handleParticipate(e){
      const data = e.currentTarget.dataset
      const url = "../participation/participation";
      console.log(e);
      wx.switchTab({
        url,
        success(res) {
          console.log(res);
        },
        fail(err) {
          console.log(err);
        },
        complete() {

        }
      })
      this.setData({
        selected: data.index
      })
    },

    handlePublish(e) {
      const data = e.currentTarget.dataset
      const url = "../publishArticle/publishArticle";
      console.log(e);
      wx.switchTab({ url,
        success(res){
          console.log(res);
        },
        fail(err){
          console.log(err);
        },
        complete(){

        }
       })
      this.setData({
        selected: data.index
      })
    }
  }
})