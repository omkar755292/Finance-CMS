const bwipjs = require( 'bwip-js' );




async function createCode ( req, res )
{
    try
    {
        // const { text } = req.body;

        const text = req.params.text;

        const barcodeOptions = {
            bcid: 'code128', // Barcode type
            text: text, // Text or data to encode
            scale: 3, // Scale factor
            height: 10, // Bar height, in millimeters
            includetext: true, // Include human-readable text
            textxalign: 'center', // Text horizontal alignment
        };

        bwipjs.toBuffer( barcodeOptions, function ( err, pngBuffer )
        {
            if ( err )
            {
                res.status( 500 ).send( 'Error generating barcode' );
            } else
            {
                res.writeHead( 200, { 'Content-Type': 'image/png' } );
                res.end( pngBuffer, 'binary' );
            }
        } );



        // res.status( 200 ).json( myRes );
    } catch ( error )
    {
        console.error( error );
        res.status( 500 ).send( 'Error registering user' );
    }
}


module.exports = { createCode };
