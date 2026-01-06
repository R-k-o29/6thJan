import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const[libraryData,setLibraryData] = useState({
    bCode:"",
    bName:"",
    bAuthor:"",
    bPrice:""
  });

  let saveBook = (e)=>{
    e.preventDefault();

    axios.post(`http://localhost:3005/api/website/library/insert`,libraryData).then(()=>{
      alert('Book Saved in the library');
    })

  }

  let getValue = (e)=>{
      let inputName = e.target.name;
      let inputValue = e.target.value;
      
      let oldData = {...libraryData};

      oldData[inputName]=inputValue;
      setLibraryData(oldData);
  }



  return (
    <>
      <h1 className='text-center text-primary'>Library Management System</h1>
      <div className="container d-flex p-2">
        <div className="formDiv col-4 p-2 m-2 bg-light rounded shadow">
          <form onSubmit={saveBook}>
            <h2>Enter Book Details</h2>
            <label className='form-label' name='bCode'>Book Code :</label>
            <input type="text" placeholder='Enter book code' className='form-control' name='bCode' value={libraryData.bCode} onChange={getValue}/>
            <label className='form-label' name='bName'>Book:</label>
            <input type="text" placeholder='Enter book name' className='form-control' name='bName' value={libraryData.bName} onChange={getValue}/>
            <label className='form-label' name='bAuthor'>Author:</label>
            <input type="text" placeholder='Enter author name' className='form-control' name='bAuthor' value={libraryData.bAuthor} onChange={getValue}/>
            <label className='form-label' name='bPrice'>Price :</label>
            <input type="number" placeholder='Enter book price' className='form-control' name='bPrice' value={libraryData.bPrice} onChange={getValue}/>
            <button type="submit" className='form-control bg-success mt-2'>Add Book</button>
          </form>
        </div>
        <div className="tableDiv col-8 p-2 m-2 bg-light rounded shadow">
          <table className='table table-bordered shadow'>
            <thead className='table-light'>
              <tr>
                <td>SR.NO</td>
                <td>Book Code</td>
                <td>Book Name</td>
                <td>Author</td>
                <td>Price</td>
                <td>Delete</td>
                <td>Edit</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>001</td>
                <td>Hello World</td>
                <td>Rohit</td>
                <td>100</td>
                <td><button className='btn btn-danger'>Delete</button></td>
                <td><button className='btn btn-warning'>Edit</button></td>
              </tr>

            </tbody>
          </table>

        </div>
      </div>
    </>
  )
}

export default App
