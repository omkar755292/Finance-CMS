import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader'
import Select from 'react-dropdown-select'
import ReactDatePicker from 'react-datepicker'
import axios from 'axios'
import { api } from '../../GlobalKey/GlobalKey'


const InsuranceClaimForm = () =>
{
    const { userId, serviceId } = useParams();
    const navigate = useNavigate();


    const StatusSelect = [
        { value: 'under-processing', label: 'under-processing' },
        { value: 'open', label: 'open' },
        { value: 'active', label: 'active' },
        { value: 'reject', label: 'reject' },
        { value: 'approved', label: 'approved' },
        { value: 'expired', label: 'expired' },
    ]

    const [ myToken, setMyToken ] = useState( '' )
    const [ myCompanyId, setMyCompanyId ] = useState( '' )


    const [ claimData, setClaimData ] = useState( {
        fillUpDate: null,
        claimedDate: null,
        reason: '',
        status: '',
        issuingDate: null,
        claimDocuments: null,
        companyDocuments: null,
        termsAccepted: false
    } );

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


        // try
        // {
        //     axios.post( api + '/admin/insurance/one-insurance-data',
        //         {
        //             companyId: getCompanyId,
        //             insuranceId
        //         },
        //         {
        //             headers: {
        //                 Authorization: 'Bearer ' + getToken

        //             }
        //         }
        //     ).then( response =>
        //     {

        //         if ( response.data.status == 1 )
        //         {
        //             const myData = response.data.data;
        //             console.log( myData );

        //             if ( myData.claim )
        //             {
        //                 const fetchedData = myData.claim;
        //                 setClaimData( {
        //                     fillUpDate: fetchedData.fillUpDate ? new Date( fetchedData.fillUpDate ) : null,
        //                     claimedDate: fetchedData.claimedDate ? new Date( fetchedData.claimedDate ) : null,
        //                     reason: fetchedData.reason || '',
        //                     issuingDate: fetchedData.issuingDate ? new Date( fetchedData.issuingDate ) : null,
        //                     status: fetchedData.status || null,
        //                     documents: [],
        //                     termsAccepted: false,
        //                 } );
        //             }

        //         }
        //         else
        //         {
        //             alert( response.data.message );
        //         }

        //     } )


        // } catch ( error )
        // {
        //     console.error( 'Error fetching claim data:', error );
        // }


    }, [] );

    const handleClaimForm = ( e ) =>
    {
        e.preventDefault();

        const formData = new FormData();
        for ( const key in claimData )
        {
            formData.append( key, claimData[ key ] );
        }


        formData.append( "userId", userId );
        formData.append( "serviceId", serviceId );
        formData.append( "companyId", myCompanyId );


        axios.post( api + '/admin/insurance/insurance-claim-form-submit',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + myToken
                }
            } ).then( response =>
            {
                if ( response.data.status === 1 )
                {
                    navigate( `/insurance/service/${ userId }/${ serviceId }/insurance-claim` );
                } else
                {
                    alert( response.data.message );
                }
            } ).catch( error =>
            {
                alert( error );
                console.log( error );
            } );
    };

    return (
        <div>
            <PageHeader currentpage="User Data" activepage="Home" mainpage="User Data" />
            <div className="col-span-12">
                <div className="box">
                    <div className="box-header">
                        <h5 className="box-title">Insurance Claim Form</h5>
                    </div>
                    <div className="box-body">

                        <form className="ti-validation" onSubmit={ handleClaimForm }>


                            <div className="grid lg:grid-cols-2 gap-4">

                                {/* Fill up Date */ }
                                <div className="box">
                                    <div className="box-header">
                                        <h5 className="box-title">Fill up Date</h5>
                                    </div>
                                    <div className="box-body">
                                        <div className="space-y-2">
                                            <ReactDatePicker
                                                selected={ claimData.fillUpDate }
                                                onChange={ ( date ) => setClaimData( { ...claimData, fillUpDate: date } ) }
                                                className="ti-form-input ltr:rounded-l-none rtl:rounded-r-none focus:z-10"
                                                dateFormat="yyyy-MM-dd"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Claimed Date */ }
                                <div className="box">
                                    <div className="box-header">
                                        <h5 className="box-title">Claimed Date</h5>
                                    </div>
                                    <div className="box-body">
                                        <div className="space-y-2">
                                            <ReactDatePicker
                                                selected={ claimData.claimedDate }
                                                onChange={ ( date ) => setClaimData( { ...claimData, claimedDate: date } ) }
                                                className="ti-form-input ltr:rounded-l-none rtl:rounded-r-none focus:z-10"
                                                dateFormat="yyyy-MM-dd"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Reason */ }
                            {/* <div className="col-span-12 lg:col-span-4"> */ }
                            <div className="box">
                                <div className="box-header">
                                    <h5 className="box-title">Reason</h5>
                                </div>
                                <div className="box-body">
                                    <div className="space-y-2">
                                        <textarea
                                            className="ti-form-input"
                                            rows="3"
                                            placeholder="Enter reason with brief descriptions"
                                            value={ claimData.reason }
                                            onChange={ ( e ) => setClaimData( { ...claimData, reason: e.target.value } ) }
                                        />

                                    </div>
                                </div>
                            </div>
                            {/* </div> */ }


                            <div className="grid lg:grid-cols-2 gap-4">


                                {/* Issuing Date */ }
                                <div className="box">
                                    <div className="box-header">
                                        <h5 className="box-title">Issuing Date</h5>
                                    </div>
                                    <div className="box-body">
                                        <div className="space-y-2">
                                            <ReactDatePicker
                                                selected={ claimData.issuingDate }
                                                onChange={ ( date ) => setClaimData( { ...claimData, issuingDate: date } ) }
                                                className="ti-form-input ltr:rounded-l-none rtl:rounded-r-none focus:z-10"
                                                dateFormat="yyyy-MM-dd"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Status */ }
                                <div className="box">
                                    <div className="box-header">
                                        <h5 className="box-title">Status</h5>
                                    </div>
                                    <div className="box-body">
                                        <div className="space-y-2">
                                            <Select
                                                value={ StatusSelect.find( option => option.value === claimData.status ) }
                                                onChange={ ( option ) => setClaimData( { ...claimData, status: option.value } ) }
                                                options={ StatusSelect }
                                                className="rounded-full"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/*Claim Documents */ }
                                <div className="box">
                                    <div className="box-header">
                                        <h5 className="box-title">Documents for claim</h5>
                                    </div>
                                    <div className="box-body">
                                        <div className="space-y-2">
                                            <label className="block">
                                                <span className="sr-only">Choose Documents</span>
                                                <input
                                                    type="file"
                                                    onChange={ ( e ) => setClaimData( { ...claimData, claimDocuments: e.target.files[ 0 ] } ) }
                                                    className="block w-full text-sm text-gray-500 dark:text-white/70 focus:outline-0 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary focus-visible:outline-none"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Company Documents */ }
                                <div className="box">
                                    <div className="box-header">
                                        <h5 className="box-title">Company Documents</h5>
                                    </div>
                                    <div className="box-body">
                                        <div className="space-y-2">
                                            <label className="block">
                                                <span className="sr-only">Choose Documents</span>
                                                <input
                                                    type="file"
                                                    onChange={ ( e ) => setClaimData( { ...claimData, companyDocuments: e.target.files[ 0 ] } ) }
                                                    className="block w-full text-sm text-gray-500 dark:text-white/70 focus:outline-0 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary focus-visible:outline-none"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div className="my-5">
                                <input
                                    type="checkbox"
                                    checked={ claimData.termsAccepted }
                                    onChange={ ( e ) => setClaimData( { ...claimData, termsAccepted: e.target.checked } ) }
                                    className="ti-form-checkbox mt-0.5"
                                    id="terms-checkbox"
                                    required
                                />
                                <label htmlFor="terms-checkbox" className="text-sm text-gray-500 ltr:ml-3 rtl:mr-3 dark:text-white/70">
                                    I agree with the <a href="#" className="text-primary hover:underline">terms and conditions</a>
                                </label>
                            </div>

                            <button type="submit" className="ti-btn ti-btn-primary">Submit</button>
                        </form>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsuranceClaimForm;