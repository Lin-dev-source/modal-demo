import {useCallback,useState,useEffect, useRef} from 'react';
import usePortal from "./usePortal";
import { render } from 'react-dom';
import './modal.scss'

function modal(Portal,isShow,hide,onConfirm){
  return function({children,title,confirmLoading,visiable}){
    const wrapRef = useRef()
    const hideClick = (e) => {
      if(e.target === wrapRef.current){
        hide()
      }
    }
    const confirmClick = () => {
      typeof onConfirm === 'function' && onConfirm()
    }

    useEffect(()=>{
      if(!confirmLoading){
        console.log('callback');
      }
    },[confirmLoading])
    return isShow && visiable && (
      <Portal>
        <div className='modal-wrap' onClick={hideClick} ref={wrapRef}>
          <div className="container">
            <div className="header">{title}</div>
            <div className="body">{children}</div>
            <div className="control">
              <div className="confirm" onClick={confirmClick}>{confirmLoading?'加载中':'确定' } </div>
              <div className="cancel" onClick={hide}>取消</div>
            </div>
            <div className="close" onClick={hide}>x</div>
          </div>
          
        </div>
      </Portal>
    )
  }
}

function useModal({
  containerId='',
  defaultShow = true,
  onShow,
  onHide,
  onConfirm,
}){
  const {Portal,isShow,show,hide} = usePortal({
    containerId,defaultShow,onShow,onHide
  })
  const Modal = useCallback(modal(Portal,isShow,hide,onConfirm),[isShow])
  const confirm = () => {
    console.log('confirm: ');
    const container = document.createDocumentFragment();
    render(Modal,container)
  }
  
  // console.log('Modal: ', Modal);
  

  return {Modal,isShow,show,hide,confirm}
}
export default useModal