const searchBtnAction = document.querySelector('#search-btn')


function searchActionBar() {
    const searchBarValue = document.querySelector('#searchProductName').value.toUpperCase()
    const all_products_table_tbody = document.querySelector('#all-products-table').querySelector('tbody')
    const products_table_tr = all_products_table_tbody.querySelectorAll('tr')

    for (let i = 0; i < products_table_tr.length; i++) {
        const products_table_td = products_table_tr[i].getElementsByTagName('td')[1]

        if (products_table_td) {

            const getProductName = products_table_td.textContent.toUpperCase()

            if (getProductName.indexOf(searchBarValue) > -1) {
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
})