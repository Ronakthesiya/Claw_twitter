import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import twitterimg from '../../assets/logo.webp'
import axios from "axios";
import Swal from 'sweetalert2';
import { CircularProgress } from '@mui/material';

const SignupPage = () => {
    const [loading, setloading] = useState(true);
    const [lodingButton, setlodingButton] = useState(false);
    let navigate = useNavigate();
    const [user , setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3003/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const res = await response.json();
                setUser(res);
                setloading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();        
    }, [])
    
    const [data , setData] = useState({
        userShortName :"" ,
        userName : "" ,
        userEmail : "",
        loginPassword : "" 
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setlodingButton(true);
        var f=1;
        
        user.forEach((abc)=>{
            if(abc.userEmail===data.userEmail){
                Swal.fire({ title: 'Email already exist' })
                f=0;
                setlodingButton(false);
                return;
            }
        })

        if(f==0) return;
        
        var res = axios.post('http://localhost:3003/',data);
        navigate('/login')
        setlodingButton(false);
    };

    return (
        <>
        {!loading ? (
        <div style={{height : 'auto' , overflowX:'hidden'}}>
            <div className="login-container">
                <div className="image-container">
                    <img className="image" src={twitterimg} alt="twitterImage" />
                </div>

                <div className="form-container">
                    <div className="">
                        <h2 className="heading text-light">Happening now</h2>

                        <div className="d-flex align-items-sm-center">
                            <h3 className="heading1 text-light"> Join X today </h3>
                        </div>

                        <form onSubmit={handleSubmit}>

                            <input className="display-name" style={{ backgroudColor: "red" }}
                                type="userShortName"
                                placeholder="username "
                               onChange={(e)=>setData({...data , userShortName : e.target.value})}
                               required
                            />

                            <input className="display-name" style={{ backgroudColor: "red" }}
                                type="userName"
                                placeholder="Enter Full Name"
                                onChange={(e) => setData({...data , userName : e.target.value})}
                                required
                            />

                            <input className="email"
                                type="email"
                                placeholder="Email address"
                                onChange={(e) => setData({...data , userEmail : e.target.value})}
                                required
                            />

                            <input className="password"
                                type="loginPassword"
                                placeholder="Password"
                                onChange={(e) => setData({...data , loginPassword : e.target.value})}
                                required
                            />

                            

                            {!lodingButton ? (
                                <div className="btn-login">
                                    <button type="submit" className="btn">Sign Up</button>
                                </div>
                            ) : (
                                <div className='me-5 pe-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , height: '10vh',textAlign: 'center', marginRight: '50px'}}>
                                    <CircularProgress style={{ height: '30px', width: '30px', strokeWidth: '50px', color: 'white' }} />
                                </div>
                            )}
                        </form>
                        <hr />
                        <div>
                            <span className="text-light">Already have an account?</span>
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: 'none',
                                    color: 'var(--twitter-color)',
                                    fontWeight: '600',
                                    marginLeft: '5px'
                                }}
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        ):(
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                <CircularProgress style={{ height: '60px', width: '60px', strokeWidth: '50px', color: 'black' }} />
            </div>
        )}
        </>
    );
};

export default SignupPage;