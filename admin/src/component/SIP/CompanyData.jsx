import React, { Fragment, useEffect, useState } from 'react'
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader'
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from 'axios';
import { api } from '../../GlobalKey/GlobalKey';



const CompanyData = () =>
{


    const [ companyData, setCompanyData ] = useState( [] );
    const navigate = useNavigate();

    useEffect( () =>
    {
        let getToken = localStorage.getItem( 'token' )
        let getCompanyId = localStorage.getItem( 'companyId' )
        if ( !getToken )
        {
            navigate( '/' )
        }

        axios.post( api + `/admin/sip/sip-company-data`,
            {
                companyId: getCompanyId,
            },
            {
                headers: {
                    Authorization: 'Bearer ' + getToken

                }
            }

        ).then( response =>
        {

            const myData = response.data.data;
            console.log( myData );
            setCompanyData( myData );


        } ).catch( error =>
        {

            alert( error );
            console.log( error );

            if ( error.response.status == 403 || error.response.status == 401 )
            {
                localStorage.setItem( "token", null );
                localStorage.removeItem( 'token' );
                localStorage.clear();
                navigate( '/' )
            } else
            {
                alert( error )
            }

        } );

    }, [] )

    const handleEdit = ( sipCompanyId ) =>
    {
        navigate( '/sip/company-data/' + sipCompanyId );
    }

    function AddNewCompanyData ()
    {

        console.log( 'Add New Company Name' );

        Swal.fire( {
            title: 'Submit new SIP company name',
            html: '<input id="swal-input1" class="swal2-input" placeholder="Company Name">',
            focusConfirm: false,
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Create',
            showLoaderOnConfirm: true,
            preConfirm: () =>
            {
                const sipCompanyName = Swal.getPopup().querySelector( '#swal-input1' ).value;
                console.log( sipCompanyName );
                if ( !sipCompanyName )
                {
                    Swal.showValidationMessage( 'Company Name is required' );
                    return false;
                }

                console.log( sipCompanyName );
                let getToken = localStorage.getItem( 'token' )
                let getCompanyId = localStorage.getItem( 'companyId' )

                return axios.post( api + `/admin/sip/sip-company-reg`,
                    {
                        sipCompanyName,
                        companyId: getCompanyId
                    }, {
                    headers: {
                        Authorization: 'Bearer ' + getToken
                    }
                } )
                    .then( response =>
                    {
                        if ( response.data.status == 1 )
                        {
                            return response.data;
                        } else
                        {
                            throw new Error( response.data.message )
                        }
                    } )
                    .catch( error =>
                    {
                        Swal.showValidationMessage(
                            `Request failed: ${ error }`
                        )
                    } );
            },
            allowOutsideClick: () => !Swal.isLoading()

        } ).then( ( result ) =>
        {
            console.log( result );
            if ( result.isConfirmed )
            {
                Swal.fire( {
                    title: `New company added!`,
                } );
            }
        } );
    }

    return (
        <div>
            <PageHeader currentpage="User Data" activepage="Home" mainpage="User Data" />


            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">

                    <div className="box xl:overflow-auto">
                        <div className="box-header">
                            <h5 className="box-title">Company Data List</h5>
                        </div>
                        <div className="box-body">
                            <button
                                onClick={ () => AddNewCompanyData() }
                                type="button"
                                className="ti-btn ti-btn-info w-full max-w-[9.375rem]"
                            >
                                Add New
                            </button>

                            <div className='py-1'></div>

                            <div className="overflow-auto table-bordered">

                                <div className='app-container'>
                                    <table
                                        id='user-datatable'
                                        className='ti-custom-table ti-striped-table ti-custom-table-hover'
                                    >
                                        <thead>
                                            <tr>
                                                <th>Company Name</th>
                                                <th>Total Product</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { companyData.map( company => (
                                                <Fragment key={ company.sipCompanyId }>
                                                    <tr>
                                                        <td>{ company.sipCompanyName }</td>
                                                        <td>{ company.productList.length }</td>


                                                        <td>
                                                            <button
                                                                onClick={ () => handleEdit( company.sipCompanyId ) }
                                                                style={ {
                                                                    backgroundColor: '#007bff',
                                                                    color: 'white',
                                                                    padding: '10px 20px',
                                                                    borderRadius: '5px',
                                                                    border: 'none',
                                                                    cursor: 'pointer',
                                                                    marginRight: '10px'
                                                                } }>Edit</button>

                                                            <button
                                                                // onClick={() => handleGoToServiceList(user.userFullData.userId)}
                                                                type="button"
                                                                className="ti-btn rounded-full ti-btn-warning">
                                                                Deactive
                                                            </button>


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
    )
}

export default CompanyData