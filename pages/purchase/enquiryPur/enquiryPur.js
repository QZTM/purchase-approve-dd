let app = getApp();
Page({  
   data:{
        dates: '请选择日期',
        times: '请选择时间',
        payList:["请选择","货到付款","在线支付"],
        index:0,
        items:[{name:true}],
    //  标记array内部的索引
    arr:{
       pageArray:{
        //申请事由
        applyCause:'',
        //截止时间
        deadLine:"",
        //供货周期
        supplyCycle:"",
        //支付方式
        payMent:"",
        //技术支持电话
        technicalSupportTelephone:"",
        //专家评审
        expertReview:"",
        //评审奖励
        expertReward:"",
        //采购物品数组
        purchaseArray:[
          {
            //物料id
            materialId:'',
            typeName: '',
            brandName:'',
            itemName: '',
            //规格
            norms: '',
            //数量
            count: 0,
            //单位
            unit: '',
          }
          ],
        //报价商家数
        quoteSellerNum:0,
        //零配件供应商
        supplierSellerNum:0,
        //备注
        remarks:''
      },
    },
    // arr--------------------
    reason:'',
    // 增加明细
    clickTimes:1,
    // 提交表单
    // subObject:[{
    //   // 采购数组
    //     purType:'发的',
    //     purBrand:'发的',
    //     purName:'嘟嘟嘟',
    //     purSpec:'试试',
    //     purNum:'啊啊',
    //     purUnit:'啊'

    // }]
   
  } ,   

  // 返回申请事由的内容
    reasonBlur:function(e){
      console.log(e.detail.value)
        var beizhu=e.detail.value;
        this.setData({
         'arr.pageArray.applyCause':beizhu
        })
        console.log("ddd",this.data.arr.pageArray)
    },
    // 返回采购类型

    addSellerTemple(){
       this.data.arr.pageArray.purchaseArray.push({ materialId:'',typeName: '',brandName:'',itemName: '',norms: '',count: 0,unit: '',});
      this.setData({
          'arr.pageArray.purchaseArray':this.data.arr.pageArray.purchaseArray,
           'arr.pageArray.supplierSellerNum':0,
      })
    },
    addUnderlinepageTempleCenter(){
        this.setData({
          clickTimes:this.data.clickTimes+1,     
        })
    },
     //采购品牌变动
    bindObjPickerChange(e){
    var newItemNameIndex = e.detail.value;
    var newMaterialId=this.data.arr.itemArray[newItemNameIndex].itemList[0].aterialId;
    var newBrandName=this.data.arr.itemArray[newItemNameIndex].itemList[0].pkBrand;
    var newItemName = this.data.arr.itemArray[newItemNameIndex].name;
    var newItemnorms = this.data.arr.itemArray[newItemNameIndex].itemList[0].materialspec;
    var newItemUnit = this.data.arr.itemArray[newItemNameIndex].itemList[0].pkMeasdoc;
    var actionIndexa = e.target.dataset.iddx;
    var temp_str1='arr.pageArray.purchaseArray['+actionIndexa+'].brandName';
    var temp_str2 = 'arr.pageArray.purchaseArray['+actionIndexa+'].itemName';
    var temp_str3 = 'arr.pageArray.purchaseArray['+actionIndexa+'].norms';
    var temp_str4 = 'arr.pageArray.purchaseArray['+actionIndexa+'].unit';
    var temp_str5 = 'arr.pageArray.purchaseArray['+actionIndexa+'].count';
    //var temp_str6='arr.pageArray.purchaseArray['+actionIndexa+'].materialId';
    this.setData({
      [temp_str1]:newBrandName
    })
    this.setData({
      [temp_str2]: newItemName,
    });
    if(newItemnorms){
       this.setData({
          [temp_str3]: newItemnorms,
        });
    }else{
      this.setData({
          [temp_str3]: '',
        });
    }
    if(newItemUnit){
      this.setData({
          [temp_str4]: newItemUnit,
        });
    }else{
      this.setData({
          [temp_str4]: '',
        });
    }

    this.setData({
          [temp_str5]: 1,
        });
    },
     //采购名称变动
    bindObjNameChange(e){
      console.log("采购名称变动",this.data.arr.itemArray)
    var newItemNameIndex = e.detail.value;
    var newItemName = this.data.arr.itemArray[newItemNameIndex].name;
    var newItemnorms = this.data.arr.itemArray[newItemNameIndex].itemList[0].materialspec;
    var newItemUnit = this.data.arr.itemArray[newItemNameIndex].itemList[0].pkMeasdoc;
    var newmaterialId = this.data.arr.itemArray[newItemNameIndex].itemList[0].pkMaterial;
      console.log("name",this.data.arr.itemArray[newItemNameIndex].itemList[0].pkMaterial)

    var actionIndexa = e.target.dataset.iddx;
    var temp_str2 = 'arr.pageArray.purchaseArray['+actionIndexa+'].itemName';
    var temp_str3 = 'arr.pageArray.purchaseArray['+actionIndexa+'].norms';
    var temp_str4 = 'arr.pageArray.purchaseArray['+actionIndexa+'].unit';
    var temp_str5 = 'arr.pageArray.purchaseArray['+actionIndexa+'].count';
    var temp_str6 = 'arr.pageArray.purchaseArray['+actionIndexa+'].materialId';
    this.setData({
      [temp_str2]: newItemName,
    });
    this.setData({
      [temp_str6]:newmaterialId
    })
    if(newItemnorms){
       this.setData({
          [temp_str3]: newItemnorms,
        });
    }else{
      this.setData({
          [temp_str3]: '',
        });
    }
    if(newItemUnit){
      this.setData({
          [temp_str4]: newItemUnit,
        });
    }else{
      this.setData({
          [temp_str4]: '',
        });
    }

    this.setData({
          [temp_str5]: 1,
        });

    console.log("变---------",this.data.arr.pageArray.purchaseArray)
    //爬取数据
   
    var _url=app.globalData.domain+"/shopping/getSupplierNum"
    var that=this;
    dd.httpRequest({
       headers: {  
           "Content-Type": "application/json",
		      'eticket': app.globalData.eticket
        },
          url:_url,
          method: 'POST',
          data:
            JSON.stringify({
            pageArray:that.data.arr.pageArray
          }),
          dataType: 'json',
          success(res){
            console.log("响应",res)
            var supp = res.data.result;
            console.log("supp",supp)
            if(supp!=null){
                 console.log("supp",supp)
                var supp_supplierSellerNum =supp
                that.setData({
                'arr.pageArray.supplierSellerNum':supp_supplierSellerNum,
                })
                console.log("sss",that.data.arr.pageArray)
            }else{
            dd.alert({content:'未查询到相关的供应商数量'});
            }
           
          }
    })

    },
    //规格
    purSpec:function(e){
     var actionIndexa=e.target.dataset.iddx;
     var _norms='pageArray.purchaseArray['+actionIndexa+'].norms';
     this.setData({
       [_norms]:e.detail.value
     })
     console.log(this.data.pageArray)
    },
    //数量
    // purNum:function(e){
    //   var actionIndexa=e.target.dataset.iddx;
    //  var _count='pageArray.purchaseArray['+actionIndexa+'].count';
    //  this.setData({
    //    [_count]:e.detail.value
    //  })
    //  console.log(this.data.pageArray)
    // },
     changeCount:function(e){
    console.log("数量",e.detail.value)
    var num=e.detail.value;
    var countIndex = e.target.dataset.iddx
    console.log("iddx",countIndex)
    var _count='arr.pageArray.purchaseArray['+countIndex+'].count';
    this.setData({
      [_count]:num
    })
    console.log(this.data.arr.pageArray)
    },
    //单位
    purUnit:function(e){
      var actionIndexa=e.target.dataset.iddx;
     var _unit='pageArray.purchaseArray['+actionIndexa+'].unit';
     this.setData({
       [_unit]:e.detail.value
     })
     console.log(this.data.pageArray)
    },
    //报价商家数
    quoteSellerNumFun:function(e){
      console.log(e)
      this.setData({
        'arr.pageArray.quoteSellerNum':e.detail.value
      })
    },
      //供货周期
    supplyCycle:function(e){
      console.log(e)
      this.setData({
        'arr.pageArray.supplyCycle':e.detail.value
      })
    },
    //技术支持电话
    technicalSupportTelephone:function(e){
      console.log(e)
      this.setData({
        'arr.pageArray.technicalSupportTelephone':e.detail.value
      })
    },
    //专家评审
     radioChange: function(e) {
       var expertReviewDe=e.detail.value[0];
       if(expertReviewDe!=true){
         expertReviewDe=false;
       }
       console.log('你选择的框架是：',expertReviewDe)
       this.setData({
        'arr.pageArray.expertReview':expertReviewDe
      })
    },
    //评审奖励
    rewardFun:function(e){
      console.log(e)
      this.setData({
        'arr.pageArray.expertReward':e.detail.value
      })
    },
    //-------------------------------------------------------------------------------------
    //零配件供应商数量由网络传过来
    //-------------------------------------------------------------------------------------

    //意见
    remakeFun:function(e){
      this.setData({
         'arr.pageArray.remarks':e.detail.value
      })
      console.log('提交',this.data.arr.pageArray)
    },

  //  点击时间组件确定事件  
  bindTimeChange: function (e) {
    console.log("谁哦按")
    this.setData({
      times: e.detail.value
    })
   var deal = this.data.dates+" "+this.data.times;
    console.log("deadline:"+deal);
    this.setData({
      'arr.pageArray.deadLine':deal
    })
    
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
     console.log(e.detail.value)
     this.setData({
      dates: e.detail.value
    })
    console.log("ddd")
    var deal = this.data.dates+" "+this.data.times;
    console.log("deadline:"+deal);
    this.setData({
      'arr.pageArray.deadLine':deal
    })

  },

  //  选择支付方式
  bindPayChange: function (e) {
     var index= e.detail.value;
     if(index==0){
       index++;
       dd.alert({content: "请检查支付方式"});
     }
     console.log(index)
     var pay=this.data.payList[index]
     console.log(pay)
     this.setData({
       'index':index
    })
    this.setData({
      'arr.pageArray.payMent':pay
    })
    console.log(this.data.arr)
  },
  
  


    //提交
  
  submit(e){
      var purlist=this.data.arr.pageArray.purchaseArray;
      var _staId=app.globalData.appUser.id;
      var _orgId=app.globalData.appOrg.id;
      for(var i =0;i<purlist.length;i++){
        if(purlist[i].materialId==""){
        dd.alert({content: "请选择采购物品"});
        return;
      }
      }
     if(this.data.index==0){
         dd.alert({content: "请选择支付方式"});
        return;
      }
      console.log("eeeee",JSON.stringify(this.data.arr.pageArray))
      var _url =  app.globalData.domain+'/shopping/start';
      var that=this;
       dd.httpRequest({
        headers: {
          "Content-Type": "application/json",
		  'eticket': app.globalData.eticket
        },
          url:_url,
          method: 'POST',
          data:
            JSON.stringify({
            pageArray:that.data.arr.pageArray,orgId:_orgId,staffId:_staId
          }),
          dataType: 'json',
          success(){
              dd.alert({content:'提交成功',
              success: () => {
                dd.switchTab({
                url:'/pages/purchase/purchase'
              })
              },
              });
              var newPage= {applyCause:'',purchaseArray:[{ materialId:'',typeName: '',brandName:'',itemName: '',norms: '',count: 0,unit: '',}],quoteSellerNum:0,supplierSellerNum:0,remarks:''};
              that.setData({
                'arr.pageArray':newPage
              })
              // dd.navigateTo({
              //   url:'/pages/purchase/purchase'
              // })
          }
       })
    },


     choosePicture(){
       dd.chooseImage({
         success: (res) => {
          img.src = res.filePaths[0];
        },
       })
         
      },

      onLoad(){
        dd.getSystemInfo({
          success: (res) => {
            this.setData({
              systemInfo: res,
            })
            
          }
        });
      },
      onReady() {
        // 页面加载完成
      },
      onShow() {
        // 页面显示
      },
      onHide() {
        // 页面隐藏
      },
      onUnload() {
        // 页面被关闭
      },
      onTitleClick() {
        // 标题被点击
      },
      onPullDownRefresh() {
        // 页面被下拉
      },
      onReachBottom() {
        // 页面被拉到底部
      },
      onShareAppMessage() {
        // 返回自定义分享信息
        return {
          title: 'My App',
          desc: 'My App description',
          path: 'pages/index/index',
        };
      },
      goToChooseItemType(e){
    var iddx = e.target.dataset.iddx;
    var iddxx = e.target.dataset.iddxx;
    // this.setData({
    //   goIddx: iddx,
    //   goIddxx: iddxx,
    // })
    dd.navigateTo({
     // url:'/pages/biz/pages/underlinepage/chooseItemType/chooseItemType'+"?iddx="+iddx+"&iddxx="+iddxx
      url:'/pages/purchase/strategyPur/chooseItemType/chooseItemType'+"?iddx="+iddx
    })
  }
});

