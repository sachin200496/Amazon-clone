

export const createProduct = async (product) =>{
    console.log("CReate product", product);

    return product;
}

export const updateProduct = async (id, product) =>{
 console.log("update product", id, product)
 return product
}

export const getProductById = async (id) =>{
     
    return {
        title: "phone case",
        price: 150,
        stock: 20,
        category: "accessories",
        image:'',
        description:"Phone case"
    }
}