"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { updateUserAction } from "@/lib/actions/user.actions";
import { getHouseAction, updateHouseAction } from "@/lib/actions/house.actions"; // Import house actions
import { User } from "@/lib/types/auth.types";
import { House } from "@/lib/types/house"; // Import House type
import { FormInput, FormSelect } from "@/lib/components/forms"; // Import FormSelect
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BD_DIVISIONS, BD_DISTRICTS } from "@/lib/constants/bd-locations"; // Import locations

const profileSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone is required"),
    address: yup.string().optional(),
    bKashNumber: yup.string().optional(),
    bankDetails: yup.object().shape({
        accountName: yup.string().optional(),
        accountNumber: yup.string().optional(),
        bankName: yup.string().optional(),
        branchName: yup.string().optional(),
    }).optional(),
    // House Fields
    houseDivision: yup.string().optional(),
    houseDistrict: yup.string().optional(),
    housePoliceStation: yup.string().optional(),
    houseAddress: yup.string().optional(),
    houseRegistrationNumber: yup.string().optional(),
});

type ProfileFormData = {
    name: string;
    phone: string;
    address?: string;
    bKashNumber?: string;
    bankDetails?: {
        accountName?: string;
        accountNumber?: string;
        bankName?: string;
        branchName?: string;
    };
    // House Fields
    houseDivision?: string;
    houseDistrict?: string;
    housePoliceStation?: string;
    houseAddress?: string;
    houseRegistrationNumber?: string;
};

