import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { api } from "../../GlobalKey/GlobalKey";
import jsPDF from 'jspdf';

import PageHeader from "../../layout/layoutsection/pageHeader/pageHeader";





const GSTUserList = () =>
{
    const [ users, setUsers ] = useState( [] );

    let navigate = useNavigate()
    const [ myToken, setMyToken ] = useState( '' )
    const [ myCompanyId, setMyCompanyId ] = useState( '' )

    useEffect( () =>
    {
        let getToken = localStorage.getItem( 'token' )
        let getCompanyId = localStorage.getItem( 'companyId' )

        if ( !getToken )
        {
            navigate( '/' )
        }
        setMyToken( getToken );
        setMyCompanyId( getCompanyId );



        axios
            .post( api + `/admin/gst/all-users`,
                {
                    companyId: getCompanyId,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + getToken
                    }
                }
            )
            .then( response =>
            {
                console.log( response );
                if ( response.data.status == 1 )
                {
                    const myData = response.data.data;

                    setUsers( myData );

                } else
                {
                    alert( response.data.message );
                }

            } )
            .catch( error =>
            {
                alert( error );
                console.log( error );
                if ( error.response.status == 403 || error.response.status == 401 )
                {
                    // Log out process and go to home page
                    localStorage.setItem( "token", null );
                    localStorage.removeItem( 'token' );
                    localStorage.clear();
                    navigate( '/' )
                } else
                {
                    alert( error )
                }
            } );



    }, [] );

    const handleAddButtonClick = () =>
    {
        navigate( "/new-kyc" );
    };

    const handleEdit = ( userId ) =>
    {
        navigate( '/update-kyc/' + userId );
    };

    const handleGoToServiceList = ( userId ) =>
    {
        navigate( '/gst/user/' + userId + '/gst-reg-form' );
    };

    const handleInactive = () =>
    {
        // setActive( false );
        // setInactive( true );
    };

    const toDataUrl = ( url, callback ) =>
    {
        const xhr = new XMLHttpRequest();
        xhr.onload = () =>
        {
            const reader = new FileReader();
            reader.onloadend = () =>
            {
                callback( reader.result );
            };
            reader.readAsDataURL( xhr.response );
        };
        xhr.open( 'GET', url );
        xhr.responseType = 'blob';
        xhr.send();
    };


    const handleDownload = ( userId, name, phoneNumber ) =>
    {

        console.log( userId, name, phoneNumber );
        // var doc = new jsPDF( "p", "mm", "a4" );
        var doc = new jsPDF( 'l', "mm", [ 50, 30 ] );

        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();

        console.log( width, height );
        console.log( height );
        console.log( width );
        console.log( width, height );

        var imageurl = api + '/barcode/' + userId;
        console.log( imageurl );
        toDataUrl( imageurl, ( myBase64 ) =>
        {
            console.log( myBase64 ); // myBase64 is the base64 string
            doc.addImage( myBase64, 'PNG', 2.5, 12, 45, 15 );
            doc.setFontSize( 6 );
            doc.text( 2.5, 5, name );
            doc.setFontSize( 14 );
            doc.text( 2.5, 10, phoneNumber );
            doc.save( userId + '_' + phoneNumber + '_profile.pdf' );
        } );

    };


    return (

        <div>
            <PageHeader currentpage="User Data" activepage="Home" mainpage="User Data" />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box xl:overflow-auto">
                        <div className="box-header">
                            <h5 className="box-title">User Data List</h5>
                        </div>
                        <div className="box-body">
                            {/* <button
                                onClick={ handleAddButtonClick }
                                style={ {
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    marginBottom: '20px'
                                } }
                            >
                                Add New KYC
                            </button> */}
                            <div className="overflow-auto table-bordered">
                                <div className='app-container'>
                                    <table
                                        id='user-datatable'
                                        className='ti-custom-table ti-striped-table ti-custom-table-hover'
                                    >
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone Number</th>
                                                <th>WhatsApp Number</th>
                                                {/* <th>Address</th>
                                                <th>Pin Code</th>
                                                <th>City</th>
                                                <th>State</th>
                                                <th>PAN Number</th>
                                                <th>Aadhaar Number</th>
                                                <th>Father's Name</th>
                                                <th>Mother's Name</th>
                                                <th>Occupation</th> */}
                                                <th>Barcode</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { users.map( user => (
                                                <Fragment key={ user._id }>
                                                    <tr>
                                                        <td>{ user.userFullData ? user.userFullData.name : "" }</td>
                                                        <td>{ user.userFullData ? user.userFullData.email : "" }</td>
                                                        <td>{ user.userFullData ? user.userFullData.phoneNumber : "" }</td>
                                                        <td>{ user.userFullData ? user.userFullData.whatsappNumber : "" }</td>
                                                        {/* <td>{ user.address }</td>
                                                        <td>{ user.pinCode }</td>
                                                        <td>{ user.city }</td>
                                                        <td>{ user.state }</td>
                                                        <td>{ user.panNumber }</td>
                                                        <td>{ user.aadhaarNumber }</td>
                                                        <td>{ user.fatherName }</td>
                                                        <td>{ user.motherName }</td>
                                                        <td>{ user.occupation }</td> */}
                                                        <td><img
                                                            src={ api + '/barcode/' + user.userId }
                                                            alt="Description of the image"
                                                            style={ { width: '250px', height: '40px' } }
                                                        />
                                                            { user.barcode }
                                                        </td>
                                                        <td>
                                                            <button onClick={ () => handleEdit( user.userFullData.userId ) } style={ {
                                                                backgroundColor: '#007bff',
                                                                color: 'white',
                                                                padding: '10px 20px',
                                                                borderRadius: '5px',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                marginRight: '10px'
                                                            } }>Edit</button>
                                                            <button
                                                                onClick={ () => handleGoToServiceList( user.userFullData.userId ) }
                                                                type="button"
                                                                className="ti-btn rounded-full ti-btn-warning">
                                                                Form for NEW
                                                            </button>

                                                            <button
                                                                onClick={ () => handleGoToServiceList( user.userFullData.userId ) }
                                                                type="button"
                                                                className="ti-btn rounded-full ti-btn-warning">
                                                                GST Data
                                                            </button>

                                                            <button
                                                                onClick={ () => handleGoToServiceList( user.userFullData.userId ) }
                                                                type="button"
                                                                className="ti-btn rounded-full ti-btn-warning">
                                                                GST Services
                                                            </button>

                                                            <button
                                                                onClick={ () => handleDownload( user.userFullData.userId, user.userFullData.name, user.userFullData.phoneNumber ) }
                                                                type="button"
                                                                className="ti-btn rounded-full ti-btn-warning">
                                                                download
                                                            </button>

                                                            {/* <button onClick={ handleInactive } style={ {
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        marginRight: '10px'
                                    } }>Deactivate</button> */}


                                                            {/* <button style={ {
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        border: 'none',
                                        cursor: 'pointer'
                                    } }>Download</button> */}


                                                        </td>
                                                    </tr>
                                                </Fragment>
                                            ) ) }
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



export default GSTUserList;
