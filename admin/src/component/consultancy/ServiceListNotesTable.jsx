import React, { Fragment, useState, useEffect } from "react";
// import { nanoid } from 'nanoid';
// import Formlayout from '../../../forms/formlayout/formlayout';
import axios from "axios";
import Parser from 'html-react-parser';
import ReactQuill from 'react-quill';
import moment from 'moment';
// Moment.globalFormat = 'D MMM YYYY';



const MyTable = ( { serviceId, notes } ) =>
{



    // useEffect( () =>
    // {

    //     axios
    //         .post( `http://localhost:3000/all-notes`,
    //             {
    //                 serviceId: serviceId,
    //             } )
    //         .then( ( response ) =>
    //         {
    //             console.log( response.data );
    //             setNotes( response.data.quotations );
    //         } )
    //         .catch( ( error ) => console.log( error ) );


    // }, [] );





    const handleSendMailClick = serviceId =>
    {
        // Function to handle viewing the item
        console.log( `Viewing item with userId: ${ userId }` );
    };

    // const handleAddService = () =>
    // {
    //     const id = users.length > 0 ? users[ users.length - 1 ].id + 1 : 1;
    //     const newService = {
    //         id: id,
    //         userId: 'Service ID',
    //         name: 'Name',
    //         email: 'Email',
    //         phone: 'Phone No.',
    //         whatsapp: 'Whatsapp No.',
    //         panCard: 'Pan Card No.',
    //         aadhaarCard: 'Aadhaar Card No.',
    //     };

    //     const sortedNotes = [ ...users, newService ].sort( ( a, b ) => a.id - b.id );
    //     setNotes( sortedNotes );
    // };

    return (
        <div className='app-container'>
            <form>
                {/* <div style={ { justifyContent: 'space-between', alignItems: 'center' } }>
                    <button className='ti-btn ti-btn-primary' onClick={ handleAddService }>Add user</button>
                </div> */}
                <table
                    id='user-datatable'
                    className='ti-custom-table ti-striped-table ti-custom-table-hover'
                >
                    <thead>
                        <tr>

                            <th>Date - Time</th>
                            <th>Quotations</th>
                        </tr>
                    </thead>
                    <tbody>
                        { notes.map( service => (
                            <Fragment key={ service.serviceId }>

                                <tr>
                                    {/* <td><Moment unix>{ service.entryTime }</Moment></td> */ }
                                    <td>{ moment( new Date( parseInt( service.entryTime.toString() ) ) ).format( "YYYY-MM-DD HH:mm:ss" ) }</td>
                                    {/*<td>{ service.note }</td> */ }
                                    <td>
                                        { service.note.split( '\n' ).map( ( line, index ) => (
                                            <React.Fragment key={ index }>
                                                { line }
                                                <br />
                                            </React.Fragment>
                                        ) ) }
                                    </td>
                                    {/*             <td>{ Parser( service.note ) }</td>*/ }
                                    {/* <td>{ Parser( service.price ) }</td> */ }
                                    {/* <div>{ Parser( this.state.message ) }</div> */ }

                                </tr>

                            </Fragment>
                        ) ) }
                    </tbody>
                </table>
            </form>
        </div>
    );
};


export default MyTable;
