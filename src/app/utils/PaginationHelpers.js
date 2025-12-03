export const getPageNumber = (url) => {
    if (url) {
        const urlObj = new URL(url);  // Create a URL object from the string
        const params = new URLSearchParams(urlObj.search);  // Get the query parameters

        const page = params.get('page');  // Extract the value of 'page' parameter
        if (page) {
            return page;  // Return the page number (string)

        }
        else {
            return 1
        }


    }
    else {
        return null
    }

};



export const getTotalPagesCount = (TotalData, ItemsPerpage) => {
    return Math.ceil(TotalData / ItemsPerpage)
}