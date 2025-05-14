import cart from '../assets/shopping-cart.svg'
import heart from '../assets/heart.svg'
import home from  '../assets/home.svg'
export default function Footer() {
    return (
        <div className="border-t-1 absolute right-0 left-0 bottom-1 border-gray-400 flex justify-center">
            <div className="max-w-[500px] text-gray-400 w-9/10 flex  justify-between mt-2">
                <div className='flex flex-col'>
                <img className='h-6 cursor-pointer' src={home} alt="" />
                    <p>Menu</p>
                    
                </div>
                <div className='flex flex-col '>
                <img className='h-6 cursor-pointer' src={cart} alt="" />
                    <p>Boodschappenlijst</p>
                    
                </div>
                <div className='flex flex-col' >
                <img className='h-6 cursor-pointer' src={heart} alt="" />
                    <p>Favorieten</p>
                   
                </div>
                
            </div>
        </div>
    )
}