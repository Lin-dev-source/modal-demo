import {useCallback,useState,useEffect} from 'react';
import {createPortal} from 'react-dom'

function createEle(){
  const ele = document.createElement('div')
  document.body.appendChild(ele)
  return ele
}


function portal(id,isShow){
  return function({children}){
    
    const [container,setContainer] = useState(document.getElementById(id) || createEle())
    // setContainer(document.getElementById(id) || createEle())
    useEffect(()=>{
      // 第一次一定会执行
      // setContainer(document.getElementById(id) || createEle())
      
      return () => {
        // 销毁container
        // if(container.innerHTML === '') container.remove()
      }
    },[container])

    // 返回一个虚拟DOM
    const portalDom = isShow && container && createPortal(children,container)

    return portalDom
  }
}

function usePortal({
  containerId='',
  defaultShow=true,
  onShow,
  onHide,
}){
  const [isShow,setIsShow] = useState(defaultShow)

  const show = ()=>{
    setIsShow(true)
    typeof onShow === 'function' && onShow()
  }

  const hide = ()=>{
    setIsShow(false)
    typeof onShow === 'function' && onHide()
  }
  // useCallback返回一个函数，当把它返回的这个函数作为子组件使用
  const Portal = useCallback(portal(containerId,isShow),[isShow])
  // console.log('Portal: ', Portal);

  // show和hide return出去是为了直接在外面调用
  return {Portal,isShow,show,hide}
} 

export default usePortal