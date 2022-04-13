import React,{useState} from "react";
import useModal from './Hooks/useModal'

function App() {
  const {Modal,isShow,show,hide,confirm} = useModal({
		defaultShow:true,
		onShow:()=>{
			// console.log('show回调');
			setVisiable(true)
		},
		onHide:()=>{
			// console.log('hide回调');
			// setVisiable(false)
		},
		onConfirm:() => {
			console.log('点击确定的回调');
			handleOk()
		}
	})
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [visiable,setVisiable] = useState(false)
	const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
			setVisiable(false)
      setConfirmLoading(false);
    }, 2000);
  };
	const aconfirm = ()=>{
		confirm()
	}
	//console.log('isShow',typeof isShow); // boolean
	return (
		<div>
			<div>show:{isShow.toString()}</div>
				<button onClick={aconfirm}></button>
				<button onClick={show}>show</button>
				<button onClick={hide}>hide</button>
			<Modal 
				title={'我是标题'}
				confirmLoading={confirmLoading}	
				visiable={visiable}
			>
				portal
			</Modal>
		</div>
	);
}

export default App;
