import { getData } from '../context/DataContext'

const FilterSection = ({ search, setSearch, brand, setBrand, priceRange, setPriceRange, category, setCategory, handleBrandChange, handleCategoryChange }) => {
    const { categoryOnlyData, brandOnlyData } = getData()

    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif" }} className='hidden md:flex flex-col gap-3 bg-white dark:bg-[#0f0f0f] border border-gray-100 dark:border-white/10 rounded-3xl p-4 mt-6 h-max shadow-sm'>

            {/* Search */}
            <div className='relative'>
                <svg className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                    <circle cx='11' cy='11' r='8'/><path d='m21 21-4.35-4.35'/>
                </svg>
                <input
                    type="text"
                    placeholder='Search products...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full pl-9 pr-4 py-1.5 text-sm rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#155dfc]/30 focus:border-[#155dfc] transition-all'
                />
            </div>

            <div className='h-px bg-gray-100 dark:bg-white/5' />

            {/* Category */}
            <div>
                <p className='text-sm font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-300 my-2'>Category</p>
                <div className='flex flex-col gap-0.5 max-h-70 overflow-y-auto pr-1' style={{ scrollbarWidth: 'thin', scrollbarColor: '#155dfc44 transparent' }}>
                    {categoryOnlyData?.map((item, index) => {
                        const isActive = category === item
                        return (
                            <label key={index} className={`flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer transition-all ${isActive ? 'bg-[#155dfc]/10 dark:bg-[#155dfc]/20' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}>
                                <input type="checkbox" name={item} checked={isActive} value={item} onChange={handleCategoryChange} className='hidden' />
                                <span className={`w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${isActive ? 'bg-[#155dfc] border-[#155dfc]' : 'border-gray-300 dark:border-gray-600'}`}>
                                    {isActive && (
                                        <svg className='w-2.5 h-2.5 text-white' fill='none' stroke='currentColor' strokeWidth='3' viewBox='0 0 24 24'>
                                            <path d='M5 13l4 4L19 7'/>
                                        </svg>
                                    )}
                                </span>
                                <span className={`text-sm font-medium uppercase tracking-wide transition-colors ${isActive ? 'text-[#155dfc]' : 'text-gray-600 dark:text-gray-400'}`}>{item}</span>
                            </label>
                        )
                    })}
                </div>
            </div>

            <div className='h-px bg-gray-100 dark:bg-white/5' />

            {/* Brand */}
            <div>
                <p className='text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-300 my-2'>Brand</p>
                <div className='relative'>
                    <select value={brand} onChange={handleBrandChange} className='w-full appearance-none px-3 py-1.5 text-sm rounded-xl bg-gray-50 dark:bg-[#000000e6]  border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white  focus:outline-none focus:ring-2 focus:ring-[#155dfc]/30 focus:border-[#155dfc] transition-all cursor-pointer'>
                        {brandOnlyData?.map((item, index) => (
                            <option key={index} value={item}>{item.toUpperCase()}</option>
                        ))}
                    </select>
                    <svg className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                        <path d='M6 9l6 6 6-6'/>
                    </svg>
                </div>
            </div>

            <div className='h-px bg-gray-100 dark:bg-white/5' />

            {/* Price Range */}
            <div>
                <div className='flex items-center justify-between mb-1.5'>
                    <p className='text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500'>Price Range</p>                    <span className='text-xs font-semibold text-[#155dfc] bg-[#155dfc]/10 dark:bg-[#155dfc]/20 px-2 py-0.5 rounded-full'>${priceRange[0]} – ${priceRange[1]}</span>
                </div>
                <input type="range" min="0" max="5000" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className='w-full accent-[#155dfc] cursor-pointer' />
                <div className='flex justify-between text-xs text-gray-400 dark:text-gray-600 mt-1'>
                    <span>$0</span><span>$5000</span>
                </div>
            </div>

            {/* Reset */}
            <button
                onClick={() => { setSearch(''); setCategory('All'); setBrand('All'); setPriceRange([0, 5000]) }}
                className='w-full py-1.5 rounded-xl text-sm font-semibold text-[#155dfc] border-2 border-[#155dfc]/30 hover:bg-[#155dfc] hover:text-white hover:border-[#155dfc] transition-all duration-200 cursor-pointer'
            >
                Reset Filters
            </button>

        </div>
    )
}

export default FilterSection


