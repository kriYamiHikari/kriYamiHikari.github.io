let originItemLoadTxt=""

let itemMainRow_Media=document.getElementById('itemMainRow-Media')
let itemMainRow_Tutorials=document.getElementById('itemMainRow-Tutorials')
let itemMainRow_Programs=document.getElementById('itemMainRow-Programs')
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

            let itemMaxNew_Media=xmlDoc.getElementsByTagName("moduleItem-Media")[0].children //获取音乐分享xml已有最大数量
            let itemMaxNew_Tutorials=xmlDoc.getElementsByTagName("moduleItem-Tutorials")[0].children //获取专业教程xml已有最大数量
            let itemMaxNew_Programs=xmlDoc.getElementsByTagName("moduleItem-Programs")[0].children //获取软件分享xml已有最大数量
            let itemMaxNew_imageShare=xmlDoc.getElementsByTagName("moduleItem-tools")[0].children //获取图片分享xml已有最大数量

            itemMainRow_Media.innerHTML="" //清空音乐分享原有测试元素
            itemMainRow_Tutorials.innerHTML="" //清空专业教程原有测试元素
            itemMainRow_Programs.innerHTML=""
            itemMainRow_tools.innerHTML=""


            for (let i=0;i<itemMaxNew_Media.length;i++){
                let afterTxt=originItemLoadTxt.replace(/This is a test Text/,itemMaxNew_Media[i].children[4].textContent) //替换元素文本
                afterTxt=afterTxt.replace(/This is a test Title/,itemMaxNew_Media[i].children[3].textContent) //替换元素标题
                afterTxt=afterTxt.replace(/images\/background\/03.jpg/,itemMaxNew_Media[i].children[1].textContent) //替换元素图片
                afterTxt=afterTxt.replace(/index\.html/g,itemMaxNew_Media[i].children[0].textContent) //替换元素跳转网页路径
                afterTxt=afterTxt.replace(/left: -20%/,"left: " + itemMaxNew_Media[i].children[2].textContent) //替换元素图片左偏移程度

                if (itemMainRow_Media.childNodes.length<5){ //限制主页面显示元素最大数量
                    itemMainRow_Media.innerHTML+=afterTxt
                }
            } //遍历文件添加音乐分享元素
            for (let i=0;i<itemMaxNew_Tutorials.length;i++){
                let afterTxt=originItemLoadTxt.replace(/This is a test Text/,itemMaxNew_Tutorials[i].children[4].textContent) //替换元素文本
                afterTxt=afterTxt.replace(/This is a test Title/,itemMaxNew_Tutorials[i].children[3].textContent) //替换元素标题
                afterTxt=afterTxt.replace(/images\/background\/03.jpg/,itemMaxNew_Tutorials[i].children[1].textContent) //替换元素图片
                afterTxt=afterTxt.replace(/index\.html/g,itemMaxNew_Tutorials[i].children[0].textContent) //替换元素跳转网页路径
                afterTxt=afterTxt.replace(/left: -20%/,"left: " + itemMaxNew_Tutorials[i].children[2].textContent) //替换元素图片左偏移程度

                if (itemMainRow_Tutorials.childNodes.length<5){ //限制主页面显示元素最大数量
                    itemMainRow_Tutorials.innerHTML+=afterTxt
                }
            } //遍历文件添加专业教程元素*/
            for (let i=0;i<itemMaxNew_Programs.length;i++){
                let afterTxt=originItemLoadTxt.replace(/This is a test Text/,itemMaxNew_Programs[i].children[4].textContent) //替换元素文本
                afterTxt=afterTxt.replace(/This is a test Title/,itemMaxNew_Programs[i].children[3].textContent) //替换元素标题
                afterTxt=afterTxt.replace(/images\/background\/03.jpg/,itemMaxNew_Programs[i].children[1].textContent) //替换元素图片
                afterTxt=afterTxt.replace(/index\.html/g,itemMaxNew_Programs[i].children[0].textContent) //替换元素跳转网页路径
                afterTxt=afterTxt.replace(/left: -20%/,"left: " + itemMaxNew_Programs[i].children[2].textContent) //替换元素图片左偏移程度

                if (itemMainRow_Programs.childNodes.length<5){ //限制主页面显示元素最大数量
                    itemMainRow_Programs.innerHTML+=afterTxt
                }
            } //遍历文件添加软件分享元素*/
            for (let i=0;i<itemMaxNew_imageShare.length;i++){
                let afterTxt=originItemLoadTxt.replace(/This is a test Text/,itemMaxNew_imageShare[i].children[4].textContent) //替换元素文本
                afterTxt=afterTxt.replace(/This is a test Title/,itemMaxNew_imageShare[i].children[3].textContent) //替换元素标题
                afterTxt=afterTxt.replace(/images\/background\/03.jpg/,itemMaxNew_imageShare[i].children[1].textContent) //替换元素图片
                afterTxt=afterTxt.replace(/index\.html/g,itemMaxNew_imageShare[i].children[0].textContent) //替换元素跳转网页路径
                afterTxt=afterTxt.replace(/left: -20%/,"left: " + itemMaxNew_imageShare[i].children[2].textContent) //替换元素图片左偏移程度

                if (itemMainRow_tools.childNodes.length<5){ //限制主页面显示元素最大数量
                    itemMainRow_tools.innerHTML+=afterTxt
                }
            } //遍历文件添加软件分享元素*/
        }
    }
    xmlHttp.open("get","itemLoad.xml",true)
    xmlHttp.send()
}

originGet()