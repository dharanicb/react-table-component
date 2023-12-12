import { useSelector } from 'react-redux';
import './App.css';
import Table from './Components/DataTable/TableData';


function App() {

  // const tableData = useSelector((state) => state.expenses.tableData);
  // console.log(tableData ,"dharani edi neede");

  return (
    <div className='flex justify-center items-center'>
      <Table />
    </div>
  );
}

export default App;
