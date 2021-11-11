let originItemLoadTxt=""

let itemMainRow_Media=document.getElementById('itemMainRow-Media')
let itemMainRow_Tutorials=document.getElementById('itemMainRow-Tutorials')
let itemMainRow_Programs=document.getElementById('itemMainRow-Programs')
let itemMainRow_imageShare=document.getElementById('itemMainRow-imageShare')

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

            let itemMaxNew_Media=xmlDoc.getElementsByTagName("moduleItem-Media")[0].childNodes //获取音乐分享xml已有最大数量
            let itemMaxNew_Tutorials=xmlDoc.getElementsByTagName("moduleItem-Tutorials")[0].childNodes //获取专业教程xml已有最大数量
            let itemMaxNew_Programs=xmlDoc.getElementsByTagName("moduleItem-Programs")[0].childNodes //获取软件分享xml已有最大数量
            let itemMaxNew_imageShare=xmlDoc.getElementsByTagName("moduleItem-imageShare")[0].childNodes //获取图片分享xml已有最大数量

            itemMainRow_Media.innerHTML="" //清空音乐分享原有测试元素
            itemMainRow_Tutorials.innerHTML="" //清空专业教程原有测试元素
            itemMainRow_Programs.innerHTML=""
            itemMainRow_imageShare.innerHTML=""


            for (let i=1;i<itemMaxNew_Media.length-1;i=i+2){
                let afterTxt=originItemLoadTxt.replace(/This is a test Text/,xmlDoc.getElementsByTagName("moduleItem-Media")[0].childNodes[i].childNodes[9].childNodes[0].nodeValue) //替换元素文本
                afterTxt=afterTxt.replace(/This is a test Title/,xmlDoc.getElementsByTagName("moduleItem-Media")[0].childNodes[i].childNodes[7].childNodes[0].nodeValue) //替换元素标题
                afterTxt=afterTxt.replace(/images\/background\/03.jpg/,xmlDoc.getElementsByTagName("moduleItem-Media")[0].childNodes[i].childNodes[3].childNodes[0].nodeValue) //替换元素图片
                afterTxt=afterTxt.replace(/index\.html/g,xmlDoc.getElementsByTagName("moduleItem-Media")[0].childNodes[i].childNodes[1].childNodes[0].nodeValue) //替换元素跳转网页路径
                afterTxt=afterTxt.replace(/left: -20%/,"left: " + xmlDoc.getElementsByTagName("moduleItem-Media")[0].childNodes[i].childNodes[5].childNodes[0].nodeValue) //替换元素图片左偏移程度

                if (itemMainRow_Media.childNodes.length<5){ //限制主页面显示元素最大数量
                    itemMainRow_Media.innerHTML+=afterTxt
                }
            } //遍历文件添加音乐分享元素
            for (let i=1;i<itemMaxNew_Tutorials.length-1;i=i+2){
                let afterTxt=originItemLoadTxt.replace(/This is a test Text/,xmlDoc.getElementsByTagName("moduleItem-Tutorials")[0].childNodes[i].childNodes[9].childNodes[0].nodeValue) //替换元素文本
                afterTxt=afterTxt.replace(/This is a test Title/,xmlDoc.getElementsByTagName("moduleItem-Tutorials")[0].childNodes[i].childNodes[7].childNodes[0].nodeValue) //替换元素标题
                afterTxt=afterTxt.replace(/images\/background\/03.jpg/,xmlDoc.getElementsByTagName("moduleItem-Tutorials")[0].childNodes[i].childNodes[3].childNodes[0].nodeValue) //替换元素图片
                afterTxt=afterTxt.replace(/index\.html/g,xmlDoc.getElementsByTagName("moduleItem-Tutorials")[0].childNodes[i].childNodes[1].childNodes[0].nodeValue) //替换元素跳转网页路径
                afterTxt=afterTxt.replace(/left: -20%/,"left: " + xmlDoc.getElementsByTagName("moduleItem-Tutorials")[0].childNodes[i].childNodes[5].childNodes[0].nodeValue) //替换元素图片左偏移程度

                if (itemMainRow_Tutorials.childNodes.length<5){ //限制主页面显示元素最大数量
                    itemMainRow_Tutorials.innerHTML+=afterTxt
                }
            } //遍历文件添加专业教程元素*/
            for (let i=1;i<itemMaxNew_Programs.length-1;i=i+2){
                let afterTxt=originItemLoadTxt.replace(/This is a test Text/,xmlDoc.getElementsByTagName("moduleItem-Programs")[0].childNodes[i].childNodes[9].childNodes[0].nodeValue) //替换元素文本
                afterTxt=afterTxt.replace(/This is a test Title/,xmlDoc.getElementsByTagName("moduleItem-Programs")[0].childNodes[i].childNodes[7].childNodes[0].nodeValue) //替换元素标题
                afterTxt=afterTxt.replace(/images\/background\/03.jpg/,xmlDoc.getElementsByTagName("moduleItem-Programs")[0].childNodes[i].childNodes[3].childNodes[0].nodeValue) //替换元素图片
                afterTxt=afterTxt.replace(/index\.html/g,xmlDoc.getElementsByTagName("moduleItem-Programs")[0].childNodes[i].childNodes[1].childNodes[0].nodeValue) //替换元素跳转网页路径
                afterTxt=afterTxt.replace(/left: -20%/,"left: " + xmlDoc.getElementsByTagName("moduleItem-Programs")[0].childNodes[i].childNodes[5].childNodes[0].nodeValue) //替换元素图片左偏移程度

                if (itemMainRow_Programs.childNodes.length<5){ //限制主页面显示元素最大数量
                    itemMainRow_Programs.innerHTML+=afterTxt
                }
            } //遍历文件添加软件分享元素*/
            for (let i=1;i<itemMaxNew_imageShare.length-1;i=i+2){
                let afterTxt=originItemLoadTxt.replace(/This is a test Text/,xmlDoc.getElementsByTagName("moduleItem-imageShare")[0].childNodes[i].childNodes[9].childNodes[0].nodeValue) //替换元素文本
                afterTxt=afterTxt.replace(/This is a test Title/,xmlDoc.getElementsByTagName("moduleItem-imageShare")[0].childNodes[i].childNodes[7].childNodes[0].nodeValue) //替换元素标题
                afterTxt=afterTxt.replace(/images\/background\/03.jpg/,xmlDoc.getElementsByTagName("moduleItem-imageShare")[0].childNodes[i].childNodes[3].childNodes[0].nodeValue) //替换元素图片
                afterTxt=afterTxt.replace(/index\.html/g,xmlDoc.getElementsByTagName("moduleItem-imageShare")[0].childNodes[i].childNodes[1].childNodes[0].nodeValue) //替换元素跳转网页路径
                afterTxt=afterTxt.replace(/left: -20%/,"left: " + xmlDoc.getElementsByTagName("moduleItem-imageShare")[0].childNodes[i].childNodes[5].childNodes[0].nodeValue) //替换元素图片左偏移程度

                if (itemMainRow_imageShare.childNodes.length<5){ //限制主页面显示元素最大数量
                    itemMainRow_imageShare.innerHTML+=afterTxt
                }
            } //遍历文件添加软件分享元素*/
        }
    }
    xmlHttp.open("get","itemLoad.xml",true)
    xmlHttp.send()
}

originGet()