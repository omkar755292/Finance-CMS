
import React, { Fragment, useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader';
import axios from 'axios'
import { api } from "../../GlobalKey/GlobalKey";



const AdminUpdateKYC = () =>
{


    const { userId } = useParams();

    const [ name, setName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ phoneNumber, setPhoneNumber ] = useState( '' );
    const [ whatsappNumber, setWhatsappNumber ] = useState( '' );
    // const [ password, setPassword ] = useState( '' );
    // const [ address, setAddress ] = useState( '' );
    // const [ pinCode, setPinCode ] = useState( '' );
    // const [ city, setCity ] = useState( '' );
    // const [ state, setState ] = useState( '' );
    // const [ panNumber, setPanNumber ] = useState( '' );
    // const [ aadhaarNumber, setAadhaarNumber ] = useState( '' );
    // const [ fatherName, setFatherName ] = useState( '' );
    // const [ motherName, setMotherName ] = useState( '' );
    // const [ occupation, setOccupation ] = useState( '' );

    // const [ aadhaarPdf, setAadhaarPdf ] = useState( null );
    // const [ panPdf, setPanPdf ] = useState( null );
    // const [ profileImage, setProfileImage ] = useState( null );






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
            .post( api + `/admin/admin-list/one-data`,
                {
                    companyId: getCompanyId,
                    userId
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + getToken

                    }
                }
            )
            .then( response =>
            {
                if ( response.data.status == 1 )
                {
                    const myData = response.data.data;

                    console.log( myData );
                    // setUsers( myData );

                    setName( myData.name );
                    setEmail( myData.email );
                    setPhoneNumber( myData.phoneNumber );
                    setWhatsappNumber( myData.whatsappNumber );
                    // setAddress( myData.address );
                    // setPinCode( myData.pinCode );
                    // setCity( myData.city );
                    // setState( myData.state );
                    // setPanNumber( myData.panNumber );
                    // setAadhaarNumber( myData.aadhaarNumber );
                    // setFatherName( myData.fatherName );
                    // setMotherName( myData.motherName );
                    // setOccupation( myData.occupation );
                    // setAadhaarPdf( myData.aadhaarPdf );
                    // setPanPdf( myData.panPdf );
                    // setProfileImage( myData.profileImage );
                } else
                {
                    alert( response.data.message );
                    navigate( '/' );

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



    const handleSubmit = ( event, myCompanyId, userId ) =>
    {
        event.preventDefault();



        const formData = new FormData();


        formData.append( "companyId", myCompanyId );
        formData.append( "userId", userId );
        formData.append( "name", name );
        formData.append( "email", email );
        formData.append( "phoneNumber", phoneNumber );
        formData.append( "whatsappNumber", whatsappNumber );
        // formData.append( "address", address );
        // formData.append( "pinCode", pinCode );
        // formData.append( "city", city );
        // formData.append( "state", state );
        // formData.append( "panNumber", panNumber );
        // formData.append( "aadhaarNumber", aadhaarNumber );
        // formData.append( "fatherName", fatherName );
        // formData.append( "motherName", motherName );
        // formData.append( "occupation", occupation );

        // formData.append( "aadhaarPdf", aadhaarPdf );
        // formData.append( "panPdf", panPdf );
        // formData.append( "profileImage", profileImage );

        // console.log( formData );
        // console.log( formData.get );


        axios
            .post( api + `/admin/admin-list/update-kyc`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + myToken
                    }
                }
            )
            .then( response =>
            {
                if ( response.data.status == 1 )
                {
                    // window reload
                    window.location.reload();

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

    };

    return (
        <div>
            <PageHeader currentpage="Add New Users" activepage="Home" mainpage="Add New Users" />

            <div className="grid grid-cols-12 gap-x-6"></div>

            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-body">
                            <form onSubmit={ ( event ) => handleSubmit( event, myCompanyId, userId ) }>
                                <div className="grid lg:grid-cols-2 gap-6 space-y-4 lg:space-y-0">
                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Name</label>
                                        <input
                                            type="text"
                                            className="my-auto ti-form-input"
                                            value={ name }
                                            onChange={ ( e ) => setName( e.target.value ) }
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Email</label>
                                        <input
                                            type="email"
                                            className="my-auto ti-form-input"
                                            value={ email }
                                            onChange={ ( e ) => setEmail( e.target.value ) }
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Phone Number</label>
                                        <input
                                            type="text"
                                            className="my-auto ti-form-input"
                                            value={ phoneNumber }
                                            onChange={ ( e ) => setPhoneNumber( e.target.value ) }
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">WhatsApp Number</label>
                                        <input
                                            type="text"
                                            className="my-auto ti-form-input"
                                            value={ whatsappNumber }
                                            onChange={ ( e ) => setWhatsappNumber( e.target.value ) }
                                            required
                                        />
                                    </div>

                                    {/* <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Address</label>
                                        <input
                                            type="text"
                                            className="my-auto ti-form-input"
                                            value={ address }
                                            onChange={ ( e ) => setAddress( e.target.value ) }
                                            required
                                        />
                                    </div> */}

                                    {/* <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Pin Code</label>
                                        <input
                                            type="text"
                                            className="my-auto ti-form-input"
                                            value={ pinCode }
                                            onChange={ ( e ) => setPinCode( e.target.value ) }
                                            required
                                        />
                                    </div> */}

                                    {/* <div className="space-y-2">
                                        <label className="ti-form-label mb-0">City</label>
                                        <input
                                            type="text"
                                            className="my-auto ti-form-input"
                                            value={ city }
                                            onChange={ ( e ) => setCity( e.target.value ) }
                                            required
                                        />
                                    </div> */}

                                    {/* <div className="space-y-2">
                                        <label className="ti-form-label mb-0">State</label>
                                        <input
                                            type="text"
                                            className="my-auto ti-form-input"
                                            value={ state }
                                            onChange={ ( e ) => setState( e.target.value ) }
                                            required
                                        />
                                    </div> */}

                                    {/* <div className="space-y-2">
                                        <label className="ti-form-label mb-0">PAN Number</label>
                                        <input
                                            type="text"
                                            className="my-auto ti-form-input"
                                            value={ panNumber }
                                            onChange={ ( e ) => setPanNumber( e.target.value ) }
                                            required
                                        />
                                    </div> */}

                                    {/* <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Aadhaar Number</label>
                                        <input
                                            type="text"
                                            className="my-auto ti-form-input"
                                            value={ aadhaarNumber }
                                            onChange={ ( e ) => setAadhaarNumber( e.target.value ) }
                                            required
                                        />
                                    </div> */}

                                    {/* <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Father's Name</label>
                                        <input
                                            type="text"
                                            className="my-auto ti-form-input"
                                            value={ fatherName }
                                            onChange={ ( e ) => setFatherName( e.target.value ) }
                                            required
                                        />
                                    </div> */}

                                    {/* <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Mother's Name</label>
                                        <input
                                            type="text"
                                            className="my-auto ti-form-input"
                                            value={ motherName }
                                            onChange={ ( e ) => setMotherName( e.target.value ) }
                                            required
                                        />
                                    </div> */}

                                    {/* <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Occupation</label>
                                        <input
                                            type="text"
                                            className="my-auto ti-form-input"
                                            value={ occupation }
                                            onChange={ ( e ) => setOccupation( e.target.value ) }
                                            required
                                        />
                                    </div> */}


                                    {/* <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Aadhaar Pdf</label>
                                        <input
                                            type="file"
                                            className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-3 file:px-4 dark:file:bg-black/20 dark:file:text-white/70"
                                            accept=".pdf"
                                            onChange={ ( e ) => setAadhaarPdf( e.target.files[ 0 ] ) }
                                            required
                                        />
                                    </div> */}

                                    {/* <div className="space-y-2">
                                        <label className='ti-form-label mb-0'>PAN Pdf</label>
                                        <input
                                            type="file"
                                            className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-3 file:px-4 dark:file:bg-black/20 dark:file:text-white/70"
                                            accept=".pdf"
                                            onChange={ ( e ) => setPanPdf( e.target.files[ 0 ] ) }
                                            required
                                        />
                                    </div> */}

                                    {/* <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Profile Photo</label>
                                        <input
                                            type="file"
                                            className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-3 file:px-4 dark:file:bg-black/20 dark:file:text-white/70"
                                            accept=".jpg"
                                            onChange={ ( e ) => setProfileImage( e.target.files[ 0 ] ) }
                                            required
                                        />
                                    </div> */}

                                </div>

                                <button type="submit" className="ti-btn ti-btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminUpdateKYC;
