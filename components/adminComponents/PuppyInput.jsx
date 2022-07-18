import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

const url = 'http://localhost:5000/pups';
const baseUrl = 'http://localhost:3000/api';

const PuppyInput = () => {

    const [pups, setPups] = useState({});
    // const [formInput, setFormInput] = useState({});
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [pupImage, setPupImage] = useState(null);
    const [breed, setBreed] = useState('');
    const [sex, setSex] = useState(false);
    const [status, setStatus] = useState(false);
    const [age, setAge] = useState('');
    const [price, setPrice] = useState(0);
    const [imageInput, setImageInput] = useState(null);
    
    // const getFileUrl = (file) => {
    //     return new Promise(function (resolve, reject) {
    //         const reader = new FileReader();
    //         reader.onload = function () { resolve(reader.result); }
    //         reader.onerror = reject;
    //         reader.readAsArrayBuffer(file);
    //     });
    // }

    const handleImage = (e) => {
        const file = e.target.files[0];

        setImageInput(file);
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
            //console.log(e.target.result);
            setPupImage(e.target.result);
        }
        fileReader.readAsDataURL(file);
    }


    const onSubmit = async (e) => {
        e.preventDefault()
        console.log('click')

        const form = new FormData();
        form.append('name', name);
        form.append('description', description);
        form.append('pup_image', imageInput);
        form.append('breed', breed);
        form.append('sex', sex);
        form.append('pup_status', status);
        form.append('age', age);
        form.append('price', price);
        try {
            console.log(imageInput);
            //const response = await axios({method: 'POST', url: url, data: body});
            const response = await axios.post(`${baseUrl}/pups`, form);

            console.log(response.data);
            setPups(form);
            window.location.reload(false);
        } catch (error) {
            console.error(error.message);
        }
    }
    
  return (
    <>  
        <div className='py-6 px-6 lg:px-8 flex justify-center'>
            <form className='space-y-3' method="POST" action="/pups" encType="multipart/form-data">
                <div className='row'>
                    <div className='col'>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Name</label>
                        <input 
                            type='text' 
                            className='form-control rounded border border-black p-2'
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-black">Description</label>
                        <textarea 
                            type='text' 
                            className='form-control rounded border border-black p-2'
                            onChange={e => setDescription(e.target.value)}
                        />
                </div>

                <div>
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-black">Image</label>
                        <input 
                            type='file' 
                            name='pup_image'
                            className='form-control'
                            onChange={handleImage}
                        />
                </div>

                <div>
                    <label htmlFor="breed" className="block mb-2 text-sm font-medium text-black">Breed</label>
                        <input 
                            type='text' 
                            className='form-control rounded border border-black p-2'
                            onChange={e => setBreed(e.target.value)}
                        />
                </div>

                <div className='py-3'>
                    <label htmlFor="sex" className="block mb-2 text-sm font-medium text-black">Sex</label>
                        <div className='flex'>
                            <div className='flex-row px-4'>
                                <label className='px-1'>Male</label>
                                <input 
                                    type='radio' 
                                    name='sex'
                                    id='Male'
                                    className='form-control rounded-lg'
                                    onChange={e => setSex(true)}
                                />
                            </div>
                            <div className='flex-row'>
                                <label className='px-1'>Female</label>
                                <input 
                                    type='radio' 
                                    name='sex'
                                    id='Female'
                                    className='form-control rounded-lg'
                                    onChange={e => setSex(false)}
                                />
                            </div>
                        </div>
                </div>

                <div className='py-3'>
                    <label htmlFor="pup_status" className="block mb-2 text-sm font-medium text-black">Status</label>
                        <div className='flex'>
                            <div className='flex-row px-4'>
                                <label className='px-1'>Available</label>
                                <input 
                                    type='radio' 
                                    name="status"
                                    id='Available'
                                    className='form-control rounded-lg'
                                    onChange={e => setStatus(true)}
                                />
                            </div>
                            <div className='flex-row'>
                                <label className='px-1'>Unavailable</label>
                                <input 
                                    type='radio' 
                                    name="status"
                                    id='Unavailable'
                                    className='form-control rounded-lg'
                                    onChange={e => setStatus(false)}
                                />
                            </div>
                        </div>
                </div>

                <div>
                    <label htmlFor="age" className="block mb-2 text-sm font-medium text-black">Age</label>
                        <input 
                            type='text' 
                            className='form-control rounded border border-black p-2'
                            onChange={e => setAge(e.target.value)}
                        />
                </div>

                <div>
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-black">Price</label>
                        <input 
                            type='number' 
                            className='form-control rounded border border-black p-2'
                            onChange={e => setPrice(e.target.value)}
                        />
                </div>

                <div className='text-center mr-12'>
                    <button type='button' className='bg-sky-500 text-white rounded-lg m-3 p-2 px-12 mr-10' onClick={onSubmit}>Add Item</button>
                </div>

            </form>
        </div>
    </>
  )
}

export default PuppyInput