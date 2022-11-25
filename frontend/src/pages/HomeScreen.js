import { useEffect, useState } from 'react'
import axios from 'axios'

const HomeScreen = () => {
    //definir state para salvar dados do backend
    const [services, setServices] = useState([])
    useEffect(() =>{
        const fetchDataServices = async () => {
            const result = await axios.get('/api/services')
            setServices(result.data)
          }
          fetchDataServices()
          console.log(services)
    }, [])
  return (
    <div>
      {services.map((service) => (
        <div key={service.id}>
          <img src={service.imageSrc} alt={service.imageAlt} />
        </div>
      ))}
    </div>
  )
}

export default HomeScreen