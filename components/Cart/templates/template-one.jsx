import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import { currencyFormat } from "@/helpers/functions";

export const TemplateOne = ({
  verifyCaptcha,
  data,
  cartCost,
  recommendedProducts,
  children,
}) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.CAPTCHAKEY}>
      <GoogleReCaptcha onVerify={verifyCaptcha} refreshReCaptcha={true} />
      <div className="mx-auto text-sm 4xl:container mt-[1rem] lg:mt-[4rem] placeholder">
        <div className="md:hidden bg-[#f5f5f6]">
          <div className="font-semibold py-3 text-xl w-[85%] mx-auto">
            Korpa
          </div>
        </div>
        <>
          <div className="grid grid-cols-5 gap-y-3 gap-x-3 max-xl:mx-auto max-xl:w-[95%] xl:mx-[5rem] ">
            <div className="col-span-5 bg-white p-1 max-xl:row-start-1">
              <div className={`flex items-center justify-between`}>
                <h2 className="text-xl font-bold ">Informacije</h2>
              </div>
              {children}
            </div>
          </div>
        </>
      </div>
    </GoogleReCaptchaProvider>
  );
};
