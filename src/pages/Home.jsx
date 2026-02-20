import Carousel from '../components/Homepage_Components/Carousel'
import MidBanner from '../components/Homepage_Components/MidBanner'
import Features from '../components/Homepage_Components/Features'
import Reviews from "../components/Homepage_Components/Review"
import UseCaseSection from '../components/Homepage_Components/UseCaseSection'
import Category from '../components/Homepage_Components/Category';
import Deals from '../components/Homepage_Components/Deals'

const Home = () => {
  
  return (
    <div className='overflow-x-hidden'>
      <Category />
      <Carousel/>
      <UseCaseSection/>
      <Deals/>
      <MidBanner/>
      <Features/>
      <Reviews/>
    </div>
  )
}

export default Home