const OwnerProfile = () => {
    const router = useRouter();
    const { user, isLoading: userLoading, refetch: refreshUser } = useCurrentUser();
    const [house, setHouse] = useState<House | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [districtOptions, setDistrictOptions] = useState<{ value: string; label: string }[]>([]);

    const {
        register,
        handleSubmit,
        setValue,
        control,
        watch,
        formState: { errors },
        reset,
    } = useForm<ProfileFormData>({
        resolver: yupResolver(profileSchema) as any,
    });

    const houseDivisionValue = watch("houseDivision");

    // Fetch House Data
    useEffect(() => {
        const fetchHouse = async () => {
            const houseData = await getHouseAction();
            setHouse(houseData);
        };
        if (user) {
            fetchHouse();
        }
    }, [user]);

    // Pre-fill form
    useEffect(() => {
        if (user) {
            const formData: any = {
                name: user.name || "",
                phone: user.phone || "",
                address: user.address || "",
                bKashNumber: user.bKashNumber || "",
                bankDetails: {
                    accountName: user.bankDetails?.accountName || "",
                    accountNumber: user.bankDetails?.accountNumber || "",
                    bankName: user.bankDetails?.bankName || "",
                    branchName: user.bankDetails?.branchName || "",
                },
            };

            if (house) {
                formData.houseDivision = house.division || "";
                formData.houseDistrict = house.district || "";
                formData.housePoliceStation = house.policeStation || "";
                formData.houseAddress = house.address || "";
                formData.houseRegistrationNumber = house.registrationNumber || "";
            }
            reset(formData);
        }
    }, [user, house, reset]);

    // Handle Division Change for Cascading Districts
    useEffect(() => {
        if (houseDivisionValue) {
            const districts = BD_DISTRICTS[houseDivisionValue] || [];
            setDistrictOptions(districts.map((d) => ({ value: d, label: d })));
            // If the current district value is not in the new valid list, clear it.
            // But only if we are user interacting, checking if houseDistrict is valid for new division is complex
            // without extra state, but usually fine to leave unless user changes division.
        } else {
            setDistrictOptions([]);
        }
    }, [houseDivisionValue]);


    const onSubmit = async (data: ProfileFormData) => {
        if (!user?._id) return;
        setIsSaving(true);

        try {
            // 1. Update User Profile
            const userPayload: any = {
                name: data.name,
                phone: data.phone,
                address: data.address,
                bKashNumber: data.bKashNumber,
                bankDetails: data.bankDetails
            };
            const userResult = await updateUserAction(user._id, userPayload);
            if (!userResult.success) throw new Error(userResult.error);

            // 2. Update House Settings (if house exists or we want to support creation here? Assuming house exists based on flow)
            if (house) {
                const housePayload = {
                    division: data.houseDivision,
                    district: data.houseDistrict,
                    policeStation: data.housePoliceStation,
                    address: data.houseAddress,
                    registrationNumber: data.houseRegistrationNumber
                };
                await updateHouseAction(housePayload);
            }

            alert("Profile and House settings updated successfully!");
            refreshUser();
            // optionally refresh house
            const updatedHouse = await getHouseAction();
            setHouse(updatedHouse);

        } catch (err: any) {
            alert(err.message || "Failed to update profile.");
        } finally {
            setIsSaving(false);
        }
    };

    if (userLoading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    const divisionOptions = BD_DIVISIONS.map((d) => ({ value: d, label: d }));

    return (
        <div className="min-h-screen bg-[#F5F7F8] flex flex-col">
            {/* Header */}
            <div className="bg-white p-5 sticky top-0 z-10 shadow-sm flex items-center gap-3">
                <Link href="/owner-home" className="text-2xl no-underline">
                    ⬅️
                </Link>
                <h1 className="text-xl font-bold text-slate-800">Profile Management</h1>
            </div>

            <div className="p-5 flex-1 overflow-y-auto max-w-2xl mx-auto w-full pb-20">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Personal Info Card */}
                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            👤 Personal Information
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">Email (Read-only)</label>
                                <div className="p-3 bg-slate-50 rounded-xl text-slate-600 font-medium border border-slate-200">
                                    {user?.email}
                                </div>
                            </div>
                            <FormInput name="name" control={control} label="Name" placeholder="Your Name" error={errors.name} />
                            <FormInput name="phone" control={control} label="Phone" placeholder="Phone Number" error={errors.phone} />
                            <FormInput name="address" control={control} label="Personal Address" placeholder="Your Address" error={errors.address} />
                        </div>
                    </div>

                    {/* House Settings Card */}
                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            🏠 House Information
                        </h2>
                        <div className="space-y-4">
                            <FormSelect
                                name="houseDivision"
                                control={control}
                                label="Division"
                                placeholder="Select Division"
                                options={divisionOptions}
                                error={errors.houseDivision}
                            />
                            <FormSelect
                                name="houseDistrict"
                                control={control}
                                label="District"
                                placeholder={houseDivisionValue ? "Select District" : "Select Division first"}
                                options={districtOptions}
                                error={errors.houseDistrict}
                                disabled={!houseDivisionValue}
                            />
                            <FormInput name="housePoliceStation" control={control} label="Police Station" placeholder="Police Station" error={errors.housePoliceStation} />
                            <FormInput name="houseAddress" control={control} label="House Address" placeholder="Detailed House Address" error={errors.houseAddress} />
                            <FormInput name="houseRegistrationNumber" control={control} label="Registration Number" placeholder="House Registration No." error={errors.houseRegistrationNumber} />
                        </div>
                    </div>

                    {/* Payment Info Card */}
                    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            💳 Payment Details
                        </h2>
                        <div className="space-y-4">
                            <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 mb-4">
                                <h3 className="font-semibold text-pink-600 mb-2 flex items-center gap-2">bKash</h3>
                                <FormInput name="bKashNumber" control={control} label="bKash Number" placeholder="01XXX-XXXXXX" error={errors.bKashNumber} />
                            </div>

                            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                                <h3 className="font-semibold text-indigo-600 mb-2 flex items-center gap-2">Bank Account</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <FormInput name="bankDetails.bankName" control={control} label="Bank Name" placeholder="e.g. Dutch Bangla Bank" />
                                    <FormInput name="bankDetails.branchName" control={control} label="Branch Name" placeholder="e.g. Mirpur Branch" />
                                    <FormInput name="bankDetails.accountName" control={control} label="Account Name" placeholder="Account Holder Name" />
                                    <FormInput name="bankDetails.accountNumber" control={control} label="Account Number" placeholder="Account Number" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="w-full py-4 bg-gradient-to-r from-[#4a90e2] to-[#50e3c2] text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50"
                    >
                        {isSaving ? "Saving Changes..." : "Save Profile"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default OwnerProfile;
