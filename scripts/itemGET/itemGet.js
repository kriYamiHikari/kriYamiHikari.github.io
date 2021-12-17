function main(){
    let originItemLoadTxt=""

    let itemMainRow_Media=document.getElementById('itemMainRow-Media')
    let itemMainRow_Tutorials=document.getElementById('itemMainRow-Tutorials')
    let itemMainRow_Programs=document.getElementById('itemMainRow-Programs')
    let itemMainRow_Tools=document.getElementById('itemMainRow-Tools')

    let xmlHttpMedia=new XMLHttpRequest()
    let xmlHttpTutorials=new XMLHttpRequest()
    let xmlHttpPrograms=new XMLHttpRequest()
    let xmlHttpTools=new XMLHttpRequest()

    let originTxtGet=new XMLHttpRequest()

    let itemLoadXMLMedia= new Document()
    let itemLoadXMLTutorials= new Document()
    let itemLoadXMLPrograms= new Document()
    let itemLoadXMLTools= new Document()

    let itemSrc,itemTitle,itemImageLeftPositionOffset,itemAddDate,itemText,
        itemHtmlSrc,itemImageSrc=""

    let srcMediaHead="Music/"
    let srcTutorialsHead="Tutorials/"
    let srcProgramsHead="Programs/"
    let srcToolsHead="Tools/"

    let cloneArrayOrigin=new Document()
    let cloneArray=new Document()

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
        xmlHttpMedia.onreadystatechange=function () {
            if (this.readyState===4 && this.status===200){
                itemLoadXMLMedia=this.responseXML
                sortItem(itemLoadXMLMedia,srcMediaHead,itemMainRow_Media)
            }
        }
        xmlHttpMedia.open("get","itemLoad-Music.xml",true)
        xmlHttpMedia.send()

        xmlHttpTutorials.onreadystatechange=function () {
            if (this.readyState===4 && this.status===200){
                itemLoadXMLTutorials=this.responseXML
                sortItem(itemLoadXMLTutorials,srcTutorialsHead,itemMainRow_Tutorials)
            }
        }
        xmlHttpTutorials.open("get","itemLoad-Tutorials.xml",true)
        xmlHttpTutorials.send()

        xmlHttpPrograms.onreadystatechange=function () {
            if (this.readyState===4 && this.status===200){
                itemLoadXMLPrograms=this.responseXML
                sortItem(itemLoadXMLPrograms,srcProgramsHead,itemMainRow_Programs)
            }
        }
        xmlHttpPrograms.open("get","itemLoad-Programs.xml",true)
        xmlHttpPrograms.send()

        xmlHttpTools.onreadystatechange=function () {
            if (this.readyState===4 && this.status===200){
                itemLoadXMLTools=this.responseXML
                sortItem(itemLoadXMLTools,srcToolsHead,itemMainRow_Tools)
            }
        }
        xmlHttpTools.open("get","itemLoad-Tools.xml",true)
        xmlHttpTools.send()
    }
    function initItem(rowName) {
        let afterTxt=originItemLoadTxt.replace(/This is a test Text/,itemText) //替换元素文本
        afterTxt=afterTxt.replace(/This is a test Title/,itemTitle) //替换元素标题
        afterTxt=afterTxt.replace(/images\/background\/default.jpg/,itemImageSrc) //替换元素图片
        afterTxt=afterTxt.replace(/index\.html/g,itemHtmlSrc) //替换元素跳转网页路径
        afterTxt=afterTxt.replace(/left: -20%/,"left: " + itemImageLeftPositionOffset) //替换元素图片左偏移程度
        afterTxt=afterTxt.replace(/This is a test Date/,itemAddDate)

        if (rowName.children.length<5){
            rowName.innerHTML+=afterTxt
        }
    }
    function sortItem(nameXML,src,rowName) {
        let itemTemp=[]
        //复制节点
        cloneArrayOrigin=nameXML.getElementsByTagName('main')[0].cloneNode(true)
        cloneArray=cloneArrayOrigin.getElementsByTagName('item')

        rowName.innerHTML=""

        function sortOrder(a,b) {
            return b.localeCompare(a)
        }
        
        //按添加时间排列
        for (let i=0;i<cloneArray.length;i++){
            itemTemp.push(cloneArray[i].getElementsByTagName('date')[0].innerHTML)
        }
        itemTemp.sort(sortOrder)
        for (let i=0;i<itemTemp.length;i++){
            for (let b=0;b<cloneArray.length;b++){
                if (cloneArray[b].getElementsByTagName('date')[0].innerHTML===itemTemp[i]){
                    itemTitle=cloneArray[b].getElementsByTagName('title')[0].textContent
                    itemImageLeftPositionOffset=cloneArray[b].getElementsByTagName('imageLeft')[0].textContent
                    itemAddDate=cloneArray[b].getElementsByTagName('date')[0].textContent
                    itemSrc=src+cloneArray[b].parentElement.tagName+"/"+itemTitle+"/"
                    itemText=cloneArray[b].getElementsByTagName('text')[0].textContent
                    itemHtmlSrc=itemSrc+"site.html"
                    itemImageSrc=itemSrc+"image.jpg"
                    initItem(rowName)
                    cloneArray[b].parentElement.removeChild(cloneArray[b])
                }
            }
        }
    }
    originGet()
}
main()