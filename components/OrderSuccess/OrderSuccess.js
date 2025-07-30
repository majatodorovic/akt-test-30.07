"use client";
import Image from "next/image";
import Image1 from "../../assets/Icons/check.png";
import Image2 from "../../assets/Icons/neuspesno.png";
import { OrderItemsInfo, OrderPaymentInfo } from "@/_components/order";
import Link from "next/link";
import { useEffect } from "react";

const OrderSuccess = ({ order, token }) => {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      ecommerce: null,
    });
    window?.dataLayer?.push({
      event: "purchase",
      ecommerce: {
        transaction_id: order?.order?.slug,
        value: order?.order?.total,
        tax: order?.order?.total_vat,
        currency: "RSD",
        shipping: order?.order?.total_delivery_amount,
        items: order?.items?.map((item) => {
          return {
            item_name: item?.basic_data?.name,
            item_id: item?.basic_data?.id_product,
            price: item?.price?.total_with_vat,
            item_brand: item?.basic_data?.brand_name,
            item_category1: item?.basic_data?.category_breadcrumbs,
            quantity: item?.price?.quantity,
            discount: item?.price?.price_discount_amount,
            item_variant: item?.basic_data?.attributes_text,
          };
        }),
      },
    });
  }, [order]);

  if (order) {
    return (
        <div
            className={`grid grid-cols-2 mt-[0rem] lg:mt-[9rem] md:w-[90%] mx-auto gap-x-10 md:divide-y md:divide-gray-200`}
        >
          <OrderPaymentInfo order={order} />
          <OrderItemsInfo order={order} />
        </div>
    );
  }
};

export default OrderSuccess;
