/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { BsLightningChargeFill, BsSendFill, BsCheckCircleFill } from 'react-icons/bs'
import { IoSparklesSharp, IoRocketSharp } from 'react-icons/io5'
import { HiTrendingUp } from 'react-icons/hi'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => {
        setSubscribed(false)
        setEmail('')
      }, 3000)
    }
  }

  const socialIcons = [
    { Icon: FaFacebook, name: 'Facebook', link: '#' },
    { Icon: FaInstagram, name: 'Instagram', link: '#' },
    { Icon: FaTwitterSquare, name: 'Twitter', link: '#' },
    { Icon: FaPinterest, name: 'Pinterest', link: '#' }
  ]

  const customerServices = [
    'Contact Us',
    'Shipping & Returns',
    'FAQs',
    'Order Tracking',
    'Size Guide'
  ]

  const features = [
    { icon: IoSparklesSharp, text: 'Premium Quality' },
    { icon: IoRocketSharp, text: 'Fast Delivery' },
    { icon: HiTrendingUp, text: 'Best Prices' }
  ]

  return (
    <footer className='relative overflow-hidden bg-[#fff] dark:bg-[#000000c5]'>
      <div className='relative px-4 pt-16 pb-8 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:pt-20'>
        
        {/* Main Content Grid */}
        <div className='grid grid-cols-1 gap-8 mb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12'>
          
          {/* Company Info */}
          <div className='space-y-4'>
            <Link to='/'>
              <div className='flex items-center gap-2 mb-4 transition-transform duration-200 hover:scale-105'>
                <BsLightningChargeFill className='text-3xl text-[#155dfc]' />
                <h1 className='text-2xl sm:text-3xl font-bold text-[#155dfc]'>
                  NovaShop
                </h1>
              </div>
            </Link>
            
            <p className='text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-400'>
              Powering Your World with the Best in Shopping.
            </p>

            {/* Contact Info with Icons */}
            <div className='space-y-3'>
              <div className='flex items-start gap-3 transition-transform duration-200 hover:translate-x-1'>
                <FaMapMarkerAlt className='text-[#155dfc] mt-1 flex-shrink-0' />
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  262308 Khatima, Uttarakhnad, India 10001
                </p>
              </div>
              
              <div className='flex items-center gap-3 transition-transform duration-200 hover:translate-x-1'>
                <FaEnvelope className='text-[#155dfc] flex-shrink-0' />
                <a href="mailto:support@NovaShop.com" className='text-sm text-gray-600 dark:text-gray-400 hover:text-[#155dfc] transition-colors'>
                  NovaShop@8705.com
                </a>
              </div>
              
              <div className='flex items-center gap-3 transition-transform duration-200 hover:translate-x-1'>
                <FaPhone className='text-[#155dfc] flex-shrink-0' />
                <a href="tel:1234567890" className='text-sm text-gray-600 dark:text-gray-400 hover:text-[#2d6fff9e] transition-colors'>
                  (123) 456-7890
                </a>
              </div>
            </div>

            {/* Features */}
            <div className='flex flex-wrap gap-2 pt-2'>
              {features.map((feature, i) => (
                <div
                  key={i}
                  className='flex items-center gap-1.5 px-3 py-1.5 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-800 transition-transform duration-200 hover:scale-105 text-black dark:text-white'
                >
                  <feature.icon className='text-[#155dfc] text-sm' />
                  <span className='text-xs font-medium'>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <div className='space-y-4'>
            <h3 className='text-xl sm:text-2xl font-bold text-[#155dfc]'>
              Customer Service
            </h3>
            <ul className='space-y-3'>
              {customerServices.map((service, index) => (
                <li
                  key={index}
                  className='text-sm sm:text-base text-gray-600 dark:text-gray-400 cursor-pointer hover:text-[#155efcb3] transition-all duration-300 flex items-center gap-2 hover:translate-x-1'
                >
                  <span className='w-1.5 h-1.5 rounded-full bg-[#155dfc]' />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className='space-y-4'>
            <h3 className='text-xl sm:text-2xl font-bold text-[#155dfc]'>
              Follow Us
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Join our community for exclusive updates
            </p>
            
            <div className='flex flex-wrap gap-3'>
              {socialIcons.map(({ Icon, name, link }) => (
                <a
                  key={name}
                  href={link}
                  className={`p-3 transition-all duration-300 bg-white border border-gray-200 shadow-lg group sm:p-4 rounded-2xl dark:bg-gray-900 hover:shadow-2xl dark:border-gray-800 hover:scale-110 hover:bg-[#155dfc] hover:border-[#155dfc]`}
                >
                  <Icon className='text-2xl transition-colors duration-300 sm:text-3xl text-gray-700 dark:text-gray-300 group-hover:text-white' />
                </a>
              ))}
            </div>

            {/* Social Stats */}
            <div className='grid grid-cols-3 gap-2 pt-4'>
              {['10K+', '5K+', '2K+'].map((stat, i) => (
                <div
                  key={i}
                  className='p-2 text-center border border-gray-200 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm dark:border-gray-800 transition-transform duration-200 hover:scale-105'
                >
                  <div className='text-lg font-bold text-[#155dfc]'>{stat}</div>
                  <div className='text-[10px] text-gray-500'>Followers</div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className='space-y-4'>
            <h3 className='text-xl sm:text-2xl font-bold text-[#155dfc]'>
              Stay in the Loop
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Subscribe to get special offers, free giveaways, and exclusive deals!
            </p>
            
            <form onSubmit={handleSubmit} className='space-y-3'>
              <div className='relative'>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  className='w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 focus:border-[#155dfc] outline-none text-gray-800 dark:text-white placeholder-gray-400 transition-all duration-300 shadow-lg'
                  required
                />
                <div className='absolute -translate-y-1/2 right-3 top-1/2'>
                  <FaEnvelope className='text-gray-400' />
                </div>
              </div>
              
              <button
                type='submit'
                className='w-full relative overflow-hidden bg-[#155dfc] text-white font-bold py-3 sm:py-3.5 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#155dfc]/50 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95'
              >
                {subscribed ? (
                  <div className='flex items-center gap-2'>
                    <BsCheckCircleFill className='text-xl' />
                    <span>Subscribed!</span>
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    <span>Subscribe Now</span>
                    <BsSendFill className='text-lg' />
                  </div>
                )}
              </button>
            </form>

            {/* Trust Badges */}
            <div className='flex items-center gap-2 pt-2 text-xs text-gray-500 dark:text-gray-400'>
              <BsCheckCircleFill className='text-green-500' />
              <span>No spam, unsubscribe anytime</span>
            </div>

            {/* Special Offer Banner */}
            <div className='p-4 rounded-xl bg-[#155dfc] border border-[#155dfc]/20 transition-transform duration-200 hover:scale-105'>
              <div className='flex items-center gap-2 mb-2'>
                <IoSparklesSharp className='text-[#fffb00]' />
                <span className='text-sm font-bold'>Special Offer!</span>
              </div>
              <p className='text-xs text-[#ffffff]'>
                Get <span className='text-green-400 font-bold'>20% OFF</span> on your first order
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='flex flex-col items-center justify-between gap-4 pt-4 text-sm text-gray-600 border-t-2 border-gray-500 sm:flex-row dark:text-gray-400 dark:border-gray-700'>
          <p className='flex items-center gap-2 transition-transform duration-200 hover:scale-105'>
            &copy; {new Date().getFullYear()} 
            <span className='font-bold text-[#155dfc]'>NovaShop</span>|| Made by Pawan
          </p>
          <div className='flex items-center gap-4'>
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((link, i) => (
              <a
                key={i}
                href="#"
                className='hover:text-[#155dfc] transition-colors text-xs sm:text-sm'
              >
                {link}
              </a>
            ))}
          </div>

          <div className='flex items-center gap-2 text-xs transition-transform duration-200 hover:scale-110'>
            <BsLightningChargeFill className='text-[#f6ff00]' />
            <span>Powered by Innovation</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
