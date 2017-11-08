function GrayScale( canvas: HTMLCanvasElement )
{
	const w = canvas.width;
	const h = canvas.height;
	const context = <CanvasRenderingContext2D>canvas.getContext( '2d' );

	const image = context.getImageData( 0, 0, w, h );

	for ( let i = 0 ; i < w * h ; ++i )
	{
		// RGBA
		const r = image.data[ i * 4 + 0 ];
		const g = image.data[ i * 4 + 1 ];
		const b = image.data[ i * 4 + 2 ];
		const Y = ( Math.max( r, g, b ) + Math.min( r, g, b ) ) / 2;
		image.data[ i * 4 + 0 ] = image.data[ i * 4 + 1 ] = image.data[ i * 4 + 2 ] = Y;
	}

	context.putImageData( image, 0, 0 );
}

function Reverse( canvas: HTMLCanvasElement )
{
	const w = canvas.width;
	const h = canvas.height;
	const context = <CanvasRenderingContext2D>canvas.getContext( '2d' );

	const image = context.getImageData( 0, 0, w, h );

	for ( let i = 0 ; i < w * h ; ++i )
	{
		// RGB
		image.data[ i * 4 + 0 ] = 255 - image.data[ i * 4 + 0 ];
		image.data[ i * 4 + 1 ] = 255 - image.data[ i * 4 + 1 ];
		image.data[ i * 4 + 2 ] = 255 - image.data[ i * 4 + 2 ];
	}

	context.putImageData( image, 0, 0 );
}

function Complementary( canvas: HTMLCanvasElement )
{
	const w = canvas.width;
	const h = canvas.height;
	const context = <CanvasRenderingContext2D>canvas.getContext( '2d' );

	const image = context.getImageData( 0, 0, w, h );

	for ( let i = 0 ; i < w * h ; ++i )
	{
		// RGB
		const r = image.data[ i * 4 + 0 ];
		const g = image.data[ i * 4 + 1 ];
		const b = image.data[ i * 4 + 2 ];
		const base = Math.max( r, g, b ) + Math.max( r, g, b );
		image.data[ i * 4 + 0 ] = base - r;
		image.data[ i * 4 + 1 ] = base - g;
		image.data[ i * 4 + 2 ] = base - b;
	}

	context.putImageData( image, 0, 0 );
}

function Red( canvas: HTMLCanvasElement )
{
	const w = canvas.width;
	const h = canvas.height;
	const context = <CanvasRenderingContext2D>canvas.getContext( '2d' );

	const image = context.getImageData( 0, 0, w, h );

	for ( let i = 0 ; i < w * h ; ++i )
	{
		image.data[ i * 4 + 1 ] = 0;
		image.data[ i * 4 + 2 ] = 0;
	}

	context.putImageData( image, 0, 0 );
}

function Green( canvas: HTMLCanvasElement )
{
	const w = canvas.width;
	const h = canvas.height;
	const context = <CanvasRenderingContext2D>canvas.getContext( '2d' );

	const image = context.getImageData( 0, 0, w, h );

	for ( let i = 0 ; i < w * h ; ++i )
	{
		image.data[ i * 4 + 0 ] = 0;
		image.data[ i * 4 + 2 ] = 0;
	}

	context.putImageData( image, 0, 0 );
}

function Blue( canvas: HTMLCanvasElement )
{
	const w = canvas.width;
	const h = canvas.height;
	const context = <CanvasRenderingContext2D>canvas.getContext( '2d' );

	const image = context.getImageData( 0, 0, w, h );

	for ( let i = 0 ; i < w * h ; ++i )
	{
		image.data[ i * 4 + 0 ] = 0;
		image.data[ i * 4 + 1 ] = 0;
	}

	context.putImageData( image, 0, 0 );
}
