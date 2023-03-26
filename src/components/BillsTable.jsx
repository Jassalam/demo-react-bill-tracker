function BillsTable(props) {

   const triggerShowBill = ()=>{
    props.showAddBill()
   }

    const removeBill = index =>{
        props.removeBill(index)
    }

    return (
      <table className='table w-full'>
        <thead>
          <tr className='text-left'>
            <th scope='col'>Date</th>
            <th scope='col'>Amount</th>
            <th scope='col'>Category</th>
            <th scope='col' />
          </tr>
        </thead>
        <tbody>
          {props.bills?.map((value, index) => {
            return (
              <tr className='p4 even:bg-gray-100 odd:bg-white' key={index}>
                <td>{new Date(value.date).toLocaleDateString()}</td>
                <td>${value.amount}</td>
                <td>{value.category}</td>
                <td>
                    <button onClick={()=> removeBill(index)}>X</button>
                </td>
              </tr>
            )
          })}
          <tr>
            <td colSpan='4' className="text-center pt-5">
                <button className="underline" onClick={triggerShowBill}>
                    Add New
                </button>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
  
  export default BillsTable