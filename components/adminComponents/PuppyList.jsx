import { useState, useEffect, useContext } from 'react';
import React from 'react';
import Table from '../Table';
import axios from 'axios';
import Link from 'next/link';
import { deletePost } from '../../utils/requests';


const url = 'http://localhost:3000/api/pups';


const PuppyList = () => {
    const [pups, setPups] = useState([]);

    const getPups = async () => {
      try {
        const res = await axios.get(url);
        //const resJson = res.json();
  
        setPups(res.data);
        console.log(pups);
      } catch (error) {
        console.error(error.message)
      }
    }

    // const deleteHandler = (id) => {
    //   deletePost(id);
    // }
  
    useEffect(() => {
      getPups();
    }, []);

    //const { pups, setPups } = useContext(PuppyContext);

    //const columns = ['ID', 'NAME', 'BREED', 'STATUS', 'PRICE']
    const columns = React.useMemo(() => [
      {
        Header: "ID",
        accessor: 'pup_id',
      },
      {
        Header: "Name",
        accessor: 'name',
        imgAccessor: "imgUrl",
        emailAccessor: "email",
      },
      {
        Header: "Breed",
        accessor: 'breed',
      },
      {
        Header: "Status",
        accessor: 'pup_status',
        Cell: data => (data.value === true ? "Available" : "Unavailable" )
      },
      {
        Header: "Price",
        accessor: 'price',
      },
      {
        Header: "Actions",
        Cell: data => {
          return (
            <div>
              {/* <Link to={`view/${data.row.original.id}`}>View</Link> */}
              {/* <Link href='/'>Edit</Link> */}
              
              <button 
                type="button" 
                className='bg-red-500 rounded-lg m-3 p-2 text-white'
                onClick={() => deletePost(data.row.original.pup_id)}
              >
                Delete
              </button>

              <Link href={`/create/${data.row.original.pup_id}`}>
                <button 
                    type="button" 
                    className="bg-sky-500 rounded-lg m-3 p-2 px-4 text-white"
                >
                    Edit
                </button>
              </Link>
            </div>
          );
        }
      },
    ], [])
    const data = []
    Object.values(pups).map(pup => {
      // const result = {}
      // const new_status = ''
      if (pup.pup_id && pup.name && pup.breed && pup.pup_status && pup.price) {
        if (pup.pup_status === true) {
          console.log('Available')
        } else if (pup.pup_status === false) {
          console.log('Unavailable')
        }
        //result = Object.assign({"pup_id": pup.pup_id, "name": pup.name, "breed": pup.breed, "pup_status": new_status, "price": pup.price})
      }
      data.push(pup);
    })
    console.log(data)

  return (
    <>
        {/* <div className='items-center'>

            <div className='flex justify-center'>
            <table className="border-collapse border w-[1050px] border-slate-500 table-fixed">
                <thead>
                    <tr>
                    <th className='border border-slate-600'>ID</th>
                    <th className='border border-slate-600'>NAME</th>
                    <th className='border border-slate-600'>BREED</th>
                    <th className='border border-slate-600'>STATUS</th>
                    <th className='border border-slate-600'>PRICE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className='border border-slate-700'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                    <td className='border border-slate-700'>Malcolm Lockyer</td>
                    <td className='border border-slate-700'>1961</td>
                    </tr>
                    <tr>
                    <td className='border border-slate-700'>Witchy Woman</td>
                    <td className='border border-slate-700'>The Eagles</td>
                    <td className='border border-slate-700'>1972</td>
                    </tr>
                    <tr>
                    <td className='border border-slate-700'>Shining Star</td>
                    <td className='border border-slate-700'>Earth, Wind, and Fire</td>
                    <td className='border border-slate-700'>1975</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div> */}
        
        <Table columns={columns} data={data} />
    </>
  )
}

export default PuppyList