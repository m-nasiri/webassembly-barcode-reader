const barcodeScannerForm = document.querySelector('.barcode__scanner--form');
const barcodeImg = barcodeScannerForm.querySelector('#barcodeFile');
let zxing = ZXing().then((instance) => zxing = instance);

barcodeImg.addEventListener('change', (e) => {
    const barcodeScannerWrapper = document.querySelector('.barcode__scanner > .row');
    if (window.innerWidth > 768)
    {
        barcodeScannerWrapper.classList.remove('row-cols-1');
        barcodeScannerWrapper.classList.add('row-cols-2');
    }
    setTimeout(() => {
        document.querySelector('.barcode__preview').src = URL.createObjectURL(barcodeImg.files[0]);
    }, 300);
});

barcodeScannerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!barcodeImg.files[0])
        return showProcessBarcodeResult({ error: 'First select your barcode !'});
    
    const fileReader = new FileReader();
    fileReader.onload = (evt) => processBarcode(evt)
    fileReader.readAsArrayBuffer(barcodeImg.files[0]);
});

const processBarcode = (e) => {
    const barcodeType = barcodeScannerForm.querySelector('#barcodeType').value;
    const fileData = new Uint8Array(e.target.result);
    const buffer = zxing._malloc(fileData.length);
    zxing.HEAPU8.set(fileData, buffer);
    const result = zxing.readBarcode(buffer, fileData.length, true, barcodeType);
    zxing._free(buffer);
    showProcessBarcodeResult(result);
}

const showProcessBarcodeResult = (result) => {
    let title = '';
    let icon = '';

    if (result.error) {
        title = result.error;
        icon = 'error';
    } else if (result.format) {
        title = `Format: <strong>${result.format}</strong><pre>${result.text}</pre>`;
        icon = 'success';
    } else {
        title = `No ${barcodeScannerForm.querySelector('#barcodeType').value || 'barcode'} found`;
        icon = 'warning';
    }
    Swal.fire({icon, title});
}