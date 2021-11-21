function main(){
    let xmlHttp=new XMLHttpRequest()
    let item=document.getElementById('test2')
    let text,mainText,getText,afterText,getText2,afterText2,afterText3=""
    let item2=document.getElementById('testText')
    let i=0
    let c=0

    xmlHttp.onreadystatechange=function () {
        if (this.readyState===4 && this.status===200){
            text=this.responseText
            setInterval(changeGo,8)
            lyricAdd()
        }
    }
    xmlHttp.open("get","lyric.lrc",true)
    xmlHttp.send()

    function changeGo() {

        mainText=musicTimeMinuteText+":"+musicTimeSecondText.replace(".","\\.")
        for (i=0;i<item.getElementsByTagName("div").length;i++){ //遍历子div 获取当前歌词所在行
            getText=item.getElementsByTagName("div")[i].innerHTML.match(mainText+"].?")
            if (getText!==null){
                c=i+1
            }
        }
        afterText=item.getElementsByTagName("div")[c-1].innerHTML.replace(/\[.*?]/g,"")

        getText2=text.match(mainText+"].?")
        if (getText2!==null) {
            afterText2=getText2.toString().replace(/.*]/,"")
            document.getElementById('test1').innerHTML = afterText2
            let reg=new RegExp(afterText2).exec(afterText)
            /*if (afterText.search(afterText2)!==null){
                afterText3=afterText.search(afterText2)
            }*/
            afterText3=reg
        }

        item2.innerHTML=afterText+" "+c.toString()+" "+afterText3
    }
    function lyricAdd() {
        let abc=text.replace(/^/gm,"<div style='display: flex;justify-content: center'>")
        let after=abc.replace(/$/gm,"</div>")

        let reg=/<([a-z]+?)(?:\s+?[^>]*?)?>\s*?<\/\1>/ig //匹配空标签
        let after2=after.replace(reg,"")

        item.innerHTML=after2
    }
}
main()