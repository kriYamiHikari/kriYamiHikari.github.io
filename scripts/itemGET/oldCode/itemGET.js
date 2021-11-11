function main() {
    let xmlHttp=new XMLHttpRequest()
    let btn1Test=document.getElementById('btn1')
    btn1Test.onmousedown=function(){
        xmlHttp.onreadystatechange=function () {
            if (this.readyState==4 && this.status==200){
                let xmlDoc=this.responseXML
                let txt=""
                let item=xmlDoc.getElementsByTagName("imageSrc")

                for (i=0;i<item.length;i++){
                    txt+=item[i].childNodes[0].nodeValue+"<br>"
                }
                btn1Test.innerHTML="成功查找到"+item.length.toString()+"张图片\<br\>"+txt

                let itemMainRow=document.getElementById('itemMainRow')
                let itemMax=xmlDoc.getElementsByTagName("item")
                let itemImageSrc=xmlDoc.getElementsByTagName("imageSrc")
                let itemTitle=xmlDoc.getElementsByTagName("title")

                itemMainRow.innerHTML=""
                for (i=0;i<itemMax.length;i++){
                    itemMainRow.innerHTML+=
                        '                    <div class="itemMain">\n' +
                        '                        <article class="postItemStyle">\n' +
                        '                            <div class="entry-media">\n' +
                        '                                <img class="imageLoad" src="'+itemImageSrc[i].childNodes[0].nodeValue+'">\n' +
                        '                            </div>\n' +
                        '                            <div class="entry-text">\n' +
                        '                                <header>'+itemTitle[i].childNodes[0].nodeValue+'</header>\n' +
                        '                            </div>\n' +
                        '                        </article>\n' +
                        '                    </div>'
                }
            }
        }
        xmlHttp.open("get","itemLoad.xml",true)
        xmlHttp.send()
    }
}
main()