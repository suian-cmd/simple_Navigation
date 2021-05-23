const $siteList = $('.siteList')
const  $lastLi = $siteList.find('li.last')
const  local = localStorage.getItem('local')
const  localObject = JSON.parse(local)
// localObject如果为null，则初始化hashMap
const  hashMap = localObject || [
    {logo: 'A', url: 'https://www.acfun.cn'},
    {logo: 'B', url: 'https://www.bilibili.com'}
]
// developer.mozilla.org/zh-CN/docs/  去除网址以/开头的内容
const  simplifyUrl = (url) => {
    return url.replace('https://','').replace('http://',"")
        .replace('www.','').replace(/\/.*/, '')
}

const  render = () => {
    $siteList.find('li:not(.last)').remove()
    //forEach 内 第一个参数为hashMap内的对象 ， index为对象下标
    hashMap.forEach((node, index) => {
        const  $li = $(`<li>
          <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
              <svg class="icon">
                <use xlink:href="#icon-delete"></use>
              </svg>
            </div>
          </div>
        </li>`).insertBefore(($lastLi))

        $li.on('click', () => {
            window.open(node.url, "_self")
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥？')
    if(url !== null){
        if(url.indexOf('http') !== 0){
            url = 'https://' + url
        }
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            url : url
        })
        render()
    }
})

window.onbeforeunload = () => {
    const  string = JSON.stringify(hashMap)
    localStorage.setItem('local', string)
}

$(document).on('keypress', (e) => {
    //console.log(e)
    // console.log(e.target.nodeName)   // 'INPUT'
    // console.log(e.target.nodeName === 'INPUT')
    if(e.target.nodeName !== 'INPUT'){
        const key = e.key
        for (let i = 0; i < hashMap.length; i++){
            if (hashMap[i].logo.toLowerCase() === key) {
                window.open(hashMap[i].url, "_self")
            }
        }
    }

})