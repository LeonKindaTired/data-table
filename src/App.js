import './App.css';
import fakeData from "./MOCK_DATA.json";
import * as React from "react";
import { useTable } from "react-table";

function App() {
  const data = React.useMemo(() => {
    console.log(fakeData);  // Add this line to log the data
    return fakeData;
  }, []);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [dataPerPage, setDataPerPage] = React.useState(20);

  const lastPostIndex = currentPage * dataPerPage;
  const firstPostIndex = lastPostIndex - dataPerPage;
  const currentData = data.slice(firstPostIndex, lastPostIndex);

  const pageCount = Math.ceil(data.length / dataPerPage);

  const changePage = page => setCurrentPage(page);

  const columns = React.useMemo(() => [
    {
      Header: "ID",
      accessor: "id",
      className: "col-id", // Add class for specific column
    },
    {
      Header: "First Name",
      accessor: "first_name",
      className: "col-first-name", // Add class for specific column
    },
    {
      Header: "Last Name",
      accessor: "last_name",
      className: "col-last-name", // Add class for specific column
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "University",
      accessor: "university",
    }
  ], []);  

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: currentData });

  return (
    <div className="App">
      <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={() => changePage(1)} disabled={currentPage === 1}>&lt;&lt;</button>
        <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
        <span>Page {currentPage} of {pageCount}</span>
        <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === pageCount}>&gt;</button>
        <button onClick={() => changePage(pageCount)} disabled={currentPage === pageCount}>&gt;&gt;</button>
      </div>
    </div>
  );
}

export default App;