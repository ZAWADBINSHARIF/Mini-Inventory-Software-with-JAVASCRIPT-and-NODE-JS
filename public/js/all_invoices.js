async function download_invoice(invoiceName) {
    const download = await fetch(`/invoice/download/${invoiceName}`,
        {
            method: 'GET'
        });

    const blob = await download.blob(); // blob is recevied any kind of file
    console.log(blob)
    const link = document.createElement('a'); // create an anchore tag
    link.href = URL.createObjectURL(blob); // href added in anchore tag which was created
    link.download = `${invoiceName}.pdf`; // this download attribue works set a name of downloaded file
    document.body.appendChild(link); // create a append child in body
    link.click();
    document.body.removeChild(link);
}