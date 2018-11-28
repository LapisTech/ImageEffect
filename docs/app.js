class App {
    constructor(option) {
        this.option = option;
        this.filters = {};
        this.addFilter('Gray Scale', GrayScale);
        this.addFilter('Reverse', Reverse);
        this.addFilter('Complementary', Complementary);
        this.addFilter('Red', Red);
        this.addFilter('Green', Green);
        this.addFilter('Blue', Blue);
        this.addFilter('FillColor', FillColor);
        this.option.filter.addEventListener('change', (event) => { this.execFilter(); }, false);
        this.initDropFile(this.option.mainarea, (event) => { this.dropEvent(event); });
    }
    initDropFile(droparea, drop) {
        droparea.addEventListener('dragover', (event) => {
            event.stopPropagation();
            event.preventDefault();
            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'copy';
            }
        }, false);
        droparea.addEventListener('drop', drop, false);
    }
    dropEvent(event) {
        event.stopPropagation();
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length < 1) {
            return;
        }
        const file = files[0];
        if (!file.type.match('image.*')) {
            return;
        }
        this.option.download.download = file.name;
        this.option.download.href = '';
        const image = document.createElement('img');
        image.onload = () => {
            this.drawView(this.option.image, image);
            this.execFilter();
        };
        const reader = new FileReader();
        reader.onload = (event) => { image.src = reader.result; };
        reader.readAsDataURL(file);
    }
    drawView(canvas, image) {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0);
    }
    copyCanvas(src, dest) {
        dest.width = src.width;
        dest.height = src.height;
        const context = dest.getContext('2d');
        const context2 = src.getContext('2d');
        context.clearRect(0, 0, dest.width, dest.height);
        context.putImageData(context2.getImageData(0, 0, src.width, src.height), 0, 0);
    }
    execFilter() {
        const option = this.option.filter.selectedOptions[0];
        const key = option.value;
        if (!this.filters[key]) {
            return;
        }
        document.querySelectorAll('.option').forEach((input) => { input.classList.remove('on'); });
        this.copyCanvas(this.option.image, this.option.preview);
        this.filters[key](this.option.preview);
        this.option.download.href = this.option.preview.toDataURL();
    }
    addFilter(name, filter) {
        const option = document.createElement('option');
        option.textContent = name;
        option.value = name;
        if (Object.keys(this.filters).length === 0) {
            option.selected = true;
        }
        if (0 <= Object.keys(this.filters).indexOf(name)) {
            return;
        }
        this.filters[name] = filter;
        this.option.filter.appendChild(option);
    }
}
function GrayScale(canvas) {
    const w = canvas.width;
    const h = canvas.height;
    const context = canvas.getContext('2d');
    const image = context.getImageData(0, 0, w, h);
    for (let i = 0; i < w * h; ++i) {
        const r = image.data[i * 4 + 0];
        const g = image.data[i * 4 + 1];
        const b = image.data[i * 4 + 2];
        const Y = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
        image.data[i * 4 + 0] = image.data[i * 4 + 1] = image.data[i * 4 + 2] = Y;
    }
    context.putImageData(image, 0, 0);
}
function Reverse(canvas) {
    const w = canvas.width;
    const h = canvas.height;
    const context = canvas.getContext('2d');
    const image = context.getImageData(0, 0, w, h);
    for (let i = 0; i < w * h; ++i) {
        image.data[i * 4 + 0] = 255 - image.data[i * 4 + 0];
        image.data[i * 4 + 1] = 255 - image.data[i * 4 + 1];
        image.data[i * 4 + 2] = 255 - image.data[i * 4 + 2];
    }
    context.putImageData(image, 0, 0);
}
function Complementary(canvas) {
    const w = canvas.width;
    const h = canvas.height;
    const context = canvas.getContext('2d');
    const image = context.getImageData(0, 0, w, h);
    for (let i = 0; i < w * h; ++i) {
        const r = image.data[i * 4 + 0];
        const g = image.data[i * 4 + 1];
        const b = image.data[i * 4 + 2];
        const base = Math.max(r, g, b) + Math.max(r, g, b);
        image.data[i * 4 + 0] = base - r;
        image.data[i * 4 + 1] = base - g;
        image.data[i * 4 + 2] = base - b;
    }
    context.putImageData(image, 0, 0);
}
function Red(canvas) {
    const w = canvas.width;
    const h = canvas.height;
    const context = canvas.getContext('2d');
    const image = context.getImageData(0, 0, w, h);
    for (let i = 0; i < w * h; ++i) {
        image.data[i * 4 + 1] = 0;
        image.data[i * 4 + 2] = 0;
    }
    context.putImageData(image, 0, 0);
}
function Green(canvas) {
    const w = canvas.width;
    const h = canvas.height;
    const context = canvas.getContext('2d');
    const image = context.getImageData(0, 0, w, h);
    for (let i = 0; i < w * h; ++i) {
        image.data[i * 4 + 0] = 0;
        image.data[i * 4 + 2] = 0;
    }
    context.putImageData(image, 0, 0);
}
function Blue(canvas) {
    const w = canvas.width;
    const h = canvas.height;
    const context = canvas.getContext('2d');
    const image = context.getImageData(0, 0, w, h);
    for (let i = 0; i < w * h; ++i) {
        image.data[i * 4 + 0] = 0;
        image.data[i * 4 + 1] = 0;
    }
    context.putImageData(image, 0, 0);
}
function FillColor(canvas) {
    const input = document.getElementById('value1');
    input.classList.add('on');
    const w = canvas.width;
    const h = canvas.height;
    const context = canvas.getContext('2d');
    const image = context.getImageData(0, 0, w, h);
    context.fillStyle = input.value || 'blue';
    context.clearRect(0, 0, w, h);
    for (let i = 0; i < w * h; ++i) {
        context.globalAlpha = image.data[i * 4 + 3] / 255.0;
        context.fillRect(i % w, i / w, 1, 1);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const app = new App({
        image: document.getElementById('image'),
        preview: document.getElementById('preview'),
        mainarea: document.getElementById('main'),
        subarea: document.getElementById('sub'),
        download: document.getElementById('download'),
        filter: document.getElementById('filter'),
    });
}, false);
