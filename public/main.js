console.log("我是 main.js")
getCSS.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/style.css')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if ((request.status >= 200 && request.status < 300) || request.status === 304) {
        console.log('成功了')
        console.log(request.response)
        const style = document.createElement('style')
        style.innerHTML = request.response
        document.head.appendChild(style)
      } else {
        alert('Request was unsuccessful: ' + request.status)
      }
    }
  }
  request.send()
}

getJS.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/2.js')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if ((request.status >= 200 && request.status < 300) || request.status === 304) {
        console.log('成功了')
        console.log(request.response)
        const script = document.createElement('script')
        script.innerHTML = request.response
        document.body.appendChild(script)
      } else {
        alert('Request was unsuccessful: ' + request.status)
      }
    }
  }
  request.send()
}

getHTML.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/3.html')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      console.log('下载完成了')
      if ((request.status >= 200 && request.status < 300) || request.status === 304) {
        alert(request.responseText)
        const div = document.createElement('div')
        div.innerHTML = request.response
        document.body.appendChild(div)
      } else {
        alert('Request was unsuccessful: ' + request.status)
      }
    }
  }
  request.send()
}

getXML.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/4.xml')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      console.log('下载完成了')
      if ((request.status >= 200 && request.status < 300) || request.status === 304) {
        const dom = request.responseXML
        const text = dom.getElementsByTagName('warning')[0].textContent
        alert(text.trim())
      } else {
        alert('Request was unsuccessful: ' + request.status)
      }
    }
  }
  request.send()
}

getJSON.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/5.json')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      console.log('下载完成了')
      if ((request.status >= 200 && request.status < 300) || request.status === 304) {
        console.log(request.response)
        const object = JSON.parse(request.response)
        myName.textContent = object.name
      } else {
        alert('Request was unsuccessful: ' + request.status)
      }
    }
  }
  request.send()
}

next.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/next')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if ((request.status >= 200 && request.status < 300) || request.status === 304) {
        try {
          const array = JSON.parse(request.response)
          array.forEach(item => {
            const li = document.createElement('li')
            li.textContent = item.id
            xxx.appendChild(li)
          })
        } catch (error) {
        }
      }
    }
  }
  request.send()
}

pre.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/pre')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if ((request.status >= 200 && request.status < 300) || request.status === 304) {
        try {
          const array = JSON.parse(request.response)
          array.forEach(item => {
            let li = document.querySelectorAll('li')
            let l = li.length
            for (let i = 0; i < l; i++) {
              if (li[i].textContent.trim() === item.id.toString()) {
                li[i].remove()
              }
            }
          })
        } catch (error) {
        }

      }
    }
  }
  request.send()
}