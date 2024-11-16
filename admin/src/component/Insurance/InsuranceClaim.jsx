import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader'
import Select from 'react-dropdown-select'
import ReactDatePicker from 'react-datepicker'
import axios from 'axios'
import { api } from '../../GlobalKey/GlobalKey'



const InsuranceClaim = () =>
{

    const { userId, serviceId } = useParams();

    const navigate = useNavigate();


    const [ insuranceData, setInsuranceData ] = useState( [] );

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


        axios.post( api + '/admin/insurance/one-insurance-data',
            {
                companyId: getCompanyId,
                userId,
                serviceId
            },
            {
                headers: {
                    Authorization: 'Bearer ' + getToken

                }
            }
        ).then( response =>
        {

            if ( response.data.status == 1 )
            {
                const myData = response.data.data;
                console.log( myData );
                setInsuranceData( myData );
            }
            else
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
            }
        } );
    }, [] )


    const handleClaim = ( id ) =>
    {

        navigate( `/insurance/insurance-claim/${ id }` );

    }
    const handleUpdateClaim = ( id ) =>
    {

        navigate( `/insurance/insurance-claim/${ id }` );

    }


    const handleNewClaim = () =>
    {

        navigate( `/insurance/service/${ userId }/${ serviceId }/new-claim` );

    }

    return (
        <div>
            <PageHeader currentpage="User Data" activepage="Home" mainpage="User Data" />

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">

                    <div className="box xl:overflow-auto">
                        <div className="box-header">
                            <h5 className="box-title">Insurance Claim List</h5>
                        </div>

                        <div style={ { justifyContent: 'space-between', alignItems: 'center' } }>
                            <button className='ti-btn ti-btn-primary' onClick={ handleNewClaim }>New Claim</button>
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
                                                <th>FillUp Date</th>
                                                <th>Claimed Date</th>
                                                <th>Reason</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                insuranceData.claimedData &&
                                                insuranceData
                                                    .claimedData
                                                    .map( ( insuranceClaim ) => (
                                                        <Fragment key={ insuranceClaim._id }>
                                                            <tr>
                                                                <td>{ insuranceClaim.fillUpDate }</td>
                                                                <td>{ insuranceClaim.claimedDate }</td>
                                                                <td>{ insuranceClaim.reason }</td>

                                                                <td>
                                                                    {/* { insuranceClaim.claim ? ( */ }
                                                                    <button
                                                                        type="button"
                                                                        className="ti-btn rounded-full ti-btn-warning"
                                                                        onClick={ () => handleUpdateClaim( insuranceClaim.claimId ) }
                                                                    >
                                                                        Update
                                                                    </button>

                                                                    {/* ) : ( */ }
                                                                    {/* // If data is not claimed, show the Claim button */ }
                                                                    <button
                                                                        onClick={ () => handleClaim( insuranceClaim.claimId ) }
                                                                        style={ {
                                                                            backgroundColor: '#007bff',
                                                                            color: 'white',
                                                                            padding: '10px 20px',
                                                                            borderRadius: '5px',
                                                                            border: 'none',
                                                                            cursor: 'pointer',
                                                                            marginRight: '10px'
                                                                        } }
                                                                    >
                                                                        Claim
                                                                    </button>
                                                                    {/* ) } */ }

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

export default InsuranceClaim