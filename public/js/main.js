const searchBtnAction = document.querySelector('#search-btn');

// show product image modal
function showProductImgModal(img_path) {
    const product_img_viewer_modal_id = document.getElementById('product-img-viewer-modal');
    const product_img_viewer_modal = new bootstrap.Modal(product_img_viewer_modal_id);
    const getImgElement = product_img_viewer_modal_id.getElementsByTagName('img');
    getImgElement[0].src = img_path;
    product_img_viewer_modal.show();
}


function searchAction() {
    const searchInputValue = document.querySelector('#searchProductName').value.toUpperCase().trim();
    const all_products_table_tbody = document.querySelector('#all-products-table').querySelector('tbody');
    const products_table_tr = all_products_table_tbody.querySelectorAll('tr')

    for (let i = 0; i < products_table_tr.length; i++) {
        const products_table_td = products_table_tr[i].getElementsByTagName('td')[1]

        if (products_table_td) {

            const getProductName = products_table_td.textContent.toUpperCase()

            if (getProductName.indexOf(searchInputValue) > -1) {
                products_table_tr[i].style.display = ''
            } else {
                products_table_tr[i].style.display = 'none'
            }

        }
    }

}

searchBtnAction.addEventListener('click', event => {
    event.preventDefault();
    searchActionBar();
});