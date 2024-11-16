import React, { Fragment, useEffect, useState } from 'react'
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../GlobalKey/GlobalKey';





const UserGSTRegForm = () =>
{


  const { userId } = useParams();

  const [ questionData, setQuestionData ] = useState( [] );
  const [ userQuestionData, setUserQuestionData ] = useState( [] );

  const [ questionName, setQuestionName ] = useState( '' );
  const [ questionId, setQuestionId ] = useState( '' );
  const navigate = useNavigate();


  useEffect( () =>
  {

    let getToken = localStorage.getItem( 'token' )
    let getCompanyId = localStorage.getItem( 'companyId' )

    if ( !getToken )
    {
      navigate( '/' )
    }

    axios.post( api + `/admin/gst/gst-reg-form-list`,
      {
        companyId: getCompanyId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + getToken

        }
      } )
      .then( response =>
      {

        const myData = response.data.data;
        setQuestionData( myData );


      } )
      .catch( error =>
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



    axios.post( api + `/admin/gst/user-question-list`,
      {
        companyId: getCompanyId,
        userId
      },
      {
        headers: {
          Authorization: 'Bearer ' + getToken

        }
      } )
      .then( response =>
      {

        const myData = response.data.data;
        setUserQuestionData( myData );
        console.log( myData );
      } )
      .catch( error =>
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
    const myToken = localStorage.getItem( 'token' );
    const myCompanyId = localStorage.getItem( 'companyId' );

    console.log( { questionId, question: questionName, questionType: questionId } )

    await axios.post( api + `/admin/gst/user-question-create`,
      {
        questionId,
        companyId: myCompanyId,
        question: questionName,
        userId
      },
      {
        headers: {
          Authorization: 'Bearer ' + myToken
        }

      } )
      .then( ( response ) =>
      {
        console.log( response.data );

        if ( response.status === 200 )
        {

          if ( response.data.status == "1" )
          {
            setQuestionName( '' );
            setQuestionId( '' );
            alert( "Question added successfully" );
            const myData = response.data.data;
            setUserQuestionData( myData );
          } else
          {
            alert( response.data.message );
          }
        }
      } ).catch( ( error ) => console.log( error ) );


  }


  const handleCopy = async ( data ) =>
  {
    console.log( data );
    await navigator.clipboard.writeText( `${ window.location.origin }/gst-reg/${ data.formPassword }/${ data.formId }/${ data.serviceId }` )
    window.open( `${ window.location.origin }/gst-reg/${ data.formPassword }/${ data.formId }/${ data.serviceId }`, "_blank" )

  };


  const handelView = ( userId ) =>
  {
    navigate( '/update-kyc/' + userId );
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
                        <th>User Form Name</th>
                        <th>Form Name</th>
                        <th>Form fill up date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      { Array.isArray( userQuestionData ) && userQuestionData.map( ( que, index ) => (
                        <Fragment key={ index }>
                          <tr>
                            <td>{ que.formName }</td>
                            <td>{ que.questionPackData.formName }</td>
                            <td>{ que.fillUpDate }</td>


                            <td>
                              <button
                                onClick={ () => handleCopy( que ) }
                                style={ {
                                  backgroundColor: '#007bff',
                                  color: 'white',
                                  padding: '10px 20px',
                                  borderRadius: '5px',
                                  border: 'none',
                                  cursor: 'pointer',
                                  marginRight: '10px'
                                } }>Copy public link</button>

                              <button type="button"
                                onClick={ () => handelView( que ) }
                                className="ti-btn ti-btn-danger"
                                style={ {
                                  padding: '8px 20px',
                                  cursor: 'pointer',
                                  marginRight: '10px'
                                } }>
                                View
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
                  <h5 className="box-title">Select Questions Form</h5>
                </div>
                <div className="box-body">

                  <form onSubmit={ handleSubmit }>

                    <div className="grid gap-6 space-y-4 lg:space-y-0">

                      <div className="space-y-2">
                        <label className="ti-form-label mb-0">Question Heading</label>
                        <input type="text"
                          name="question"
                          value={ questionName }
                          onChange={ ( e ) => { setQuestionName( e.target.value ) } }
                          className="my-auto ti-form-input" placeholder="Question" />
                      </div>

                      <div className="space-y-2">
                        <label className="ti-form-label mb-0">Select Question</label>
                        <select
                          className="my-auto ti-form-select"
                          value={ questionId }
                          onChange={ ( e ) =>

                            setQuestionId( e.target.value ) }
                          required
                        >
                          <option value="">Select Question Type</option>
                          { questionData.map( ( option, index ) => (
                            <option key={ index } value={ option._id }>{ option.formName }</option>
                          ) ) }
                        </select>
                      </div>

                    </div>

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

export default UserGSTRegForm