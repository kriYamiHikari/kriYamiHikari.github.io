function main() {
    document.getElementById('mainBarText').getElementsByTagName("ul")[0].innerHTML=""
    let text=["首页","音乐分享","专业教程","软件分享","小应用"]
    let link= [
        "index.html",
        "moduleItem-Media.html",
        "moduleItem-Tutorials.html",
        "moduleItem-Programs.html",
        "moduleItem-tools.html"]
    for (let b=0;b<text.length;b++){
        document.getElementById('mainBarText').getElementsByTagName("ul")[0].innerHTML+='<li>'+'<a href="'+link[b]+'">'+text[b]+'</a>'+'</li>'
    }
}
main()