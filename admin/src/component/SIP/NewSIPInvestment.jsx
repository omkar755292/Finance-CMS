import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader';
import Select from 'react-dropdown-select';
import axios from 'axios';
import { api } from '../../GlobalKey/GlobalKey';
import Swal from 'sweetalert2';
import { da } from 'date-fns/locale';

const NewSIPInvestment = () =>
{
    const { userId } = useParams();
    const [ companyData, setCompanyData ] = useState( [] );
    const [ selectedCompanyData, setSelectedCompanyData ] = useState( '' );
    const [ selectedCompanyName, setSelectedCompanyName ] = useState( '' );
    // const [ productData, setProductData ] = useState( [] );
    const navigate = useNavigate();
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


        axios.post( api + `/admin/sip/sip-company-data`,
            {
                companyId: getCompanyId,
            },
            {
                headers: {
                    Authorization: 'Bearer ' + getToken
                }
            } )
            .then( ( response ) =>
            {

                if ( response.data.status === 1 )
                {
                    const myData = response.data.data;
                    setCompanyData( myData );
                } else
                {
                    alert( response.data.message );
                }

            } ).catch( error =>
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

    }, [] )

    const CompanySelect = companyData.map( company => ( {
        value: company.sipCompanyId,
        label: company.sipCompanyName
    } ) );

    const handleSelectedCompanyData = () =>
    {
        var myData = companyData.find( company => company.sipCompanyId === selectedCompanyName );
        console.log( companyData )
        console.log( selectedCompanyName )
        console.log( myData )
        // console.log( myData )

        setSelectedCompanyData( myData );
    };


    const handleSelectProduct = ( selectedCompanyData, product_id, product_name, product_renewTimePM ) =>
    {

        Swal.fire( {
            title: 'Submit new SIP Amount',
            html:
                '<div>Amount per dates</div>' +
                '<input id="swal-input1" class="swal2-input" placeholder="Amount">' +
                '<div>Dates (use comma(,) for multiple date. not use space.)</div>' +
                '<input id="swal-input2" class="swal2-input" placeholder="Ex: 10,20,30">',
            focusConfirm: false,
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Create',
            showLoaderOnConfirm: true,
            preConfirm: () =>
            {
                const amount = Swal.getPopup().querySelector( '#swal-input1' ).value;
                var date = Swal.getPopup().querySelector( '#swal-input2' ).value;
                date = date.replace( /,+/g, ',' );
                date = date.replace( /\s+/g, ' ' );
                date = date.trim();

                const validNumbers = [];
                for ( let i = 1; i <= 30; i++ )
                {
                    validNumbers.push( i );
                }

                const parts = date.split( ',' );
                const numbers = parts
                    .map( part => part.trim() ) // Trim whitespace from each part
                    .filter( part => !isNaN( part ) && part !== '' ) // Filter out non-numeric values and empty strings
                    .map( Number ) // Convert remaining parts to numbers
                    .filter( number => validNumbers.includes( number ) ); // Filter numbers to ensure they are within the valid range

                const finalDates = [ ...new Set( numbers ) ];


                console.log( finalDates );

                if ( finalDates.length < 1 || !amount )
                {
                    Swal.showValidationMessage( 'All fields are required' );
                    return false;
                }

                let getToken = localStorage.getItem( 'token' )
                let getCompanyId = localStorage.getItem( 'companyId' )
                console.log( product_id );

                return axios.post( api + `/admin/sip/add-sip-amount`,
                    {
                        dates: date,
                        amount: amount,
                        name: product_name,
                        productId: product_id,
                        companyId: getCompanyId,
                        sipCompanyId: selectedCompanyData.sipCompanyId,
                        userId
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
                            throw new Error( response.data.message );
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
                    title: `Amount added!`,
                } );
            }
        } );

    }


    return (
        <div>
            <PageHeader currentpage="User Data" activepage="Home" mainpage="User Data" />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box xl:overflow-auto flex">

                        <div className="box-header">
                            <div className="flex items-center">
                                <h5 className="box-title">Company Name</h5>
                                <Select classNamePrefix='react-select'
                                    options={ CompanySelect }
                                    menuPlacement='top'
                                    onChange={ ( selected ) => setSelectedCompanyName( selected[ 0 ]?.value ) }
                                    placeholder='Open this select company' />

                                <div className='px-1'></div>

                                <button type="button"
                                    onClick={ handleSelectedCompanyData }
                                    className="mx-4 py-2 px-3 ti-btn ti-btn-primary">
                                    Select
                                </button>
                            </div>
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
                                                <th>Products</th>
                                                <th>Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            { selectedCompanyData &&

                                                selectedCompanyData
                                                    .productList
                                                    .map( ( product, index ) => (
                                                        <Fragment key={ index }>
                                                            <tr>
                                                                <td>{ product.name }</td>
                                                                <td>
                                                                    <button
                                                                        onClick={ () => handleSelectProduct( selectedCompanyData, product._id, product.name, product.renewTimePM ) }
                                                                        style={ {
                                                                            backgroundColor: '#007bff',
                                                                            color: 'white',
                                                                            padding: '10px 20px',
                                                                            borderRadius: '5px',
                                                                            border: 'none',
                                                                            cursor: 'pointer',
                                                                            marginRight: '10px'
                                                                        } }>
                                                                        Select
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

export default NewSIPInvestment