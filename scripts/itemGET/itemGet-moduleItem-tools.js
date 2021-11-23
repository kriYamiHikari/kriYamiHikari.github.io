let originItemLoadTxt=""

let itemMainRow_tools=document.getElementById('itemMainRow-tools')

let xmlHttp=new XMLHttpRequest()
let originTxtGet=new XMLHttpRequest()

function originGet() { //获取样式源文件
    originTxtGet.onreadystatechange=function(){
        if (this.readyState===4 && this.status===200){
            originItemLoadTxt=this.responseText
            itemLoad()
        }
    }
    originTxtGet.open("get","itemLoadOrigin.html",true)
    originTxtGet.send()
}

function itemLoad(){ //加载页面元素
    xmlHttp.onreadystatechange=function () {
        if (this.readyState===4 && this.status===200){
            let xmlDoc=this.responseXML

            let itemMaxNew_imageShare=xmlDoc.getElementsByTagName("moduleItem-tools")[0].childNodes //获取音乐分享xml已有最大数量

            itemMainRow_tools.innerHTML="" //清空音乐分享原有测试元素

            for (let i=1;i<itemMaxNew_imageShare.length-1;i=i+2){
                let afterTxt=originItemLoadTxt.replace(/This is a test Text/,xmlDoc.getElementsByTagName("moduleItem-tools")[0].childNodes[i].childNodes[9].childNodes[0].nodeValue) //替换元素文本
                afterTxt=afterTxt.replace(/This is a test Title/,xmlDoc.getElementsByTagName("moduleItem-tools")[0].childNodes[i].childNodes[7].childNodes[0].nodeValue) //替换元素标题
                afterTxt=afterTxt.replace(/images\/background\/03.jpg/,xmlDoc.getElementsByTagName("moduleItem-tools")[0].childNodes[i].childNodes[3].childNodes[0].nodeValue) //替换元素图片
                afterTxt=afterTxt.replace(/index\.html/g,xmlDoc.getElementsByTagName("moduleItem-tools")[0].childNodes[i].childNodes[1].childNodes[0].nodeValue) //替换元素跳转网页路径
                afterTxt=afterTxt.replace(/left: -20%/,"left: " + xmlDoc.getElementsByTagName("moduleItem-tools")[0].childNodes[i].childNodes[5].childNodes[0].nodeValue) //替换元素图片左偏移程度

                itemMainRow_tools.innerHTML+=afterTxt
            } //遍历文件添加音乐分享元素
        }
    }
    xmlHttp.open("get","itemLoad.xml",true)
    xmlHttp.send()
}

originGet()