import { useCartContext } from "./cartContext";
import { post, deleteMethod } from "./api";
import { toast } from "react-toastify";

/**
 * Hook wrapper for global add to cart so _context can be used
 */
export const useGlobalAddToCart = (type = false) => {
  const [, mutateCart] = useCartContext();
  const addToCart = (productId, quantity, fromCart = false) => {
    post("/cart", {
      id_product: productId,
      quantity,
      id_product_parent: null,
      description: null,
      status: null,
      quantity_calc_type: type ? "replace" : "calc",
    })
      .then((response) => {
        if (response.success) {
          toast.success(response?.payload?.message ?? "Success", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.warn(response?.payload?.message ?? "Error", {
            position: toast.POSITION.TOP_CENTER,
          });
        }

        mutateCart();
        return response;
      })
      .catch((error) => {
        return error;
      });
  };

  return addToCart;
};

/**
 * Hook wrapper for global add to cart so _context can be used
 */
export const useGlobalRemoveFromCart = () => {
  const [, mutateCart] = useCartContext();

  const removeFromCart = (productId) => {
    post("/cart", {
      id_product: productId,
      quantity: 0,
      id_product_parent: null,
      description: null,
      status: null,
    })
      .then((response) => {
        mutateCart();
      })
      .catch((error) => console.warn(error));
  };

  return removeFromCart;
};

/**
 * Hook wrapper for global add to wishlist so _context can be used
 */
export const useGlobalAddToWishList = () => {
  const [, , , mutateWishList] = useCartContext();

  const addToWishList = (productId) => {
    post("/wishlist", {
      id: null,
      id_product: productId,
      quantity: 1,
      id_product_parent: null,
      description: null,
      status: null,
    }).then((response) => {
      mutateWishList();
    });
  };

  return addToWishList;
};

/**
 * Hook wrapper for global remove from wishlist so _context can be used
 */
export const useGlobalRemoveFromWishlist = () => {
  const [, , , mutateWishList] = useCartContext();

  const removeFromWishList = (id) => {
    deleteMethod(`/wishlist/${id}`)
      .then((response) => {
        mutateWishList();
      })
      .catch((error) => console.warn(error));
  };

  return removeFromWishList;
};
