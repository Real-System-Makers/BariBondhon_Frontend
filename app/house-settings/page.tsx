"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateHouseAction } from "@/lib/actions/house.actions";
import {
  houseSettingsSchema,
  HouseSettingsFormData,
} from "@/lib/schemas/house.schemas";
import { FormInput, FormSelect, FormCardSelect } from "@/lib/components/forms";
import { BD_DIVISIONS, BD_DISTRICTS } from "@/lib/constants/bd-locations";
import { BillingSystem } from "@/lib/types/house";
import Image from "next/image";
import Link from "next/link";

const HouseSettings = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [districtOptions, setDistrictOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<HouseSettingsFormData>({
    resolver: yupResolver(houseSettingsSchema),
    defaultValues: {
      division: "",
      district: "",
      policeStation: "",
      address: "",
      billingSystem: BillingSystem.POSTPAID,
      registrationNumber: "",
    },
  });

  const divisionValue = watch("division");

  useEffect(() => {
    if (divisionValue && divisionValue !== selectedDivision) {
      setSelectedDivision(divisionValue);
      const districts = BD_DISTRICTS[divisionValue] || [];
      setDistrictOptions(
        districts.map((district) => ({ value: district, label: district }))
      );
      setValue("district", "");
    } else if (!divisionValue) {
      setSelectedDivision("");
      setDistrictOptions([]);
      setValue("district", "");
    }
  }, [divisionValue, selectedDivision, setValue]);

  const onSubmit = async (data: HouseSettingsFormData) => {
    setError("");

    try {
      await updateHouseAction(data);
      router.push("/owner-home");
    } catch (err: any) {
      setError(
        err.message || "Failed to save house settings. Please try again."
      );
    }
  };

  const divisionOptions = BD_DIVISIONS.map((division) => ({
    value: division,
    label: division,
  }));

  return (
    <div className="p-5">
      <div className="absolute w-[200px] h-[200px] top-[-50px] left-[-50px] rounded-full opacity-50 blur-[80px] transition-all duration-400 z-0 bg-primary-start"></div>
      <div className="absolute w-[250px] h-[250px] bottom-[-80px] right-[-80px] rounded-full opacity-50 blur-[80px] transition-all duration-400 z-0 bg-primary-end"></div>

      <div className="h-full flex flex-col relative z-10">
        <div className="text-center mb-10 animate-[fadeInUp_0.6s_ease_forwards]">
          <Link href="/">
            <div
              className="w-[70px] h-[70px] rounded-[20px] mx-auto mb-5 flex items-center justify-center text-[28px] font-bold text-white shadow-primary cursor-pointer transition-opacity hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #4a90e2, #50e3c2)",
              }}
            >
              <Image src="/logo.png" alt="BariBondhon" width={70} height={70} />
            </div>
          </Link>
          <h1 className="text-[28px] font-bold text-slate-800 mb-2">
            House Settings
          </h1>
          <p className="text-base text-slate-500">
            Complete your house information
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col animate-[fadeInUp_0.6s_ease_forwards_0.1s] opacity-0 [animation-fill-mode:forwards]"
        >
          {error && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <FormSelect
            name="division"
            control={control}
            placeholder="Select Division"
            disabled={isSubmitting}
            error={errors.division}
            options={divisionOptions}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            }
          />

          <FormSelect
            name="district"
            control={control}
            placeholder={
              selectedDivision ? "Select District" : "Select division first"
            }
            disabled={isSubmitting || !selectedDivision}
            error={errors.district}
            options={districtOptions}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            }
          />

          <FormInput
            name="policeStation"
            control={control}
            type="text"
            placeholder="Police Station"
            disabled={isSubmitting}
            error={errors.policeStation}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
              </svg>
            }
          />

          <FormInput
            name="address"
            control={control}
            type="text"
            placeholder="Address"
            disabled={isSubmitting}
            error={errors.address}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            }
          />

          <FormCardSelect
            name="billingSystem"
            control={control}
            disabled={isSubmitting}
            error={errors.billingSystem}
            options={[
              {
                value: BillingSystem.PREPAID,
                label: "Prepaid",
                description: "Pay before using utilities",
                icon: "💳",
              },
              {
                value: BillingSystem.POSTPAID,
                label: "Postpaid",
                description: "Pay after using utilities",
                icon: "📅",
              },
            ]}
          />

          <FormInput
            name="registrationNumber"
            control={control}
            type="text"
            placeholder="Registration Number"
            disabled={isSubmitting}
            error={errors.registrationNumber}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />
              </svg>
            }
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 border-none rounded-2xl text-white text-lg font-semibold cursor-pointer transition-all duration-300 mt-5 hover:-translate-y-0.5 animate-[fadeInUp_0.6s_ease_forwards_0.3s] opacity-0 [animation-fill-mode:forwards] shadow-primary-md hover:shadow-primary-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #4a90e2, #50e3c2)",
            }}
          >
            {isSubmitting ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HouseSettings;
