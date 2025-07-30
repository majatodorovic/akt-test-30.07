import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const roundCustom = (num) => {
  const decimalPart = num % 1;

  if (decimalPart < 0.01) {
    return Math.round(num);
  } else {
    return parseFloat(Number(num).toFixed(2));
  }
};

const PlusMinusInputOne = ({
  behaviours,
  quantityError,
  quantity,
  setQuantity,
  max,
}) => {
  const allow_decimals = behaviours?.display.allow_decimals;
  const default_loop_quantity = behaviours?.default_loop_quantity;

  const showError = () => {
    toast.warn(`${quantityError()}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
    return;
  };

  const intQuantity = allow_decimals ? quantity : Math.floor(quantity);
  const [tempValue, setTempValue] = useState(intQuantity);
  const [timeoutValue, setTimeoutValue] = useState(0);

  useEffect(() => {
    if (quantity === 0) return;

    if (quantity !== tempValue) {
      setTempValue(quantity);
    }
  }, [quantity]);

  const [config, setConfig] = useState();
  useEffect(() => {
    if (typeof document !== "undefined") {
      const inventory_config = localStorage.getItem(
        "configuration_inventories",
      );
      if (inventory_config) {
        let temp = JSON.parse(inventory_config);
        temp = temp?.filter(
          (item) => item?.slug === "check_requested_inventory_product_quantity",
        );
        if (temp?.length > 0) {
          setConfig(Boolean(Number(temp[0]?.value)));
        }
      }
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (tempValue === quantity) {
        return;
      }

      if (
        tempValue === 0 ||
        tempValue === "" ||
        tempValue < default_loop_quantity
      ) {
        setQuantity(default_loop_quantity);
        setTempValue(default_loop_quantity);
        return;
      }

      let clickedOnIncrease = roundCustom(tempValue) / default_loop_quantity;
      const decimalPart = clickedOnIncrease % 1;
      if (decimalPart < 0.01) {
        clickedOnIncrease = Math.round(clickedOnIncrease);
      }
      clickedOnIncrease = Math.ceil(clickedOnIncrease);

      let newValue = clickedOnIncrease * default_loop_quantity;
      if (!Number.isInteger(newValue)) {
        newValue = parseFloat(newValue).toFixed(2);
      }

      setQuantity(newValue);
      setTempValue(newValue);
    }, timeoutValue);

    return () => clearTimeout(handler);
  }, [tempValue]);

  const handleChange = (e) => {
    if (quantityError()) return showError();

    let newValue = e.target.value;
    const regex = allow_decimals ? /^\d*\.?\d*$/ : /^\d*$/;

    if (newValue > Number(max)) {
      toast.error(`Na lageru trenutno nema željena količina artikala.`, {
        position: "top-center",
      });
    } else if (regex.test(newValue)) {
      setTempValue(newValue);
      setTimeoutValue(1000);
    }
  };

  const countQuantity = ({
    defaultLoopQuantity,
    currentQuantity,
    isIncreased,
  }) => {
    if (quantityError()) return showError();

    setTimeoutValue(0);

    let clickedOnIncrease = currentQuantity / defaultLoopQuantity;
    if (clickedOnIncrease < 1) return;

    if (isIncreased) {
      clickedOnIncrease = clickedOnIncrease + 1;
    } else if (clickedOnIncrease > 1) {
      clickedOnIncrease = clickedOnIncrease - 1;
    }

    if (quantity > max && config) {
      toast.error("Nema dovoljno proizvoda na stanju!");
      return;
    }
    let newValue = clickedOnIncrease * defaultLoopQuantity;
    if (!Number.isInteger(newValue)) {
      newValue = parseFloat(newValue).toFixed(2);
    }

    if (newValue > Number(max)) {
      toast.error(`Na lageru trenutno nema željena količina artikala.`, {
        position: "top-center",
      });
    } else setTempValue(newValue);
  };
  return (
    <div className="bg-[#fbfbfb] px-3 border max-md:h-full py-0.5 border-[#eaeaea] max-md:border-[#919191]">
      <div className="flex items-center w-full">
        <span
          className="cursor-pointer text-lg select-none"
          onClick={() =>
            countQuantity({
              defaultLoopQuantity: default_loop_quantity,
              currentQuantity: quantity,
              isIncreased: false,
            })
          }
          // onClick={(e) => {
          //   onMinusHandler(e);
          //   if (props?.onClick) {
          //     props.onClick();
          //   }
          // }}
        >
          -
        </span>

        <input
          maxLength="2"
          type="number"
          value={tempValue === 0 ? 1 : tempValue}
          onChange={handleChange}
          // onChange={(e) => {
          //   onInputChange(e);
          //   if (props?.onClick) {
          //     props.onClick();
          //   }
          // }}
          className="w-12 text-center bg-[#fbfbfb] focus:border-none focus:outline-none focus:ring-0 select-none font-bold border-none"
        ></input>
        <span
          className="cursor-pointer text-lg select-none"
          onClick={() =>
            countQuantity({
              defaultLoopQuantity: default_loop_quantity,
              currentQuantity: quantity,
              isIncreased: true,
            })
          }
          // onClick={(e) => {
          //   onPlusHandler(e);
          //   if (props?.onClick) {
          //     props.onClick();
          //   }
          // }}
        >
          +{" "}
        </span>
      </div>
    </div>
  );
};

export default PlusMinusInputOne;
