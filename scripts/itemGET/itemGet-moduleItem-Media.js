function main(){
    let originItemLoadTxt=""
    let itemMainRow_Media=document.getElementById('itemMainRow-Media')
    let xmlHttp=new XMLHttpRequest()
    let originTxtGet=new XMLHttpRequest()
    let itemLoadXML= new Document()

    let searchTypeButtonIndex=0 //0=类型(默认) 1=曲名 2=歌手 3=添加时间
    let sortTypeButtonIndex=0 //0=排序方式(默认) 1=添加时间 2=歌曲名称 3=歌手名称
    let sortOrderButtonIndex=0 //0=排列顺序(默认) 1=倒序 2=正序
    let sortLanguageButtonIndex=0 //0=不限(默认) 1=不限 2=日语 3=汉语 4=英语 & 其他语言

    let itemSrc,itemTitle,itemImageLeftPositionOffset,itemAddDate,itemText,
        itemHtmlSrc,itemImageSrc=""

    let cloneArrayOrigin=new Document()
    let cloneArray=new Document()

    let textAreaIsInput=false

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
                itemLoadXML=this.responseXML
                sortItem()
            }
        }
        xmlHttp.open("get","itemLoad-Music.xml",true)
        xmlHttp.send()
    }
    function initItem() {
        let afterTxt=originItemLoadTxt.replace(/This is a test Text/,itemText) //替换元素文本
        afterTxt=afterTxt.replace(/This is a test Title/,itemTitle) //替换元素标题
        afterTxt=afterTxt.replace(/images\/background\/default.jpg/,itemImageSrc) //替换元素图片
        afterTxt=afterTxt.replace(/index\.html/g,itemHtmlSrc) //替换元素跳转网页路径
        //=afterTxt.replace(/left: -20%/,"left: " + itemImageLeftPositionOffset) //替换元素图片左偏移程度
        afterTxt=afterTxt.replace(/This is a test Date/,itemAddDate)

        itemMainRow_Media.innerHTML+=afterTxt
    }
    function sortItem() {
        let itemTemp=[]
        let languageFilterOn=false
        let languageText=""
        //复制节点
        cloneArrayOrigin=itemLoadXML.getElementsByTagName('main')[0].cloneNode(true)
        cloneArray=cloneArrayOrigin.getElementsByTagName('item')

        itemMainRow_Media.innerHTML=""

        if (sortLanguageButtonIndex===0 || sortLanguageButtonIndex===1){
            languageFilterOn=false
        }
        if (sortLanguageButtonIndex===2) {
            languageFilterOn=true
            languageText="Japanese"
        }
        if (sortLanguageButtonIndex===3) {
            languageFilterOn=true
            languageText="Chinese"
        }
        if (sortLanguageButtonIndex===4) {
            languageFilterOn=true
            languageText="English"
        }

        function sortOrder(a,b) {
            if (sortOrderButtonIndex===0 || sortOrderButtonIndex===1){
                return b.localeCompare(a)
            }
            if (sortOrderButtonIndex===2){
                return a.localeCompare(b)
            }
        }
        
        //按添加时间排列
        if (sortTypeButtonIndex===1 || sortTypeButtonIndex===0){
            for (let i=0;i<cloneArray.length;i++){
                itemTemp.push(cloneArray[i].getElementsByTagName('date')[0].innerHTML)
            }
            itemTemp.sort(sortOrder)
            for (let i=0;i<itemTemp.length;i++){
                for (let b=0;b<cloneArray.length;b++){
                    if (cloneArray[b].getElementsByTagName('date')[0].innerHTML===itemTemp[i]){
                        if (languageFilterOn===true){
                            if (cloneArray[b].getElementsByTagName('language')[0].innerHTML===languageText){
                                itemTitle=cloneArray[b].getElementsByTagName('title')[0].textContent
                                itemImageLeftPositionOffset=cloneArray[b].getElementsByTagName('imageLeft')[0].textContent
                                itemAddDate=cloneArray[b].getElementsByTagName('date')[0].textContent
                                itemSrc="Music/"+cloneArray[b].parentElement.tagName+"/"+itemTitle+"/"
                                itemText=cloneArray[b].getElementsByTagName('text')[0].textContent
                                itemHtmlSrc=itemSrc+"site.html"
                                itemImageSrc=itemSrc+"image.jpg"
                                initItem()
                                cloneArray[b].parentElement.removeChild(cloneArray[b])
                            }
                        }else {
                            itemTitle=cloneArray[b].getElementsByTagName('title')[0].textContent
                            itemImageLeftPositionOffset=cloneArray[b].getElementsByTagName('imageLeft')[0].textContent
                            itemAddDate=cloneArray[b].getElementsByTagName('date')[0].textContent
                            itemSrc="Music/"+cloneArray[b].parentElement.tagName+"/"+itemTitle+"/"
                            itemText=cloneArray[b].getElementsByTagName('text')[0].textContent
                            itemHtmlSrc=itemSrc+"site.html"
                            itemImageSrc=itemSrc+"image.jpg"
                            initItem()
                            cloneArray[b].parentElement.removeChild(cloneArray[b])
                        }
                    }
                }
            }
        }
        //按歌曲名称排列
        if (sortTypeButtonIndex===2){
            for (let i=0;i<cloneArray.length;i++){
                itemTemp.push(cloneArray[i].getElementsByTagName('title')[0].innerHTML)
            }
            itemTemp.sort(sortOrder)
            for (let i=0;i<itemTemp.length;i++){
                for (let b=0;b<cloneArray.length;b++){
                    if (cloneArray[b].getElementsByTagName('title')[0].innerHTML===itemTemp[i]){
                        if (languageFilterOn===true){
                            if (cloneArray[b].getElementsByTagName('language')[0].innerHTML===languageText){
                                itemTitle=cloneArray[b].getElementsByTagName('title')[0].textContent
                                itemImageLeftPositionOffset=cloneArray[b].getElementsByTagName('imageLeft')[0].textContent
                                itemAddDate=cloneArray[b].getElementsByTagName('date')[0].textContent
                                itemSrc="Music/"+cloneArray[b].parentElement.tagName+"/"+itemTitle+"/"
                                itemText=cloneArray[b].getElementsByTagName('text')[0].textContent
                                itemHtmlSrc=itemSrc+"site.html"
                                itemImageSrc=itemSrc+"image.jpg"
                                initItem()
                                cloneArray[b].parentElement.removeChild(cloneArray[b])
                            }
                        }else {
                            itemTitle=cloneArray[b].getElementsByTagName('title')[0].textContent
                            itemImageLeftPositionOffset=cloneArray[b].getElementsByTagName('imageLeft')[0].textContent
                            itemAddDate=cloneArray[b].getElementsByTagName('date')[0].textContent
                            itemSrc="Music/"+cloneArray[b].parentElement.tagName+"/"+itemTitle+"/"
                            itemText=cloneArray[b].getElementsByTagName('text')[0].textContent
                            itemHtmlSrc=itemSrc+"site.html"
                            itemImageSrc=itemSrc+"image.jpg"
                            initItem()
                            cloneArray[b].parentElement.removeChild(cloneArray[b])
                        }
                    }
                }
            }
        }
        //按歌手名称排列
        if (sortTypeButtonIndex===3){
            for (let i=0;i<cloneArray.length;i++){
                itemTemp.push(cloneArray[i].parentElement.tagName)
            }
            itemTemp.sort(sortOrder)
            for (let i=0;i<itemTemp.length;i++){
                for (let b=0;b<cloneArray.length;b++){
                    if (cloneArray[b].parentElement.tagName===itemTemp[i]){
                        if (languageFilterOn===true){
                            if (cloneArray[b].getElementsByTagName('language')[0].innerHTML===languageText){
                                itemTitle=cloneArray[b].getElementsByTagName('title')[0].textContent
                                itemImageLeftPositionOffset=cloneArray[b].getElementsByTagName('imageLeft')[0].textContent
                                itemAddDate=cloneArray[b].getElementsByTagName('date')[0].textContent
                                itemSrc="Music/"+cloneArray[b].parentElement.tagName+"/"+itemTitle+"/"
                                itemText=cloneArray[b].getElementsByTagName('text')[0].textContent
                                itemHtmlSrc=itemSrc+"site.html"
                                itemImageSrc=itemSrc+"image.jpg"
                                initItem()
                                cloneArray[b].parentElement.removeChild(cloneArray[b])
                            }
                        }else {
                            itemTitle=cloneArray[b].getElementsByTagName('title')[0].textContent
                            itemImageLeftPositionOffset=cloneArray[b].getElementsByTagName('imageLeft')[0].textContent
                            itemAddDate=cloneArray[b].getElementsByTagName('date')[0].textContent
                            itemSrc="Music/"+cloneArray[b].parentElement.tagName+"/"+itemTitle+"/"
                            itemText=cloneArray[b].getElementsByTagName('text')[0].textContent
                            itemHtmlSrc=itemSrc+"site.html"
                            itemImageSrc=itemSrc+"image.jpg"
                            initItem()
                            cloneArray[b].parentElement.removeChild(cloneArray[b])
                        }
                    }
                }
            }
        }
    }

    function buttonEvent(){
        let sortLanguageButton=document.getElementById('sortLanguageButton')
        let sortLanguageButtonText=document.getElementById('sortLanguageButton').children[0]
        let sortLanguageButtonCorner=document.getElementById("sortLanguageButton").children[1]
        let sortLanguageButtonMenu=document.getElementById('sortLanguageButton').parentElement.children[1]
        let sortLanguageButtonMenuTextContainer=document.getElementById('sortLanguageButton').parentElement.children[1].children[0].children

        let sortTypeButton=document.getElementById('sortTypeButton')
        let sortTypeButtonText=document.getElementById('sortTypeButton').children[0]
        let sortTypeButtonCorner=document.getElementById("sortTypeButton").children[1]
        let sortTypeButtonMenu=document.getElementById('sortTypeButton').parentElement.children[1]
        let sortTypeButtonMenuTextContainer=document.getElementById('sortTypeButton').parentElement.children[1].children[0].children

        let sortOrderButton=document.getElementById('sortOrderButton')
        let sortOrderButtonText=document.getElementById('sortOrderButton').children[0]
        let sortOrderButtonCorner=document.getElementById("sortOrderButton").children[1]
        let sortOrderButtonMenu=document.getElementById('sortOrderButton').parentElement.children[1]
        let sortOrderButtonMenuTextContainer=document.getElementById('sortOrderButton').parentElement.children[1].children[0].children

        let searchButton=document.getElementsByClassName('searchButton')[0]
        let searchTypeButton=document.getElementsByClassName("searchTypeButton")[0]
        let searchTypeButtonText=document.getElementsByClassName("searchTypeButton")[0].children[0]
        let searchTypeButtonCorner=document.getElementsByClassName("searchTypeButton")[0].children[1]
        let searchTypeButtonMenu=document.getElementsByClassName("searchTypeButton")[0].parentElement.children[1]
        let searchTypeButtonMenuTextContainer=document.getElementsByClassName('searchTypeButton')[0].parentElement.children[1].children[0].children
        document.body.onclick=function (e) {
            //歌曲类型按键显隐切换
            if (e.target===searchTypeButton || e.target===searchTypeButtonText || e.target===searchTypeButtonCorner) {
                if (searchTypeButtonMenu.className==="dropMenuMainContainer-Hidden"){
                    searchTypeButtonMenu.className="dropMenuMainContainer-Show"
                }else{
                    searchTypeButtonMenu.className="dropMenuMainContainer-Hidden"
                }
            }else {
                searchTypeButtonMenu.className = "dropMenuMainContainer-Hidden"
            }
            //排列方式按键显隐切换
            if (e.target===sortTypeButton || e.target===sortTypeButtonText || e.target===sortTypeButtonCorner) {
                if (sortTypeButtonMenu.className==="dropMenuMainContainer-Hidden"){
                    sortTypeButtonMenu.className="dropMenuMainContainer-Show"
                }else{
                    sortTypeButtonMenu.className="dropMenuMainContainer-Hidden"
                }
            }else {
                sortTypeButtonMenu.className = "dropMenuMainContainer-Hidden"
            }
            //排列顺序按键显隐切换
            if (e.target===sortOrderButton || e.target===sortOrderButtonText || e.target===sortOrderButtonCorner) {
                if (sortOrderButtonMenu.className==="dropMenuMainContainer-Hidden"){
                    sortOrderButtonMenu.className="dropMenuMainContainer-Show"
                }else{
                    sortOrderButtonMenu.className="dropMenuMainContainer-Hidden"
                }
            }else {
                sortOrderButtonMenu.className = "dropMenuMainContainer-Hidden"
            }
            //语言按键显隐切换
            if (e.target===sortLanguageButton || e.target===sortLanguageButtonText || e.target===sortLanguageButtonCorner) {
                if (sortLanguageButtonMenu.className==="dropMenuMainContainer-Hidden"){
                    sortLanguageButtonMenu.className="dropMenuMainContainer-Show"
                }else{
                    sortLanguageButtonMenu.className="dropMenuMainContainer-Hidden"
                }
            }else {
                sortLanguageButtonMenu.className = "dropMenuMainContainer-Hidden"
            }
        }
        //搜索类型子按键 曲名
        searchTypeButtonMenuTextContainer[0].onclick=function () {
            searchTypeButtonIndex=1
            searchTypeButtonText.innerHTML="曲名"
        }
        searchTypeButtonMenuTextContainer[1].onclick=function () {
            searchTypeButtonIndex=2
            searchTypeButtonText.innerHTML="歌手"
        }
        searchTypeButtonMenuTextContainer[2].onclick=function () {
            searchTypeButtonIndex=3
            searchTypeButtonText.innerHTML="添加时间"
        }

        //排序方式子按键 添加时间
        sortTypeButtonMenuTextContainer[0].onclick=function () {
            sortTypeButtonIndex=1
            sortTypeButtonText.innerHTML="添加时间"
            sortItem()
        }
        sortTypeButtonMenuTextContainer[1].onclick=function () {
            sortTypeButtonIndex=2
            sortTypeButtonText.innerHTML="歌曲名称"
            sortItem()
        }
        sortTypeButtonMenuTextContainer[2].onclick=function () {
            sortTypeButtonIndex=3
            sortTypeButtonText.innerHTML="歌手名称"
            sortItem()
        }

        //排列顺序子按键 添加时间
        sortOrderButtonMenuTextContainer[0].onclick=function () {
            sortOrderButtonIndex=1
            sortOrderButtonText.innerHTML="倒序"
            sortItem()
        }
        sortOrderButtonMenuTextContainer[1].onclick=function () {
            sortOrderButtonIndex=2
            sortOrderButtonText.innerHTML="正序"
            sortItem()
        }

        //语言子按键 不限
        sortLanguageButtonMenuTextContainer[0].onclick=function () {
            sortLanguageButtonIndex=1
            sortLanguageButtonText.innerHTML="不限"
            sortItem()
        }
        sortLanguageButtonMenuTextContainer[1].onclick=function () {
            sortLanguageButtonIndex=2
            sortLanguageButtonText.innerHTML="日语"
            sortItem()
        }
        sortLanguageButtonMenuTextContainer[2].onclick=function () {
            sortLanguageButtonIndex=3
            sortLanguageButtonText.innerHTML="汉语"
            sortItem()
        }
        sortLanguageButtonMenuTextContainer[3].onclick=function () {
            sortLanguageButtonIndex=4
            sortLanguageButtonText.innerHTML="英语 & 其他语言"
            sortItem()
        }

        document.getElementById('searchTextarea').onkeypress=function(e){
            if (e.code==="NumpadEnter" || e.code==="Enter"){
                if (document.getElementById('searchTextarea').value===""){
                    sortItem()
                }else {
                    searchItem()
                }
            }
        }

        //搜索按键被按下
        searchButton.onclick=function () {
            if (document.getElementById('searchTextarea').value===""){
                sortItem()
            }else {
                searchItem()
            }
        }

        function searchItem(){
            let input=document.getElementById('searchTextarea')
            let findText=""
            let titleText=itemLoadXML.getElementsByTagName('title')
            let noneText="<div style='font-family: Semibold, sans-serif;opacity: 99%'>"+"未能成功搜索到有效内容"+"</div>"

            if (searchTypeButtonIndex===0 || searchTypeButtonIndex===1){
                findText=input.value
                let reg=new RegExp(findText+".*","i")
                if (findText!==""){
                    itemMainRow_Media.innerHTML=""
                    for (let i=0;i<titleText.length;i++){
                        if (titleText[i].innerHTML.match(reg)!==null){
                            itemTitle=titleText[i].parentElement.children[1].textContent
                            itemImageLeftPositionOffset=titleText[i].parentElement.children[0].textContent
                            itemAddDate=titleText[i].parentElement.children[4].textContent
                            itemSrc="Music/"+titleText[i].parentElement.parentElement.tagName+"/"+itemTitle+"/"
                            itemText=titleText[i].parentElement.children[2].textContent
                            itemHtmlSrc=itemSrc+"site.html"
                            itemImageSrc=itemSrc+"image.jpg"
                            initItem()
                        }
                    }
                    if (itemMainRow_Media.innerHTML===""){
                        itemMainRow_Media.innerHTML=noneText
                    }
                }
            }
            if (searchTypeButtonIndex===2){
                findText=input.value
                let reg=new RegExp(findText+".*","i")
                if (findText!==""){
                    itemMainRow_Media.innerHTML=""
                    for (let i=0;i<titleText.length;i++){
                        if (titleText[i].parentElement.parentElement.tagName.match(reg)!==null){
                            itemTitle=titleText[i].parentElement.children[1].textContent
                            itemImageLeftPositionOffset=titleText[i].parentElement.children[0].textContent
                            itemAddDate=titleText[i].parentElement.children[4].textContent
                            itemSrc="Music/"+titleText[i].parentElement.parentElement.tagName+"/"+itemTitle+"/"
                            itemText=titleText[i].parentElement.children[2].textContent
                            itemHtmlSrc=itemSrc+"site.html"
                            itemImageSrc=itemSrc+"image.jpg"
                            initItem()
                        }
                    }
                    if (itemMainRow_Media.innerHTML===""){
                        itemMainRow_Media.innerHTML=noneText
                    }
                }
            }
            if (searchTypeButtonIndex===3){
                findText=input.value
                let reg=new RegExp(findText+".*","i")
                if (findText!==""){
                    itemMainRow_Media.innerHTML=""
                    for (let i=0;i<titleText.length;i++){
                        if (titleText[i].parentElement.children[4].innerHTML.match(reg)!==null){
                            itemTitle=titleText[i].parentElement.children[1].textContent
                            itemImageLeftPositionOffset=titleText[i].parentElement.children[0].textContent
                            itemAddDate=titleText[i].parentElement.children[4].textContent
                            itemSrc="Music/"+titleText[i].parentElement.parentElement.tagName+"/"+itemTitle+"/"
                            itemText=titleText[i].parentElement.children[2].textContent
                            itemHtmlSrc=itemSrc+"site.html"
                            itemImageSrc=itemSrc+"image.jpg"
                            initItem()
                        }
                    }
                    if (itemMainRow_Media.innerHTML===""){
                        itemMainRow_Media.innerHTML=noneText
                    }
                }
            }
        }
    }
    originGet()
    buttonEvent()
}
main()