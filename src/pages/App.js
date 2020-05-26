import React, { useEffect, useState } from 'react'
import { fetchProducts, fetchPrice } from '../services/products'
import { mergeData } from '../utils/mergeData'
import { formatData } from '../utils/formatData'
import EnhancedTable from '../components/EnhancedTable/EnhancedTable'
import './App.scss'

const formatDataForTable = (data) => {
  return data.map((item) => ({
    id: item.id,
    pair: `${item.firstValueOfPair}/${item.secondValueOfPair}`,
    lastPrice: item.currentPrice,
    change: ((item.currentPrice / item.prevPrice) * 100 - 100).toFixed(2)
  }))
}

const getFilterData = (arrayData, filter) => {
  return arrayData.filter((item) => item.secondValueOfPair === filter)
}

const App = () => {
  const [decryptedData, setDecryptedData] = useState([])
  const [serachFilterData, setSerachFilterData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [favoriteList, setFavoriteList] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('BTC')
  const [showFavorite, setShowFavorite] = useState(false)

  useEffect(() => {
    const serachFilter = (arr) => {
      const fiterArr = arr.filter((item) => {
        return item.pair.toLowerCase().includes(search.toLowerCase().trim())
      })

      setSerachFilterData(fiterArr)
    }

    serachFilter(filterData)
  }, [search, filterData])

  useEffect(() => {
    const filtredArr = getFilterData(decryptedData, filter)
    setFilterData(formatDataForTable(filtredArr))
  }, [filter, decryptedData])

  useEffect(() => {
    async function fetchData() {
      const products = await fetchProducts()
      console.log(products)
      fetchPrice().onmessage = ({ data }) => {
        const mergedData = mergeData({ products, price: JSON.parse(data) })
        const decryptedData = formatData(mergedData)
        setDecryptedData(decryptedData)
      }
    }
    fetchData()
  }, [])

  const handleChangeSearch = ({ target: { value } }) => value

  const changeFilterValue = (value) => {
    setFilter(value)
  }

  const handleToggleElement = (event, id) => {
    const element = favoriteList.find((item) => item.id === id)

    if (element) {
      const updateFavoriteList = favoriteList.filter((item) => item.id !== id)
      setFavoriteList(updateFavoriteList)
    } else {
      const curentElement = serachFilterData.find((item) => item.id === id)
      favoriteList.push(curentElement)
      setFavoriteList(favoriteList)
    }
  }

  const isFavorite = (id) => {
    return !!favoriteList.find((item) => item.id === id)
  }

  const toggleShowFavorite = () => {
    console.log(favoriteList)
    setShowFavorite(!showFavorite)
  }

  return (
    <div className="App">
      <EnhancedTable
        search={search}
        filter={filter}
        changeFilterValue={changeFilterValue}
        handleChangeSearch={handleChangeSearch}
        handleToggleElement={handleToggleElement}
        toggleShowFavorite={toggleShowFavorite}
        isFavorite={isFavorite}
        showFavorite={showFavorite}
        priceData={showFavorite ? favoriteList : serachFilterData}
      />
    </div>
  )
}

export default App
