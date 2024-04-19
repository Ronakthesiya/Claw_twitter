import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './LoginPage.css'
import twitterimg from '../../assets/logo.webp'
import Swal from 'sweetalert2'
import { CircularProgress } from '@mui/material';

const LoginPage = () => {
    const [loading, setloading] = useState(true);
    const [lodingButton, setlodingButton] = useState(false);
    const navigate = useNavigate();
    const [data , setData] = useState({email : "", password : ""});
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

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setlodingButton(true);
        var f=1
        
        user.forEach((abc)=>{
            if(abc.userEmail === data.email && abc.loginPassword === data.password){
                localStorage.setItem('id',abc._id)
                navigate("/Home")
                f=0
            }
        })

        if(f==0){
            setlodingButton(false);
            return;
        }

        Swal.fire({ title: 'Wrong Email or Password' })
        setlodingButton(false);
    };

    return (
        <>
        {!loading ? (
            <div className="login-container">
                <div className="image-container">
                    <img className="image" src={twitterimg} alt="twitterImage" />
                </div>

                <div className="form-container ">
                    <div className="form-box" >
                        <h1 className="heading text-white pb-4">Happening now</h1>

                        <form onSubmit={handleSubmit}>

                            <input
                                type="email" className="email"
                                placeholder="Email address"
                                onChange={(e) => setData({...data , email : e.target.value})}
                                required
                            />

                            <input className="password"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setData({...data , password : e.target.value})}
                                required
                            />

                            
                            {!lodingButton ? (
                                <div className="btn-login">
                                    <button type="submit" className="btn" >Log In</button>
                                </div>
                            ) : (
                                <div className='me-5 pe-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , height: '10vh',textAlign: 'center', marginRight: '50px'}}>
                                    <CircularProgress style={{ height: '30px', width: '30px', strokeWidth: '50px', color: 'white' }} />
                                </div>
                            )}
                                    
                        </form>
                        <hr />
                    </div>
                    <div>
                        <spna className="text-light">Don't have an account?</spna>
                        <Link
                            to="/signup"
                            style={{
                                textDecoration: 'none',
                                color: 'var(--twitter-color)',
                                fontWeight: '600',
                                marginLeft: '5px'
                            }}
                        >
                            Sign up
                        </Link>
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

export default LoginPage;
