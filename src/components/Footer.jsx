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
    { Icon: FaFacebook,       name: 'Facebook',  link: 'https://facebook.com/novashop' },
    { Icon: FaInstagram,      name: 'Instagram', link: 'https://instagram.com/novashop' },
    { Icon: FaTwitterSquare,  name: 'Twitter',   link: 'https://twitter.com/novashop' },
    { Icon: FaPinterest,      name: 'Pinterest', link: 'https://pinterest.com/novashop' },
  ]

  // Map customer service items to real internal links where possible
  const customerServices = [
    { label: 'Contact Us',        to: '/contact' },
    { label: 'Shipping & Returns', to: '/policyHub' },
    { label: 'FAQs',              to: '/policyHub' },
    { label: 'Order Tracking',    to: '/cart' },
    { label: 'Privacy Policy',    to: '/policyHub' },
  ]

  const features = [
    { icon: IoSparklesSharp, text: 'Premium Quality' },
    { icon: IoRocketSharp,   text: 'Fast Delivery'   },
    { icon: HiTrendingUp,    text: 'Best Prices'     },
  ]

  return (
    <footer className='relative overflow-hidden bg-[#fff] dark:bg-[#000000c5]'>
      <div className='relative px-4 pt-16 pb-8 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:pt-20'>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 gap-8 mb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12'>

          {/* Company Info */}
          <div className='space-y-4'>
            <Link to='/' aria-label='NovaShop home'>
              <div className='flex items-center gap-2 mb-4 transition-transform duration-200 hover:scale-105'>
                <BsLightningChargeFill className='text-3xl text-[#155dfc]' aria-hidden='true' />
                <span className='text-2xl sm:text-3xl font-bold text-[#155dfc]'>
                  NovaShop
                </span>
              </div>
            </Link>

            <p className='text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-400'>
              Powering Your World with the Best in Shopping.
            </p>

            {/* Contact Info with Icons */}
            <address className='space-y-3 not-italic'>
              <div className='flex items-start gap-3 transition-transform duration-200 hover:translate-x-1'>
                <FaMapMarkerAlt className='text-[#155dfc] mt-1 flex-shrink-0' aria-hidden='true' />
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  262308 Khatima, Uttarakhand, India
                </p>
              </div>

              <div className='flex items-center gap-3 transition-transform duration-200 hover:translate-x-1'>
                <FaEnvelope className='text-[#155dfc] flex-shrink-0' aria-hidden='true' />
                <a
                  href='mailto:support@novashop.com'
                  className='text-sm text-gray-600 dark:text-gray-400 hover:text-[#155dfc] transition-colors'
                >
                  support@novashop.com
                </a>
              </div>

              <div className='flex items-center gap-3 transition-transform duration-200 hover:translate-x-1'>
                <FaPhone className='text-[#155dfc] flex-shrink-0' aria-hidden='true' />
                <a
                  href='tel:+911234567890'
                  className='text-sm text-gray-600 dark:text-gray-400 hover:text-[#155dfc] transition-colors'
                >
                  +91 (123) 456-7890
                </a>
              </div>
            </address>

            {/* Features */}
            <div className='flex flex-wrap gap-2 pt-2'>
              {features.map((feature) => (
                <div
                  key={feature.text}
                  className='flex items-center gap-1.5 px-3 py-1.5 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-800 transition-transform duration-200 hover:scale-105 text-black dark:text-white'
                >
                  <feature.icon className='text-[#155dfc] text-sm' aria-hidden='true' />
                  <span className='text-xs font-medium'>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <nav aria-label='Customer service links'>
            <h3 className='text-xl sm:text-2xl font-bold text-[#155dfc] mb-4'>
              Customer Service
            </h3>
            <ul className='space-y-3'>
              {customerServices.map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.to}
                    className='text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-[#155dfc] transition-all duration-300 flex items-center gap-2 hover:translate-x-1'
                  >
                    <span className='w-1.5 h-1.5 rounded-full bg-[#155dfc] flex-shrink-0' aria-hidden='true' />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

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
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`Follow NovaShop on ${name}`}
                  className='p-3 transition-all duration-300 bg-white border border-gray-200 shadow-lg group sm:p-4 rounded-2xl dark:bg-gray-900 hover:shadow-2xl dark:border-gray-800 hover:scale-110 hover:bg-[#155dfc] hover:border-[#155dfc]'
                >
                  <Icon
                    className='text-2xl transition-colors duration-300 sm:text-3xl text-gray-700 dark:text-gray-300 group-hover:text-white'
                    aria-hidden='true'
                  />
                </a>
              ))}
            </div>

            {/* Social Stats */}
            <div className='grid grid-cols-3 gap-2 pt-4'>
              {[
                { stat: '10K+', label: 'Facebook' },
                { stat: '5K+',  label: 'Instagram' },
                { stat: '2K+',  label: 'Twitter' },
              ].map(({ stat, label }) => (
                <div
                  key={label}
                  className='p-2 text-center border border-gray-200 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm dark:border-gray-800 transition-transform duration-200 hover:scale-105'
                >
                  <div className='text-lg font-bold text-[#155dfc]'>{stat}</div>
                  <div className='text-[10px] text-gray-500'>{label}</div>
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

            <form onSubmit={handleSubmit} className='space-y-3' aria-label='Newsletter subscription'>
              <div className='relative'>
                <label htmlFor='footer-email' className='sr-only'>Email address</label>
                <input
                  id='footer-email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  className='w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 focus:border-[#155dfc] outline-none text-gray-800 dark:text-white placeholder-gray-400 transition-all duration-300 shadow-lg'
                  required
                  autoComplete='email'
                />
                <div className='absolute -translate-y-1/2 right-3 top-1/2' aria-hidden='true'>
                  <FaEnvelope className='text-gray-400' />
                </div>
              </div>

              <button
                type='submit'
                className='w-full relative overflow-hidden bg-[#155dfc] text-white font-bold py-3 sm:py-3.5 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#155dfc]/50 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95'
              >
                {subscribed ? (
                  <span className='flex items-center gap-2'>
                    <BsCheckCircleFill className='text-xl' aria-hidden='true' />
                    Subscribed!
                  </span>
                ) : (
                  <span className='flex items-center gap-2'>
                    Subscribe Now
                    <BsSendFill className='text-lg' aria-hidden='true' />
                  </span>
                )}
              </button>
            </form>

            {/* Trust Badge */}
            <div className='flex items-center gap-2 pt-2 text-xs text-gray-500 dark:text-gray-400'>
              <BsCheckCircleFill className='text-green-500' aria-hidden='true' />
              <span>No spam, unsubscribe anytime</span>
            </div>

            {/* Special Offer Banner */}
            <div className='p-4 rounded-xl bg-[#155dfc] border border-[#155dfc]/20 transition-transform duration-200 hover:scale-105'>
              <div className='flex items-center gap-2 mb-2'>
                <IoSparklesSharp className='text-[#fffb00]' aria-hidden='true' />
                <span className='text-sm font-bold text-white'>Special Offer!</span>
              </div>
              <p className='text-xs text-white'>
                Get <span className='text-green-400 font-bold'>20% OFF</span> on your first order
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='flex flex-col items-center justify-between gap-4 pt-4 text-sm text-gray-600 border-t-2 border-gray-500 sm:flex-row dark:text-gray-400 dark:border-gray-700'>
          <p className='flex items-center gap-2 transition-transform duration-200 hover:scale-105'>
            &copy; {new Date().getFullYear()}{' '}
            <span className='font-bold text-[#155dfc]'>NovaShop</span> || Made by Pawan
          </p>

          <nav aria-label='Legal links' className='flex items-center gap-4'>
            {[
              { label: 'Privacy Policy',    to: '/policyHub' },
              { label: 'Terms of Service',  to: '/policyHub' },
              { label: 'Cookies',           to: '/policyHub' },
            ].map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className='hover:text-[#155dfc] transition-colors text-xs sm:text-sm'
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className='flex items-center gap-2 text-xs transition-transform duration-200 hover:scale-110'>
            <BsLightningChargeFill className='text-[#f6ff00]' aria-hidden='true' />
            <span>Powered by Innovation</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer