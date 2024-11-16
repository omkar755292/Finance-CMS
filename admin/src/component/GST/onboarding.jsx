import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { api } from "../../GlobalKey/GlobalKey";
import moment from 'moment'

import PageHeader from "../../layout/layoutsection/pageHeader/pageHeader";


const GstOnboarding = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");



    let navigate = useNavigate()
    const [myToken, setMyToken] = useState('');
    const [myCompanyId, setMyCompanyId] = useState('');

    useEffect(() => {
        let getToken = localStorage.getItem('token')
        let getCompanyId = localStorage.getItem('companyId')

        if (!getToken) {
            navigate('/')
        }
        setMyToken(getToken);
        setMyCompanyId(getCompanyId);



        axios
            .post(api + `/admin/user-list/all-data`,
                {
                    companyId: getCompanyId,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + getToken

                    }
                }
            )
            .then(response => {
                console.log(response);
                if (response.data.status == 1) {
                    const myData = response.data.data;
                    setUsers(myData);

                    if (searchQuery == "") {
                        setFilteredUsers(myData);
                    } else {
                        setFilteredUsers(myData.filter(user =>
                            user.phoneNumber.includes(searchQuery)
                        ));
                    }

                } else {
                    alert(response.data.message);
                }

            })
            .catch(error => {
                alert(error);
                console.log(error);
                if (error.response.status == 403 || error.response.status == 401) {
                    // Log out process and go to home page
                    localStorage.setItem("token", null);
                    localStorage.removeItem('token');
                    localStorage.clear();
                    navigate('/')
                } else {
                    alert(error)
                }
            });



    }, []);


    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = () => {
        console.log(searchQuery);

        // event.preventDefault();
        // Implement search functionality here
        if (searchQuery == "") {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(users.filter(user =>
                user.phoneNumber.includes(searchQuery)
            ));
        }
    }







    const handleAdd = (user) => {
        navigate(`/gst/on-boarding/add/` + user.userId);
    };



    const handleInactive = (user) => {
        console.log('Deactivate user:', user.name);
    };

    const handleView = (user) => {
        console.log('View user:', user.name);
    };



    return (


        <div>
            <PageHeader currentpage="User Data" activepage="Home" mainpage="User Data" />
            <div className="search-bar-container">
                <div >
                    <input
                        type="text"
                        placeholder="Search by phone number"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                        style={{ marginRight: '5px', marginBottom: '15px' }}
                    />

                    <button
                        onClick={(e) => handleSearchSubmit()}
                        className="ti-btn rounded-full ti-btn-success">
                        Search
                    </button>
                </div>

                <button type="button"
                    className="ti-btn rounded-full ti-btn-warning">
                    Go to new user for KYC
                </button>
            </div>
            <div style={{ height: '20px' }}></div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box xl:overflow-auto">
                        <div className="box-header">
                            <h5 className="box-title">User Data List</h5>
                        </div>
                        <div className="box-body">
                            <div className="overflow-auto table-bordered">
                                <div className='app-container'>
                                    <table
                                        id='user-datatable'
                                        className='ti-custom-table ti-striped-table ti-custom-table-hover'
                                    >
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Registration Date</th>
                                                <th>Mobile Number</th>
                                                <th>Email ID</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredUsers.map(user => (
                                                <Fragment key={user._id}>
                                                    <tr>
                                                        <td>{user.name}</td>
                                                        <td> {moment(new Date(parseInt(user.createDate))).format("YYYY-MM-DD HH:mm:ss")}</td>
                                                        <td>{user.phoneNumber}</td>
                                                        <td>{user.email}</td>
                                                        <td>
                                                            <button onClick={() => handleAdd(user)} style={{
                                                                backgroundColor: '#007bff',
                                                                color: 'white',
                                                                padding: '10px 20px',
                                                                borderRadius: '5px',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                marginRight: '10px'
                                                            }}>Add</button>
                                                            <button onClick={() => handleInactive(user)} style={{
                                                                backgroundColor: '#007bff',
                                                                color: 'white',
                                                                padding: '10px 20px',
                                                                borderRadius: '5px',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                marginRight: '10px'
                                                            }}>Deactivate</button>
                                                            <button onClick={() => handleView(user)} style={{
                                                                backgroundColor: '#007bff',
                                                                color: 'white',
                                                                padding: '10px 20px',
                                                                borderRadius: '5px',
                                                                border: 'none',
                                                                cursor: 'pointer'
                                                            }}>View</button>
                                                        </td>
                                                    </tr>
                                                </Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default GstOnboarding;
