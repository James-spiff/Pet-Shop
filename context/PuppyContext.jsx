import React, { useState, useContext } from 'react';
import axios from 'axios';

const url = 'http://localhost:3000/api/pups';

export const PuppyContext = React.createContext([]);

export const PuppyProvider = ({ children }) => {
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

    useEffect(() => {
    getPups();
    }, []);

    console.log(pups)

  return (
    <PuppyContext.Provider value={pups}>
        {children}
    </PuppyContext.Provider>
  )
}