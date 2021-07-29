export default {
    addProductToCart(content, payload) {

        return new Promise((resolve, reject) => {
            // state.cartList.push(payload)
            // let oldProduct = {};
            // for (let item of state.cartList) {
            //     if (item.iid === payload.iid) {
            //         oldProduct = item
            //     }
            // }

            // if (oldProduct) {
            //     oldProduct.count += 1
            // } else {
            //     payload.count = 1
            //     state.cartList.push(payload)
            // }

            //将mutation 里复杂的操作也需要在action中拆开
            let oldProduct = content.state.cartList.find(item => item.iid == payload.iid)
            if (oldProduct) {
                // oldProduct.count += 1
                content.commit('addCounter', oldProduct)
                resolve("当前商品数量+1")

            } else {
                payload.count = 1
                // state.cartList.push(payload)
                content.commit('addToCart', payload)
                resolve("添加了新的商品")
            }
        })

    }

}