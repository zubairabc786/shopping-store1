"use client";
import { clearCart, setCart } from "../../../redux/slice/cartSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../components/FormInput";
import FormSubmit from "../../../components/FormSubmit";
import { createOrder } from "../../../services/orders";
import { useRouter } from "next/navigation";
import { toast } from "../../../components/ui/use-toast";
import { updateStock } from "../../../utils/action";
import PakProvince from "../../../components/PakProvince";
import PakCity from "../../../components/PakCity";

const Addtocart = () => {
  // Cart Code Start
  const [shipPrice, setShipPrice] = useState(0);
  const [provinceValue, setProvinceValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  // console.log("ProvinceValue=", provinceValue);

  const handleProvinceValue = (value) => {
    setProvinceValue(value);
  };
  const handleCityValue = (value) => {
    setCityValue(value);
  };
  const { cart } = useSelector((state) => state.auth);
  // console.log("cart=", cart);
  const dispatch = useDispatch();

  const removeItem = (id) => {
    const updateCart = cart.filter((item) => item.product.id !== id);
    dispatch(setCart(updateCart));
  };

  const updateQuantity = (id, qty) => {
    const update = cart.map((item) => {
      if (item.product.id === id) {
        return { ...item, quantity: qty };
      }
      return item;
    });
    dispatch(setCart(update));
  };

  const incrementQuantity = (id) => {
    const update = cart.map((item) => {
      if (item.product.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    dispatch(setCart(update));
  };

  const decrementQuantity = (id) => {
    const update = cart.map((item) => {
      if (item.product.id === id) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    dispatch(setCart(update));
  };

  const totalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const ShippingPrice = (price) => {
    const update = cart.map((item) => {
      return { ...item, shipPrice: parseInt(price) };
    });
    dispatch(setCart(update));
    setShipPrice(price);
  };
  // Cart Code End

  // Form Code Start
  const router = useRouter();

  const submit = async (formData) => {
    const response = await createOrder(
      formData,
      cart,
      provinceValue,
      cityValue
    );
    if (!response.error) {
      router.push(response.result);
      dispatch(clearCart());
      await updateStock(cart);
    } else {
      toast({ title: response.error });
    }
  };
  // Form Code End

  return (
    <div className=" gap-10 grid grid-cols-1 md:grid-cols-3 grid-rows-1 py-[5%]  md:gap-8">
      {/* Shipping Address Form Code Start */}
      <div className=" px-[5%]  ">
        <h1 className="font-dancing_script text-redDark text-center font-bold text-[45px]">
          Checkout
        </h1>

        <form action={submit} className="bg-white flex flex-col mt-4 gap-4">
          <FormInput
            id="address"
            label="Address"
            placeholder="Enter address"
            type="text"
            className="h-10"
          />
          {/* PopOver Code Strart for State or Province */}
          <PakProvince handleProvinceValue={handleProvinceValue} />
          {/* PopOver Code End */}

          {/* <FormInput
            id="city"
            label="City"
            placeholder="Enter the city"
            type="text"
            className="h-10"
          /> */}
          <PakCity handleCityValue={handleCityValue} />
          <FormInput
            id="country"
            label="Country"
            placeholder="Enter country"
            type="text"
            className="h-10"
          />
          <FormInput
            id="pinCode"
            label="Pin code"
            placeholder="Enter the pin code"
            type="number"
            className="h-10"
          />
          <FormInput
            id="phoneNo"
            label="Phone number"
            placeholder="Enter Phone number"
            type="number"
            className="h-10"
          />
          <FormSubmit className="mt-3 w-full font-bold bg-redDark text-lg  text-white h-12 hover:bg-redLight">
            Place Order Now
          </FormSubmit>
        </form>
      </div>
      {/* Shipping Address Form Code End */}

      {/* Cart Code Start */}
      <div className="  flex flex-col   md:col-span-2 ">
        <h2 className="font-dancing_script text-center text-redDark  font-bold text-[45px]">
          Shopping Details
        </h2>
        <div className="  mt-4 ">
          <div className="flex  mb-1   ">
            <h3 className="font-bold  text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-bold text-center text-xs uppercase w-2/5 ">
              Quantity
            </h3>

            <h3 className="font-bold text-center text-xs uppercase w-2/5">
              Sub-Total
            </h3>
          </div>
          {cart?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center hover:bg-gray-100  py-5 gap-4"
            >
              <div className="flex  w-2/5">
                <div className="w-20">
                  <img
                    className=" aspect-square object-cover"
                    src={item?.product?.images?.[0]}
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-between ml-1 flex-grow">
                  <span className="font-bold text-sm">
                    {item?.product.name}
                  </span>
                  <span className="text-redLight text-xs">Apple</span>
                  <span
                    className="cursor-pointer font-semibold hover:text-redLight text-gray-500 text-xs"
                    onClick={() => removeItem(item.product.id)}
                  >
                    Remove
                  </span>
                </div>
              </div>
              <div className="flex justify-center items-center    w-2/5 ">
                <button
                  onClick={(e) => incrementQuantity(item.product.id)}
                  className="cursor-pointer text-white text-2xl font-bold w-8 h-8 bg-redLight rounded-full"
                >
                  +
                </button>
                <input
                  type="text"
                  className=" w-[50%] border text-center h-10"
                  value={item.quantity}
                  disabled={1}
                  onChange={(e) =>
                    updateQuantity(item.product.id, parseInt(e.target.value))
                  }
                />

                <button
                  disabled={item.quantity <= 0}
                  onClick={(e) => decrementQuantity(item.product.id)}
                  className=" cursor-pointer text-white  text-2xl font-bold w-8 h-8 bg-redLight rounded-full"
                >
                  -
                </button>
              </div>
              {/* <span className="text-center w-1/5 font-semibold text-sm">
                ${item.product.price}
              </span> */}
              <span className="text-center w-2/5 font-semibold text-sm ">
                ${item.product.price * item.quantity}
              </span>
            </div>
          ))}
        </div>
        <div className=" px-[10%]">
          <h1 className=" font-semibold text-2xl text-center">Order Summary</h1>
          <div className="flex justify-between mt-5 mb-5 p-4 border-[1px] border-gray-200">
            <span className="font-semibold text-sm uppercase ">
              Invoice Total
            </span>
            <span className="font-semibold text-sm">${totalPrice()}</span>
          </div>
          <div className="p-1  md:p-2 lg:p-2  border-[1px] border-gray-200">
            <span className="font-medium inline-block  text-sm uppercase mr-2">
              Shipping
            </span>
            <input
              type="text"
              placeholder="Enter amount for shipping"
              onChange={(e) => ShippingPrice(e.target.value || 0)}
              className="h-10"
            />
          </div>
          <div>
            <div className="flex font-semibold mt-4 justify-between p-4 border-[1px] border-gray-200 text-sm uppercase">
              <span>Net Total</span>
              <span>${totalPrice() + parseInt(shipPrice)}</span>
            </div>
            {/* <div className="bg-indigo-500 mt-5 font-semibold hover:bg-indigo-600 text-sm text-white uppercase w-[40%] p-2 rounded-md">
              <AddAddress />
            </div> */}
          </div>
        </div>
      </div>
      {/* Cart Code End */}
    </div>
  );
};

export default Addtocart;

// export function generateMetadata() {
//   return {
//     title: "Add to cart page",
//     description: "",
//   };
// }
