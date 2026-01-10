import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [libraryData, setLibraryData] = useState({
    bCode: "",
    bName: "",
    bAuthor: "",
    bPrice: "",
    _id: "",
  });

  const [displayData, setDisplayData] = useState([]);

  let saveBook = (e) => {
    e.preventDefault();

    if (libraryData._id) {
      axios.put(`http://localhost:3005/api/website/library/update/${libraryData._id}`,libraryData).then(()=>{
        alert("Book updated successfully");
        getAllBooks();
      })
    } else {
      axios
        .post(`http://localhost:3005/api/website/library/insert`, libraryData)
        .then(() => {
          alert("Book Saved in the library");
          getAllBooks();
        });
    }
  };

  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    let oldData = { ...libraryData };

    oldData[inputName] = inputValue;
    setLibraryData(oldData);
  };

  let getAllBooks = () => {
    axios
      .get(`http://localhost:3005/api/website/library/view`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.status) {
          setDisplayData(data.viewObj);
        }
      });
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  let deleteBook = (id) => {
    axios
      .delete(`http://localhost:3005/api/website/library/delete/${id}`)
      .then(() => {
        alert("Deleted book from library");
        getAllBooks();
      });
  };

  let getOneBook = (id) => {
    axios
      .get(`http://localhost:3005/api/website/library/view/${id}`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.status) {
          setLibraryData(data.viewRes);
        }
      });
  };

  return (
    <>
      <h1 className="text-center text-primary">Library Management System</h1>
      <div className="container d-flex p-2">
        <div className="formDiv col-4 p-2 m-2 bg-light rounded shadow">
          <form onSubmit={saveBook}>
            <h2>Enter Book Details</h2>
            <label className="form-label" name="bCode">
              Book Code :
            </label>
            <input
              type="text"
              placeholder="Enter book code"
              className="form-control"
              name="bCode"
              value={libraryData.bCode}
              onChange={getValue}
            />
            <label className="form-label" name="bName">
              Book:
            </label>
            <input
              type="text"
              placeholder="Enter book name"
              className="form-control"
              name="bName"
              value={libraryData.bName}
              onChange={getValue}
            />
            <label className="form-label" name="bAuthor">
              Author:
            </label>
            <input
              type="text"
              placeholder="Enter author name"
              className="form-control"
              name="bAuthor"
              value={libraryData.bAuthor}
              onChange={getValue}
            />
            <label className="form-label" name="bPrice">
              Price :
            </label>
            <input
              type="number"
              placeholder="Enter book price"
              className="form-control"
              name="bPrice"
              value={libraryData.bPrice}
              onChange={getValue}
            />
            <button type="submit" className="form-control bg-success mt-2">
              {(libraryData._id)?"Update book":"Add book"}
            </button>
          </form>
        </div>
        <div className="tableDiv col-8 p-2 m-2 bg-light rounded shadow">
          <table className="table table-bordered shadow">
            <thead className="table-light">
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
            {displayData.map((item, index) => {
              return (
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.bCode}</td>
                    <td>{item.bName}</td>
                    <td>{item.bAuthor}</td>
                    <td>{item.bPrice}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteBook(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => getOneBook(item._id)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
