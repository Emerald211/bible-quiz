import { useContext } from 'react'
import Call from '../../assets/images/call.png'
import './Modal.css'
import { QuizContext } from '../../context/Context'
const AlumusModal = () => {

    const { secondDisplay} = useContext(QuizContext)
  return (
      <div className='qa-container  z-30 font-serrat flex md:flex-col flex-row justify-center gap-2  w-[265px] h-[70px] md:h-[300px] items-center rounded-2xl bottom-[17dvh] md:bottom-0 md:top-40  absolute right-14 md:right-2'>
         <img className='  h-7' src={Call} alt="" />
          <h1 className=' mt-3 text-white font-bold'>Calling an Alumnus....</h1>

          <h3 className=' text-white'> You have {secondDisplay} seconds left </h3>
    </div>
  )
}

export default AlumusModal;