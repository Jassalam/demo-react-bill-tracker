import { useState, useEffect } from 'react'
import AddBill from './components/AddBill'
import AddCategory from './components/AddCategory'
import BillsTable from './components/BillsTable'
import NavBar from './components/NavBar'

function App() {
  const [shouldShowAddCategory, setShouldShowAddCategory] = useState(false)
  const [categories, setCategories] = useState([])
  const [bills, setBills] = useState([])
  const [shouldShowAddBill, setShouldShowAddBill] = useState(false)
  const [activeCategory, setActiveCategory] = useState('')

  useEffect(() => {
    const categoriesInLocalStorage = JSON.parse(
      localStorage.getItem('categories')
    )
    const billInLocalStorage = JSON.parse(localStorage.getItem('bills'))

    setCategories(categoriesInLocalStorage)
    setBills(billInLocalStorage)

    if (!categoriesInLocalStorage) {
      setShouldShowAddCategory(true)
    }

    if(!billInLocalStorage){
      setShouldShowAddBill(true)
    }
  }, [])

  const addCategory = (category) => {
    const updatedCategories = [...(categories || []), category]
    setCategories(updatedCategories)
    localStorage.setItem('categories', JSON.stringify(updatedCategories))
    setShouldShowAddCategory(false)
  }

  const showAddCategory = () =>{
    setShouldShowAddCategory(true)
  }

  const addBill = (amount, category, date)=>{
    const bill = {amount, category, date}
    const updatedBills = [...(bills || []), bill]
    setBills(updatedBills)
    setShouldShowAddBill(false)
    localStorage.setItem('bills', JSON.stringify(updatedBills))
}

const showAddBill = ()=>{
  setShouldShowAddBill(true)
}
  
const removeBill = index =>{
  let updatedBills = [...bills]
  updatedBills = updatedBills.slice(0, index)
  .concat(updatedBills.slice(index+1, updatedBills.length))
  setBills(updatedBills)
  localStorage.setItem('bills', JSON.stringify(updatedBills))
}

const activeBills =()=>{
  return bills
  ?.filter(bill => activeCategory ? bill.category === activeCategory : true
    )
    .sort((a,b)=>(new Date(a.date) < new Date(b.date)? 1: -1))
}

const setNewActiveCategory = index =>{
  setActiveCategory(index)
}

  return (
    <div className='App'>
      {shouldShowAddCategory ? (
        <AddCategory onSubmit={addCategory} />
      ) : shouldShowAddBill ?(
        <AddBill onSubmit={addBill} categories={categories}/>
      ):(
        <div>
          <NavBar 
          categories={categories} 
          showAddCategory={showAddCategory}
          activeCategory= {activeCategory}
          setNewActiveCategory={setNewActiveCategory}/>
          <div className="container flex">
            <div className="w-1/2">
            <BillsTable bills={activeBills()} 
            showAddBill={showAddBill}
            removeBill={removeBill}/>
            </div>
            <div className="w-1/2">
             
            </div>
          </div>
          
        </div>
      )}
    </div>
  )
}

export default App