import React, { Fragment, useEffect, useState } from 'react'
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../GlobalKey/GlobalKey';

import { saveAs } from 'file-saver';



const InsuranceSupportDocsData = () =>
{

  const { userId, serviceId } = useParams();

  const [ myToken, setMyToken ] = useState( '' )
  const [ myCompanyId, setMyCompanyId ] = useState( '' )


  const [ formData, setFormData ] = useState( '' );


  const [ docInfo, setDocInfo ] = useState( '' );
  const [ documents, setDocuments ] = useState( null );

  const [ supportDocsData, setSupportDocsData ] = useState( [] );


  const navigate = useNavigate();


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
      const myData = response.data.data;
      console.log( myData );
      console.log( myData.supportDocsData );
      setSupportDocsData( myData.supportDocsData );

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


  const handleSubmit = async ( e ) =>
  {

    e.preventDefault();

    const formData = new FormData();

    formData.append( "docInfo", docInfo );
    formData.append( "documents", documents );
    formData.append( "userId", userId );
    formData.append( "serviceId", serviceId );
    formData.append( "companyId", myCompanyId );

    axios.post( api + '/admin/insurance/add-support-documents',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + myToken
        }
      }
    ).then( ( response ) =>
    {
      console.log( response.data );

      if ( response.status === 200 )
      {

        if ( response.data.status == "1" )
        {
          setDocInfo( '' );
          setDocuments( null );
          alert( "Question added successfully" );
          const myData = response.data.data;
          console.log( myData );
          console.log( myData.supportDocsData );
          setSupportDocsData( myData.supportDocsData );
        } else
        {
          alert( response.data.message );
        }
      }
    } ).catch( ( error ) => console.log( error ) );


  }


  const handleDownload = async ( filePath ) =>
  {

    axios.get(
      api + '/download-name?filePath=' + filePath,
    ).then( ( response ) =>
    {
      console.log( response.data );

      if ( response.status === 200 )
      {

        if ( response.data.status == "1" )
        {
          const fileName = response.data.fileName

          axios
            .get(
              api + '/download?filePath=' + filePath,
              {
                responseType: 'blob', // Important
                // headers: {
                //   Authorization: 'Bearer ' + myTokens
                // }
              }
            )
            .then( response =>
            {
              // Extract filename from content-disposition header if present
              // const contentDisposition = response.headers[ 'content-disposition' ]
              // console.log( contentDisposition );
              // const fileName = contentDisposition ? contentDisposition.split( ';' )[ 1 ].split( 'filename=' )[ 1 ].trim() : 'file';
              // console.log( contentDisposition )
              // console.log( fileName )
              // Save file using FileSaver.js
              saveAs( new Blob( [ response.data ] ), fileName )
            } )
            .catch( error =>
            {
              console.log( error )
              // if (
              //   error.response.status == 403 ||
              //   error.response.status == 401
              // )
              // {
              //   // Log out process and go to home page
              //   localStorage.setItem( 'token', null )
              //   localStorage.removeItem( 'token' )
              //   localStorage.clear()
              //   navigate( '/' )
              // } else
              // {
              //   alert( error )
              // }
            } );

        } else
        {
          alert( response.data.message );
        }
      }
    } ).catch( ( error ) => console.log( error ) );






  };



  return (
    <div>
      <PageHeader currentpage="User Data" activepage="Home" mainpage="User Data" />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">

          <div className="box xl:overflow-auto">
            <div className="box-header">
              <h5 className="box-title">Company Name:</h5>
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
                        <th>Documents Name/Type</th>
                        <th>Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      { supportDocsData &&
                        supportDocsData
                          .map( ( que ) => (
                            <Fragment key={ que._id }>
                              <tr>
                                <td>{ que.docInfo }</td>

                                <td>

                                  <button
                                    onClick={ () => handleDownload( que.documents ) }
                                    type="button"
                                    className="ti-btn rounded-full ti-btn-warning">
                                    Download Documents
                                  </button>

                                  <button type="button"
                                    /* // onClick={() => handleGoToServiceList(user.userFullData.userId)} */
                                    className="ti-btn ti-btn-danger"
                                    style={ {
                                      padding: '8px 20px',
                                      cursor: 'pointer',
                                      marginRight: '10px'
                                    } }>
                                    Delete
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

          <div className="grid grid-cols-12 gap-x-6">
            <div className="col-span-12">
              <div className="box">
                <div className="box-header">
                  <h5 className="box-title">Supported Documents Form</h5>
                </div>

                <div className="box-body">

                  <form onSubmit={ handleSubmit }>

                    <div className="grid gap-6 space-y-4 lg:space-y-0">

                      <div className="space-y-2">
                        <label className="ti-form-label mb-0">Docs Info</label>
                        <input type="text"
                          name="question"
                          value={ docInfo }
                          onChange={ ( e ) => { setDocInfo( e.target.value ) } }
                          className="my-auto ti-form-input" placeholder="Question" />
                      </div>

                      <div className="space-y-2">
                        {/* Company Documents */ }
                        <div className="box">
                          <div className="box-header">
                            <h5 className="box-title">Support Document</h5>
                          </div>
                          <div className="box-body">
                            <div className="space-y-2">
                              <label className="block">
                                <span className="sr-only">Choose Documents</span>
                                <input
                                  type="file"
                                  onChange={ ( e ) => setDocuments( e.target.files[ 0 ] ) }
                                  className="block w-full text-sm text-gray-500 dark:text-white/70 focus:outline-0 ltr:file:mr-4 rtl:file:ml-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary focus-visible:outline-none"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className='py-1'></div>

                    <div className="space-y-4">
                      <button type="submit" className="ti-btn ti-btn-primary">Submit</button>
                    </div>


                  </form>


                </div>
              </div>
            </div>


          </div>

        </div>
      </div>


    </div>
  )
}

export default InsuranceSupportDocsData