import './appShare.scss'
import {h,Component} from 'preact'
import _findIdx from 'array-find-index'

window.prc=window.prc||{}

let ua=navigator.userAgent.toLowerCase()
let isWeiXin=(()=>{
  return ua.match(/MicroMessenger/i)=='micromessenger'
})()
let isApp=(()=>{
  if(!window.Jsbridge){
    throw new Error('没有引入 JSBridge.js')
  }
  return Jsbridge.isApp()
})()
let isAndroid=/android|adr/gi.test(ua)
let isIos=/iphone|ipod|ipad/gi.test(ua)&&!isAndroid

let initList=[
  {key:1,val:'微信'},
  {key:5,val:'朋友圈'},
  {key:4,val:'QQ'},
  {key:6,val:'QQ空间'},
  {key:3,val:'微博'},
  {key:8,val:'复制链接'}
]

export default class Share extends Component{
  constructor(props){
    super(props)
    window.appShare=window.prc.share=this
    this.state={
      show:false,
      list:[],
      icon:'',
      title:'',
      content:'',
      shareUrl:'',
      cover:{
        src:'',
        style:{},
        callback:null
      },
      callback:null
    }
  }

  getList(type){
    if(type==='total'){
      return [
        {key:1,val:'微信'},
        {key:2,val:'短信'},
        {key:3,val:'微博'},
        {key:4,val:'QQ'},
        {key:5,val:'朋友圈'},
        {key:6,val:'QQ空间'},
        {key:7,val:'二维码'},
        {key:8,val:'复制链接'},
        {key:9,val:'一键分享'}
      ]
    }
    if(type==='init'){
      return initList
    }
    if(type==='custom'){
      return this.state.list
    }
  }

  fromApp(opts){
    let {list,callback}=this.state

    Jsbridge.toAppWebViewShare({
      shareTypeList:list
    },status=>{
      /*
      @param status {String}
      'onCancel':分享失败
      'onComplete':分享成功
      'onCancel':分享取消
      */
     let formatData=(()=>{
       if(isAndroid){
         return JSON.parse(status).ShareResult
       }
       if(isIos){
         return status
       }
       return status
     })()
     callback&&callback(formatData)
    })
  }

  fromWeiXin(){
    this.setState({
      show:true
    })
  }

  set({icon,title,content,shareUrl,cover,custom,callback}){
    let totalList=this.getList('total')
    if(custom!=null&&custom.length!==0){
      custom.forEach((item,i)=>{
        let idx=_findIdx(initList,function(innerItem){
          return innerItem.key===item.key
        })
        if(idx>-1){
          initList[idx]=item
        }else{
          initList.push(item)
        }
      })
    }
    let shareContent
    let shareList=initList.map((item,i)=>{
      shareContent=(()=>{
        if(item.key===3||item.key===5){
          return item.title||title
        }
        return item.content==null?content:item.content
      })()
      if(item.enabled!==false){
        return {
          ShareToolType:item.key,
          ShareToolName:item.val,
          IconUrl:icon,
          Title:item.title==null?title:item.title,
          ShareContent:shareContent,
          ShareUrl:item.shareUrl==null?shareUrl:item.shareUrl,
          IsEnabled:true
        }
      }
    }).filter(item=>item!=undefined)
    this.setState({
      list:shareList,
      icon,
      title,
      content,
      shareUrl,
      cover,
      custom,
      callback
    })
  }

  show(){
    if(isApp){
      this.fromApp()
      return
    }
    if(isWeiXin){
      this.fromWeiXin()
      return
    }
    alert('打开app或微信即可分享')
  }

  hide(){
    this.setState({
      show:false
    })
  }

  render(props,state){
    return(
      state.show?
      (
        <div 
          onTouchMove={(e)=>e.preventDefault()} 
          onClick={()=>{
            state.cover.callback&&state.cover.callback()
            this.hide()
          }}
          className="prc-share">
          <div style={state.cover.style} className="prc-share-img">
            <img src={state.cover.src} style={state.cover.style} />
          </div>
        </div>
      )
      :
      null
    )
  }

}