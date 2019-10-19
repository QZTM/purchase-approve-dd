let app = getApp();
Page({
  data: {
    userid:'',
    orgid:'',
    schList:{
      list:[

      ]
    },
    //可操作用户id
    mainList:[],
  },
  onLoad() {
    //获取登录用户
      this.setData({
      //corpId: app.globalData.corpId,
      userid: app.globalData.appUser.id,
      orgid:app.globalData.appOrg.id
    })
    //获取公司的主要负责人的钉钉id
    var _orgid=this.data.orgid;
    this.getMainPerson(_orgid);
    console.log("....:",888)
  },

  //获取公司的主要负责人的钉钉id
  getMainPerson(e){
    var that=this;
    var _orgid=e;
    var userlist=[];
      dd.httpRequest({
          url: app.globalData.domain+'/negotiateding/getAppUser',
          method: 'GET',
          data: {orgId: _orgid},
		  headers: {
			  'eticket': app.globalData.eticket
		  },
          dataType: 'json',
          success: (res) => {
            var list=res.data.result;
            for(var i=0;i<list.length;i++){
                userlist.push(list[i].ddUserId)
            }
             var _mainList ='mainList';

            that.setData({
              [_mainList]:userlist
            })
            },
       })
  },


  onShow(e){
    //获取公司Id
    //var orgid="xiesi001";
    var orgid=this.data.orgid;
    var status=app.globalData.statusList.completeBargaining;//-------------------*---------------------------------------最终结束改为 =4
    var _userid=this.data.userid;
    //获取进行中的列表：
    this.getlist(orgid,status,_userid);
 },

// 获取页面数据
  getlist:function(orgid,status,_userid){
      var that=this;
       dd.httpRequest({
          url: app.globalData.domain+'/negotiateding/getList',
          method: 'GET',
          data: {orgId: orgid,status:status,userId:_userid},
		  headers: {
			  'eticket': app.globalData.eticket
		  },
          dataType: 'json',
          success: (res) => {
          console.log(res.data)
              var suList =res.data;
              var newArray=[];
              for(var i=0;i<suList.length;i++){
                var buyChannelName="";
                var statusName="";
                if(suList[i].buyChannelId==3){
                    buyChannelName="战略采购"
                }
                if(suList[i].buyChannelId==4){
                    buyChannelName="询价采购"
                }
                if(suList[i].buyChannelId==5){
                    buyChannelName="单一来源"
                }
                if(suList[i].status==status){
                    statusName="议价完成"
                }
                
                  newArray.push({
                    "id":suList[i].id,
                    "title":suList[i].applyCause,
                    "orderNumber":suList[i].orderNumber,
                    "buyChannelId":suList[i].buyChannelId,
                    "goodsType":suList[i].goodsType,
                    "status":suList[i].status,
                    "buyChannelName":buyChannelName,
                    "statusName":statusName,
                    "createTime":suList[i].createTime
                  })
              }
               var tr="schList.list"
               that.setData({
                        [tr]: newArray,
                      });
                       console.log(this.data)
            },
           
       })
  },

  getUserInfo(e){
    //orgid查询公司
  },

  //点击进入详情页
  tolistdetail(e){
    //订单id
    var _id =e.target.dataset.id;
    //登录用户id
    var userid=this.data.userid;
    //可登录id
    var _mlist=this.data.mainList;
    //企业id
    var _orgid=this.data.orgid;
    var detailUrl="/pages/purchase/workbench/completeBargainingList/completeBargaining/completeBargaining?id="+_id+"&userid="+userid+"&orgid="+_orgid;

    
    // //检验权限人员
    // for(var i = 0;i<_mlist.length;i++){
    //   if(_mlist[i]==userid){//是否为责任人
         
    //      dd.navigateTo({
    //         url:detailUrl,
    //     })

    //   }else{
    //     this.getNegotiatePersonList(_id,detailUrl);
    //     //console.log("gogogog")
    //   }
    // }

        dd.navigateTo({
            url:detailUrl,
        })
              

   },
   getNegotiatePersonList(e,evl){
     console.log("nadao"+e);
     var detailUrl=evl;
     console.log("de:"+detailUrl)
       dd.httpRequest({
          url: app.globalData.domain+'/negotiateding/getNagotiaPersonList',
          method: 'GET',
          data: {id:e},
          headers: {
            'eticket': app.globalData.eticket
          },
          dataType: 'json',
          success: (res) => {
            var _userid=this.data.userid;
            var arr=res.data.result;
            if(arr==null){
               dd.alert({content: "尚未操作该订单权限！"});
            }else{
               for(var i=0;i<arr.length;i++){
              //判断当前登录id是否在里面
              console.log(i+"次数 ："+arr[i].ddUserId)
              if(_userid==arr[i].ddUserId){
                  dd.navigateTo({
                      url:detailUrl,
                  });  
                  break;              
               }
               if(i==arr.length-1){
                   dd.alert({content: "尚未操作该订单权限！"});
               }
             };
            }
            },
           
       })
   }
});
