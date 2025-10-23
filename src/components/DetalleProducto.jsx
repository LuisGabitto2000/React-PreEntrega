import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const DetalleProducto = () => {

  const [producto, setProducto] = useState([])
  const [error, setError] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProducto(data)
      })
      .catch(() => {
        setError('El producto no se pudo obtener')
      })
  }, [id])

  if (error){
    return <p>{error}</p> 
  }

  return (
    <div className='min-h-screen bg-[#1F1D2B] text-gray-200 flex flex-col items-center justify-center p-6'>
      <div className='bg-[#262837] rounded-2xl shadow-xl p-8 max-w-md w-full text-center'>
        <img src={producto.image} alt={producto.title} className='w-60 h-60 object-contain mx-auto mb-6'/>
        <h2 className='text-2xl font-semibold mb-4'>{producto.title}</h2>
        <p className='text-gray-400 text-sm mb-6 leading-relaxed'>{producto.description}</p>
        <p className="text-[#ec7c6a] font-bold text-xl mb-8">${producto.price}</p>
        <Link to={"/"} className='inline-block bg-[#ec7c6a] hover:bg-[#d86b5a] text-white font-semibold py-2 px-6 rounded-xl transition-colors duration-200'>← Volver</Link>
      </div>
    </div>
  )
}

export default DetalleProducto