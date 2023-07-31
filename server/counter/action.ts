"use server";

import { mainUrl } from "@/helper/constants/env-variables";
import route from "@/helper/routes/apiRoutes";
import axios from "@/services/utils/axios";
import { cookies } from "next/headers";

export const getUserInfoBySerialCardCounter = async (id: string) => {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (token) {
        axios.defaults.headers.common["x-access-token"] = `${token}`;
        const data: any = await fetch(`${mainUrl}${route.counter.user_userInfo_by_cardId}/${id}`, {
            cache: "no-store",
            headers: {
                "x-Access-Token": token!,
            },
        });
        const userInfo = await data.json();
        return userInfo;
    }
};
