interface FilterFunc
{
	( canvas: HTMLCanvasElement ): void;
}

class App
{
	private option: AppOption;
	private filters: { [ key: string ]: FilterFunc };

	constructor( option: AppOption )
	{
		this.option = option;

		// Filter
		this.filters = {};
		this.addFilter( 'Gray Scale', GrayScale );
		this.addFilter( 'Reverse', Reverse );
		this.addFilter( 'Complementary', Complementary );
		this.addFilter( 'Red', Red );
		this.addFilter( 'Green', Green );
		this.addFilter( 'Blue', Blue );
		this.option.filter.addEventListener( 'change', ( event ) => { this.execFilter(); }, false );

		// Drag & Drop
		this.initDropFile( this.option.mainarea, ( event ) => { this.dropEvent( event ); } );
	}

	private initDropFile( droparea: HTMLElement, drop: ( event: DragEvent ) => void )
	{
		droparea.addEventListener( 'dragover', ( event ) =>
		{
			event.stopPropagation();
			event.preventDefault();
			event.dataTransfer.dropEffect = 'copy';
		}, false );
		droparea.addEventListener( 'drop', drop, false );
	}

	private dropEvent( event: DragEvent )
	{
		event.stopPropagation();
		event.preventDefault();

		const files = event.dataTransfer.files;
		if ( files.length < 1 ) { return; }

		const file = files[ 0 ];
		if ( !file.type.match( 'image.*' ) ) { return; }

		// Set download file name.
		this.option.download.download = file.name;
		this.option.download.href = '';

		const image = document.createElement( 'img' );
		image.onload = () =>
		{
			this.drawView( this.option.image, image );
			//this.copyCanvas( this.option.image, this.option.preview );
			this.execFilter();
		};

		const reader = new FileReader();
		reader.onload = ( event ) => { image.src = reader.result; };
		reader.readAsDataURL( file );
	}

	private drawView( canvas: HTMLCanvasElement, image: HTMLImageElement )
	{
		canvas.width = image.naturalWidth;
		canvas.height = image.naturalHeight;

		const context = <CanvasRenderingContext2D>canvas.getContext( '2d' );

		context.clearRect( 0, 0, canvas.width, canvas.height );
		context.drawImage( image, 0, 0 );
	}

	private copyCanvas( src: HTMLCanvasElement, dest: HTMLCanvasElement )
	{
		dest.width = src.width;
		dest.height = src.height;

		const context = <CanvasRenderingContext2D>dest.getContext( '2d' );
		const context2 = <CanvasRenderingContext2D>src.getContext( '2d' );

		context.clearRect( 0, 0, dest.width, dest.height );
		context.putImageData( context2.getImageData( 0, 0, src.width, src.height ), 0, 0 );
	}

	private execFilter()
	{
		const option = this.option.filter.selectedOptions[ 0 ];
		const key = option.value;
		if ( !this.filters[ key ] ) { return; }
		this.copyCanvas( this.option.image, this.option.preview );
		this.filters[ key ]( this.option.preview );

		this.option.download.href = this.option.preview.toDataURL();
	}

	private addFilter( name: string, filter: FilterFunc )
	{

		const option = document.createElement( 'option' );
		option.textContent = name;
		option.value = name;
		if ( Object.keys( this.filters ).length === 0 )
		{
			option.selected = true;
		}

		if ( 0 <= Object.keys( this.filters ).indexOf( name ) ) { return; }
		this.filters[ name ] = filter;
		this.option.filter.appendChild( option );
	}
}
