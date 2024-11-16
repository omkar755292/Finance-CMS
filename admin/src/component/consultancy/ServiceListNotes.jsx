import React, { Fragment, useState, useEffect } from "react";
import PageHeader from "../../layout/layoutsection/pageHeader/pageHeader";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../GlobalKey/GlobalKey";

import MyTable from "./ServiceListNotesTable";
import axios from "axios";
import ReactQuill from 'react-quill';
import SunEditor from 'suneditor-react';
import jsPDF from 'jspdf';
import kkJPG from './../../assets/img/kk.jpg';
import kkPNG from './../../assets/img/kk.png';
import Barcode from 'react-barcode';
import moment from 'moment'
import html2canvas from 'html2canvas';






const ServiceListNotes = () =>
{
    const { userId, serviceId } = useParams();
    let navigate = useNavigate()
    const [ myToken, setMyToken ] = useState( '' )
    const [ myCompanyId, setMyCompanyId ] = useState( '' )

    const [ newNote, setNewNote ] = useState( '' );
    const handleTextExtraChange = ( event ) =>
    {
        setNewNote( event.target.value );
    };



    const handleAddService = () =>
    {
        // useNavigate to another page
        navigate( `/services/${ serviceId }/add` );
    };

    const [ notes, setNotes ] = useState( [] );



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
            .post( api + `/admin/consultancy/one-service`,
                {
                    serviceId: serviceId,
                    companyId: getCompanyId,
                    userId,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + getToken

                    }
                }

            )
            .then( ( response ) =>
            {
                console.log( response.data );
                if ( response.status === 200 )
                {
                    if ( response.data.status == "1" )
                    {
                        setNotes( response.data.data.quotations );
                        console.log( response.data.data.quotations );

                        setNewNote( "" );
                    } else
                    {
                        alert( response.data.message );
                    }
                }
            } )
            .catch( ( error ) => console.log( error ) );


    }, [] );

    const formSubmit = ( e ) =>
    {
        e.preventDefault();

        // Todo: Api call and upload the value as json formate as body
        axios
            .post(
                api + `/admin/consultancy/add-notes-to-services`,
                {
                    note: newNote,
                    serviceId,
                    companyId: myCompanyId,
                    userId,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + myToken
                    }
                }
            )
            .then( ( response ) =>
            {
                if ( response.status === 200 )
                {
                    if ( response.data.status == "1" )
                    {
                        alert( response.data.message );

                        setNotes( response.data.data.quotations );
                        setNewNote( "" );

                    } else
                    {
                        alert( response.data.message );
                    }
                }

            } )
            .catch( ( error ) =>
            {
                if ( error.response )
                {
                    // the request was made and the server responded with a status code
                    console.log( error.response );
                    console.log( error.response.status );
                } else if ( error.request )
                {
                    // the request was made but no response was received
                    console.log( "network error" );
                } else
                {
                    // something happened when setting up the request
                    console.log( error );
                }
            } );


        // Todo: Redirect to the dashboard page
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

    const handleDownload = () =>
    {
        axios
            .post( api + `/admin/consultancy/one-service`,
                {
                    serviceId: serviceId,
                    companyId: myCompanyId,
                    userId,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + myToken

                    }
                }

            )
            .then( ( response ) =>
            {

                if ( response.data.status == "1" )
                {
                    var serviceData = response.data.data;


                    var doc = new jsPDF( "p", "mm", "a4" );

                    var width = doc.internal.pageSize.getWidth();
                    var height = doc.internal.pageSize.getHeight();
                    // axios
                    //     .post( api + `/userinfo`,
                    //         {
                    //             uid: serviceData.userId,
                    //         } )
                    //     .then( ( response2 ) =>
                    //     {

                    // if ( response2.data.status == "1" )
                    // {
                    var userData = response.data.data.consultancyOnboardingData.userFullData;
                    var pageNo = 0;
                    doc.addImage( kkJPG, 'JPEG', 0, 0, width, height );

                    doc.setFontSize( 12 );
                    doc.setTextColor( 0, 0, 0 );
                    pageNo += 1;
                    doc.text( 100, 293, "Page: " + pageNo.toString() );

                    doc.setFontSize( 14 );
                    // doc.setFontType( 'bold' );
                    doc.setTextColor( 0, 0, 255 );
                    doc.text( 20, 50, userData.name );
                    doc.setFontSize( 12 );
                    // doc.setFontType( 'normal' );
                    doc.setTextColor( 0, 0, 0 );
                    doc.text( 20, 55, userData.phoneNumber );
                    doc.text( 20, 60, userData.email );
                    // doc.text( 20, 63, "---------------------------------------------------------------------------------------------------------------------------" );

                    doc.setFontSize( 16 );
                    // doc.setFontType( 'bold' );
                    doc.setTextColor( 0, 0, 255 );
                    doc.text( 20, 68, serviceData.subject );
                    doc.setFontSize( 12 );
                    doc.setTextColor( 0, 0, 0 );
                    doc.text( 20, 74, serviceData.category + " | " + serviceData.subCategory );
                    // doc.text( 20, 79, );
                    // doc.text( 20, 84, "Company: " + serviceData.company );


                    var imageurl1 = api + '/barcode/' + userData.userId;
                    toDataUrl( imageurl1, ( myBase64_1 ) =>
                    {
                        doc.addImage( myBase64_1, 'PNG', 130, 40, 60, 15 );

                        var imageurl2 = api + '/barcode/' + serviceId;
                        toDataUrl( imageurl2, ( myBase64 ) =>
                        {
                            // console.log( myBase64 ); // myBase64 is the base64 string
                            doc.addImage( myBase64, 'PNG', 130, 64, 60, 15 );
                            // doc.text( 20, 85, "======================================================================" );
                            doc.text( 20, 85, "_________________________________________________________________________" );


                            let y = 90; // Initial y position


                            // get data using loop notes
                            for ( let i = 0; i < notes.length; i++ )
                            {
                                var noteData = notes[ i ];

                                // var entryTime = new Date( noteData.entryTime );

                                var t = new Date( parseInt( noteData.entryTime.toString() ) );


                                var entryTime = moment( t ).format( "YYYY-MM-DD HH:mm:ss" );


                                // var date = entryTime.getDate();

                                var thisNote = noteData.note;

                                // thisNote = thisNote.replace( "'", "\'" ).replace( '"', '\"' );



                                // doc.addPage();
                                // doc.addImage( kkJPG, 'JPEG', 0, 0, width, height );

                                const textLines = doc.splitTextToSize( thisNote, 180 ); // Adjust the width as needed

                                const pageHeight = doc.internal.pageSize.height;


                                // y += 4;
                                if ( y + 10 + 15 > pageHeight )
                                {
                                    doc.addPage();
                                    doc.addImage( kkJPG, 'JPEG', 0, 0, width, height );
                                    y = 50; // Reset y position for new page
                                    doc.setFontSize( 12 );
                                    doc.setTextColor( 0, 0, 0 );
                                    pageNo += 1;
                                    doc.text( 100, 293, "Page: " + pageNo.toString() );
                                }

                                doc.setFontSize( 12 );
                                doc.setTextColor( 0, 0, 0 );
                                // doc.text( 20, y, "---------------------------------------------------------------------------------------------------------------------------" );
                                y += 7;
                                doc.setFontSize( 14 );
                                if ( y + 10 + 15 > pageHeight )
                                {
                                    doc.addPage();
                                    doc.addImage( kkJPG, 'JPEG', 0, 0, width, height );
                                    y = 50; // Reset y position for new page
                                    doc.setFontSize( 12 );
                                    doc.setTextColor( 0, 0, 0 );
                                    pageNo += 1;
                                    doc.text( 100, 293, "Page: " + pageNo.toString() );
                                }
                                doc.setTextColor( 0, 0, 255 );
                                doc.text( 20, y, entryTime );
                                doc.setFontSize( 12 );
                                doc.setTextColor( 0, 0, 0 );
                                y += 5;


                                textLines.forEach( line =>
                                {

                                    if ( y + 10 + 15 > pageHeight )
                                    {
                                        doc.addPage();
                                        doc.addImage( kkJPG, 'JPEG', 0, 0, width, height );
                                        y = 50; // Reset y position for new page
                                        doc.setFontSize( 12 );
                                        doc.setTextColor( 0, 0, 0 );
                                        pageNo += 1;
                                        doc.text( 100, 293, "Page: " + pageNo.toString() );
                                    }
                                    doc.text( 20, y, line );
                                    y += 5; // Adjust line height as needed


                                } );


                            }

                            const words = [ 'apple', 'banana', 'orange', 'grape', 'peach', 'strawberry', 'kiwi', 'melon', 'pineapple', 'blueberry' ];

                            let note = '';
                            for ( let i = 0; i < 1000; i++ )
                            {
                                note += words[ Math.floor( Math.random() * words.length ) ] + ' ';
                            }


                            // Add new page
                            //     doc.addPage();
                            //   doc.addImage( kkJPG, 'JPEG', 0, 0, width, height );



                            //const textLines = doc.splitTextToSize( note, 180 ); // Adjust the width as needed
                            //const pageHeight = doc.internal.pageSize.height;
                            //let y = 50; // Initial y position
                            //textLines.forEach( line =>
                            //{
                            //  if ( y + 10 > pageHeight )
                            //{
                            //  doc.addPage();
                            //doc.addImage( kkJPG, 'JPEG', 0, 0, width, height );
                            //        y = 50; // Reset y position for new page
                            //  }
                            //doc.text( 20, y, line );
                            //        y += 10; // Adjust line height as needed
                            //  } );



                            doc.save( serviceId + '-service.pdf' );

                            doc.autoPrint();

                            doc.output( 'dataurlnewwindow' ); // Todo: show in browser/element

                        } );
                    } );





                    // }
                    // } )
                    // .catch( ( error ) => console.log( error ) );
                }

            } )
            .catch( ( error ) => console.log( error ) );



    };

    const generatePDF = async () =>
    {
        // Get the HTML element to convert to PDF
        const element = document.getElementById( 'html-content' );

        // Create a new jsPDF instance
        const pdf = new jsPDF( 'p', 'pt', 'a4' );

        // Calculate total height of HTML content
        const elementHeight = element.clientHeight;
        const pageHeight = pdf.internal.pageSize.getHeight();
        let currentPosition = 0;

        while ( currentPosition < elementHeight )
        {
            // Convert HTML element to canvas using html2canvas
            const canvas = await html2canvas( element, {
                scale: 1,
                windowWidth: element.clientWidth,
                windowHeight: pageHeight,
                scrollY: currentPosition,
            } );

            // Convert canvas to image data URL
            const imgData = canvas.toDataURL( 'image/jpeg', 1.0 );

            // Add image to PDF
            pdf.addImage( imgData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight() );

            // Add new page if content is too long
            currentPosition += pageHeight;
            if ( currentPosition < elementHeight )
            {
                pdf.addPage();
            }
        }

        // Save the PDF
        pdf.save( 'html-to-pdf.pdf' );
    };


    return (
        <div>
            <PageHeader currentpage="Edit Data Table" activepage="Basic Ui" mainpage="Edit Data Table" />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">



                    <div className="box xl:overflow-auto">
                        <div className="box-header">
                            <h5 className="box-title">Service Quotations</h5>
                        </div>


                        <button onClick={ () => handleDownload() } className="ti-btn ti-btn-primary">Download PDF</button>
                        {/* <button onClick={ () => generatePDF() } className="ti-btn ti-btn-primary">Download PDF</button> */ }



                        <div className="box-body">
                            <form onSubmit={ formSubmit }>

                                <div className="grid grid-cols-12 gap-6">
                                    <div className="col-span-12">
                                        <div className="box">
                                            <div className="box-header">
                                                <h5 className="box-title">Enter new notes</h5>
                                            </div>
                                            <div className="box-body">
                                                {/* <ReactQuill theme="snow" value={ newNote } onChange={ setNewNote } /> */ }
                                                <textarea
                                                    value={ newNote }
                                                    onChange={ handleTextExtraChange }
                                                    rows={ 10 } // Number of rows for the text area
                                                    cols={ 50 } // Number of columns for the text area
                                                    style={ { width: '100%' } } // Set the width to 100%
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <button type="submit" className="ti-btn ti-btn-primary">Add new quotations</button>
                            </form>
                        </div>


                        <div id="html-content" className="box-body">
                            <div className="overflow-auto table-bordered">
                                <MyTable
                                    serviceId={ serviceId }
                                    notes={ notes }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceListNotes;