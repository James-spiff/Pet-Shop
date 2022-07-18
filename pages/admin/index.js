import { useState, useEffect } from 'react';
import axios from 'axios';
import PuppyList from '../../components/adminComponents/PuppyList';
import PuppyInput from '../../components/adminComponents/PuppyInput';
import useAuth from '../../hooks/useAuth';
import AuthContext from '../../context/AuthProvider';
import Link from 'next/link';

// const DynamicComponentWithNoSSR = dynamic(
//   () => import('../components/adminComponents/PuppyInput'),
//   { ssr: false }
// ) //renders the Main component without server side rendering in order to use the window object


const admin = () => {

    // const [pups, setPups] = useState([]);

    // const getPups = async () => {
    //   try {
    //     const res = await axios.get(url);
    //     //const resJson = res.json();
  
    //     setPups(res.data);
    //     console.log(pups);
    //   } catch (error) {
    //     console.error(error.message)
    //   }
    // }
    // const [ auth, setAuth ] = useContext(AuthContext);
    // console.log(auth)
      const userRole = window.localStorage.getItem('AUTH_ROLE');
      console.log(userRole)

    if (userRole.includes("USER")) {
      return (
        <>
            <PuppyInput />
            {/* <DynamicComponentWithNoSSR /> */}
            <PuppyList />
        </>
      )
    } else {
  return (
    <>
        <h1>Unathorized</h1>
    </>
  )
    }
}

export default admin