import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const defaultDataOfUser = {
    name: "",
    username: "",
    password: "",
    confirmpassword: "",
    zipcode: "",
    ProfileImage: null

}


const Home = () => {

    const url = "http://localhost:5000/api/file/upload";
    const userUrl = "http://localhost:5000/api/users/signUp";
    const [Errors, setErrors] = useState([]);
    const [userInfo, setUserInfo] = useState([defaultDataOfUser]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [success, setSuccess] = useState(false);


    const validateFields = () => {
        let hasErros = false;
        let Errors = [];
        if (userInfo.password.length < 8) {

            alert("Passwords must be greater than 8 digits!!!");
            hasErros = true
            Errors.push("Passwords must be greater than 8 digits!!!")
        }
        if (userInfo.password !== userInfo.confirmPassword) {
            hasErros = true
            alert("Passwords are not matching!!!");
            Errors.push("Passwords do not Match")
        }
        if (userInfo.zipCode.length > 6) {
            hasErros = true
            alert("Zipcode must be less than or equal to 6 digits");
            Errors.push("ZipCode length should be less than 7")
        }

        setErrors(Errors)
        return hasErros
    }
    const onFieldChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        const newuserInfo = { ...userInfo, [name]: value };
        setUserInfo(newuserInfo);
        console.log(userInfo);
    }
    const onSubmitUserInfoHandler = (event) => {
        event.preventDefault();
    
        if (!validateFields()) {
            console.log("inside submit");
            axios.post(userUrl, userInfo, {
                onUploadProgress: progressEvent => console.log("uploaded progress: " + (progressEvent.loaded / progressEvent.total * 100) + "%")
            }).then(res => {
                setSuccess(true)
                console.log("Submited Successfully");
                setErrors([]);
                setSelectedFile(null);
                setUserInfo(defaultDataOfUser);
            });
        }
    }
    const onImageChangeHandler = (event) => {
        console.log(event.target.files[0])
        let img = event.target.files[0];
        setSelectedFile(URL.createObjectURL(img));
        const fd = new FormData();
        fd.append('productImage', event.target.files[0], event.target.files[0].name);
        console.log("hi  ");
        axios.post(url, fd, {
            onUploadProgress: progressEvent => console.log("uploaded progress: " + (progressEvent.loaded / progressEvent.total * 100) + "%")
        }).then(res => {
            console.log(res.data._id);
        });

    }
    if (success) {
        return (
            <div>
                <div>Registered Successfully</div>
                
            </div>
        )
    }else{
        console.log("something went wrong please check and try again")
     
    }
    return (
        <div className="grid grid-col place-items-center h-full items-stretch w-screen bg-yellow-100 " >
            <h2 className="text-4xl align-items-center text-blue-900 underline">User Registration Form</h2>
            <div className="mt-10 " >
                <div className="mt-10 justify-center">
                    <img className="p-4"  height="160px" width="160px" border-2 border-blue-200 src={selectedFile} alt="" style={{ margin: "auto" }} />
                    <input type="file" name="profileImage" onChange={onImageChangeHandler} />
                    <form onSubmit={onSubmitUserInfoHandler}>
                    <div className=" mt-1">
                            <p>Name :</p>
                            <input
                                 className="border-2 border-blue-200"
                                type="text"
                                value={userInfo.Name}
                                onChange={onFieldChangeHandler}
                                size="34"
                                name="Name"
                                font-size="24px"
                                font-family="sans-serif"
                                border-2
                                border-red-500
                            />
                        </div><br />
                    <div className="">
                            <p>Username :</p>
                            <input
                                 className="border-2 border-blue-200"
                                type="text"
                                size="34"
                                name="userName"
                                border="border-red-200"
                                value={userInfo.userName}
                                onChange={onFieldChangeHandler}
                              
                               
                               
                            />
                        </div><br />
                        <div >
                            <p>Email :</p>
                            <input
                                 className="border-2 border-blue-200"
                                type="email"
                                size="34"
                                name="email"
                                value={userInfo.Email}
                                onChange={onFieldChangeHandler}
                            />
                        </div><br />
                        <div>

                            <p>Password :</p>
                            <input
                                 className="border-2 border-blue-200"
                                type="password"
                                size="34"
                                name="password"
                                value={userInfo.password}
                                onChange={onFieldChangeHandler}
                            />
                        </div><br />
                        <div>
                            <p>Confirm Password :</p>
                            <input
                                 className="border-2 border-blue-200"
                                type="password"
                                size="34"
                                name="confirmPassword"
                                
                                value={userInfo.confirmPassword}
                                onChange={onFieldChangeHandler}
                            />
                        </div>
                        <br />
                        <div>
                            <p>Zipcode :</p>
                            <input
                                className="border-2 border-blue-200"
                                type="Number"
                                size="34"
                                name="zipCode"
                             
                                value={userInfo.zipCode}
                                onChange={onFieldChangeHandler}
                            />
                        </div><br />

                      
                        <button className="shadow-xl px-5 py-1 border-2 border-blue-200 hover:bg-blue-500" variant="outlined" type="submit"  >Submit</button>

                    </form>

                </div>
            </div>
        </div>

    )
}
export default Home;
