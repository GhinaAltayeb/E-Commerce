import Pagination from '@/components/Pagination'
import ProductCard from '@/components/ProductCard'
import { useCart } from '@/context/CartContext'
import useDebounce from '@/hooks/useDebounce'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function AllProducts() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [products, setProducts] = useState([])
    const { addToCart } = useCart()

    // pagination
    const [pagination, setPagination] = useState({
        current: 1,
        total: 0,
        limit: 12,
        skip: 0
    })
    const totalPages = Math.ceil(pagination.total / pagination.limit)

    // search
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm);


    useEffect(() => {
        const getAllProducts = async () => {
            setLoading(true)
            setError("")
            try {
                let url = `https://dummyjson.com/products?limit=${pagination.limit}&skip=${pagination.skip}`
                if (debouncedSearchTerm.trim() !== "") {
                    url = `https://dummyjson.com/products/search?q=${debouncedSearchTerm}&limit=${pagination.limit}&skip=${pagination.skip}`
                }
                const res = await axios.get(url)
                console.log(res.data)
                if (res.status === 200) {
                    const data = res.data
                    setProducts(data.products)
                    setPagination(prev => ({
                        ...prev,
                        total: data.total,
                        skip: data.skip,
                    }))
                }
            }
            catch (err) {
                console.log(err)
                setError(err.message)
            }
            finally {
                setLoading(false)
            }
        }
        getAllProducts()
    }, [debouncedSearchTerm, pagination.limit, pagination.skip])

    const handleAddToCart = (product) => {
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.images?.[0] || product.thumbnail,
            brand: product.brand
        })
        toast.success(`${product.title} added to your cart 🛒`, {
            duration: 2000
        })
    }

    const handlePageChange = useCallback((newPage) => {
        setPagination(prev => ({
            ...prev,
            current: newPage,
            skip: (newPage - 1) * prev.limit
        }))
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])

    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearchTerm(value)

        setPagination(prev => ({
            ...prev,
            current: 1,
            skip: 0
        }))
    }

    return (
        <div className="p-12 py-8">
            <div className="mb-8">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search products..."
                    className="w-full max-w-[333px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            <div className='grid grid-cols-4 gap-8 min-h-50'>
                {loading && error === "" &&
                    <div className="col-span-4 flex justify-center items-center">
                        <span className="loader"></span>
                    </div>
                }

                {!loading && error != "" &&
                    <p className='col-span-4 text-center text-2xl text-red-400'>{error}</p>
                }

                {products.length === 0 && !loading && error === "" && (
                    <p className='col-span-4 text-center text-2xl text-red-400'>No results found.</p>
                )}

                {products && !loading && error === "" && (
                    products.map((item) => (
                        <ProductCard key={item.id} item={item} onAddToCart={handleAddToCart} />
                    ))
                )}
            </div>

            {!loading && totalPages >= 1 && (
                <div className="mt-8">
                    <Pagination
                        currentPage={pagination.current}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    )
}

export default AllProducts