import React, { Fragment, useState, useEffect } from "react";
import PageHeader from "../../layout/layoutsection/pageHeader/pageHeader";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../GlobalKey/GlobalKey";
import axios from "axios";
import jsPDF from 'jspdf';
import kkJPG from './../../assets/img/kk.jpg';
import kkPNG from './../../assets/img/kk.png';
import Barcode from 'react-barcode';
import moment from 'moment'




const SIPServiceList = () =>
{
    const { userId } = useParams();
    let navigate = useNavigate()
    const [ myToken, setMyToken ] = useState( '' )
    const [ myCompanyId, setMyCompanyId ] = useState( '' )

    const handleAddService = () =>
    {
        // useNavigate to another page
        navigate( `/sip/new-sip-investment/${ userId }` );
    };


    const [ services, setServices ] = useState( [] );


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
            .post( api + `/admin/sip/all-users-sip`,
                {
                    companyId: getCompanyId,
                    userId: userId,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + getToken

                    }
                }
            )
            .then( ( response ) =>
            {
                console.log( response );
                if ( response.data.status == 1 )
                {
                    const myData = response.data.data;

                    console.log( myData );
                    setServices( myData );

                } else
                {
                    alert( response.data.message );
                }
            } )
            .catch( ( error ) => console.log( error ) );


    }, [] );


    const handleEditClick = serviceId =>
    {
        const newServices = [ ...users ];

        const index = users.findIndex( user => user.userId === userId );

        newServices.splice( index, 1 );

        setServices( newServices );
    };

    const handleAddQuotationClick = serviceId =>
    {
        // useNavigate to another page
        navigate( `/consultancy/service/${ serviceId }/${ userId }/notes` );
    };

    const handleSendMailClick = serviceId =>
    {
        // Function to handle viewing the item
        console.log( `Viewing item with userId: ${ serviceId }` );

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

    const handleDownload = ( serviceId, subject, company, category, subCategory, price, paymentType ) =>
    {
        var doc = new jsPDF( "p", "mm", "a4" );

        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        console.log( userId );
        axios
            .post( api + `/userinfo`,
                {
                    userId,
                } )
            .then( ( response ) =>
            {
                console.log( response.data );

                if ( response.data.status == "1" )
                {
                    var userData = response.data.data;
                    // doc.addImage( kk, 'JPEG', 0, 0, width, height );

                    doc.setFontSize( 36 );
                    doc.text( 20, 50, "Name: " + userData.name );
                    doc.setFontSize( 12 );
                    doc.text( 20, 62, "Phone No: +91 - " + userData.phoneNumber );
                    doc.text( 20, 69, "WhatsApp No: +91 - " + userData.whatsappNumber );
                    doc.text( 20, 76, "Email ID: " + userData.email );
                    doc.text( 20, 83, "PAN No: " + userData.panNumber );
                    doc.text( 20, 90, "Aadhaar Carf No: " + userData.aadhaarNumber );

                    doc.setFontSize( 20 );
                    doc.setTextColor( 255, 0, 0 );
                    doc.text( 20, 100, "Service Name: " + subject + " (" + serviceId + ")" );
                    doc.setFontSize( 12 );
                    doc.setTextColor( 0, 0, 0 );
                    doc.text( 20, 107, "Company: " + company );
                    doc.text( 20, 114, "Category: " + category );
                    doc.text( 20, 121, "Sub-Category: " + subCategory );
                    doc.text( 20, 128, "Price: " + price );
                    doc.text( 20, 135, "Payment Type: " + paymentType );



                    var imageurl = api + '/barcode/' + serviceId;
                    toDataUrl( imageurl, ( myBase64 ) =>
                    {
                        console.log( myBase64 ); // myBase64 is the base64 string
                        doc.addImage( myBase64, 'PNG', 45, 160, 100, 25 );

                        doc.addImage( kkPNG, 'JPEG', 0, 0, width, height );








                        const words = [ 'apple', 'banana', 'orange', 'grape', 'peach', 'strawberry', 'kiwi', 'melon', 'pineapple', 'blueberry' ];

                        let note = '';
                        for ( let i = 0; i < 1000; i++ )
                        {
                            note += words[ Math.floor( Math.random() * words.length ) ] + ' ';
                        }


                        // Add new page
                        doc.addPage();



                        const textLines = doc.splitTextToSize( note, 180 ); // Adjust the width as needed
                        const pageHeight = doc.internal.pageSize.height;
                        let y = 20; // Initial y position
                        textLines.forEach( line =>
                        {
                            if ( y + 10 > pageHeight )
                            {
                                doc.addPage();
                                y = 20; // Reset y position for new page
                            }
                            doc.text( 20, y, line );
                            y += 10; // Adjust line height as needed
                        } );




                        doc.save( serviceId + '-service-kk.pdf' );
                    } );


                    // doc.addPage();
                    // doc.addImage( kk, 'JPEG', 0, 0, width, height );
                    // doc.setFont( 'helvetica' );
                    // // doc.setFontType( 'normal' );
                    // doc.text( 20, 100, 'This is the second page.' );

                    // doc.save( 'sample-file.pdf' );

                }





            } )
            .catch( ( error ) => console.log( error ) );


    };




    return (
        <div>
            <PageHeader currentpage="Edit Data Table" activepage="Basic Ui" mainpage="Edit Data Table" />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box xl:overflow-auto">
                        <div className="box-header">
                            <h5 className="box-title">User Details</h5>
                        </div>
                        <div style={ { justifyContent: 'space-between', alignItems: 'center' } }>
                            <button className='ti-btn ti-btn-primary' onClick={ handleAddService }>Add New Service</button>
                        </div>

                        <div className="box-body">
                            <div className="overflow-auto table-bordered">
                                <div className='app-container'>
                                    <form>
                                        <table
                                            id='user-datatable'
                                            className='ti-custom-table ti-striped-table ti-custom-table-hover'
                                        >
                                            <thead>
                                                <tr>
                                                    <th>Service ID</th>
                                                    <th>Reg Date</th>
                                                    <th>Company Name</th>
                                                    <th>Product Name</th>
                                                    <th>Amount</th>
                                                    <th>Dates</th>
                                                    <th>Status</th>
                                                    <th>Closing Amount</th>
                                                    <th>Click Here</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { services.map( service => (
                                                    <Fragment key={ service._id }>

                                                        <tr>
                                                            <td>{ service.serviceId }</td>
                                                            <td> { moment( new Date( parseInt( service.createDate ) ) ).format( "YYYY-MM-DD HH:mm:ss" ) }</td>
                                                            <td>{ service.sipCompanyData.sipCompanyName }</td>
                                                            <td>{ service.productsName }</td>
                                                            <td>{ service.productsAmount }</td>
                                                            <td>{ service.productsRenewDates.toString() }</td>
                                                            <td>{ service.status }</td>
                                                            <td>{ service.closingAmount }</td>
                                                            <td>
                                                                <button
                                                                    variant=''
                                                                    className='ti-btn ti-btn-primary me-1'
                                                                    type='button'
                                                                // onClick={ event => handleEditClick( event, service ) }
                                                                >
                                                                    History
                                                                </button>
                                                                <button
                                                                    variant=''
                                                                    className='ti-btn ti-btn-danger me-1'
                                                                    type='button'
                                                                    onClick={ () => handleAddQuotationClick( service.serviceId ) }
                                                                >
                                                                    De-active
                                                                </button>


                                                            </td>
                                                        </tr>

                                                    </Fragment>
                                                ) ) }
                                            </tbody>
                                        </table>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SIPServiceList;