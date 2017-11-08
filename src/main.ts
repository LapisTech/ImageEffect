interface AppOption
{
	image: HTMLCanvasElement,
	preview: HTMLCanvasElement,
	mainarea: HTMLElement,
	subarea: HTMLElement,
	download: HTMLAnchorElement,
	filter: HTMLSelectElement,
}

document.addEventListener( 'DOMContentLoaded', () =>
{
	const app = new App( {
		image: <HTMLCanvasElement>document.getElementById( 'image' ),
		preview: <HTMLCanvasElement>document.getElementById( 'preview' ),
		mainarea: <HTMLElement>document.getElementById( 'main' ),
		subarea: <HTMLElement>document.getElementById( 'sub' ),
		download: <HTMLAnchorElement>document.getElementById( 'download' ),
		filter: <HTMLSelectElement>document.getElementById( 'filter' ),
	} );
}, false );
