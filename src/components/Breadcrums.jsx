import { Link } from 'react-router-dom'

const Breadcrums = ({ title }) => {
  return (
    <nav aria-label="Breadcrumb" className='max-w-6xl pt-5 px-5 my-10'>
      <ol className='flex items-center gap-1 text-sm' style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li>
          <Link
            to='/'
            className='text-[#155dfc] font-semibold hover:underline'
          >
            Home
          </Link>
        </li>
        <li aria-hidden='true' className='text-gray-400 mx-1'>/</li>
        <li>
          <Link
            to='/products'
            className='text-[#155dfc] font-semibold hover:underline'
          >
            Products
          </Link>
        </li>
        <li aria-hidden='true' className='text-gray-400 mx-1'>/</li>
        <li
          aria-current='page'
          className='text-gray-600 dark:text-gray-300 font-medium truncate max-w-[200px] sm:max-w-xs'
          title={title}
        >
          {title}
        </li>
      </ol>
    </nav>
  )
}

export default Breadcrums