import axios from "axios";
import { setIgsasToken, logout } from "../features/global/globalSlice";

const BASE_URL = "/igmo-api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 300000, // 60 saniye timeout
});

// Token alma için ayrı axios instance
const authApi = axios.create({
  baseURL: "/auth-api",
  headers: { "Content-Type": "application/json" },
  timeout: 300000,
});

// Store'a erişim için yardımcı fonksiyon
let storeRef = null;
export const injectStore = (_store) => {
  storeRef = _store;
};

const validateToken = async (token) => {
  try {
    const response = await authApi.get(`/Account/ValidateToken`, {
      params: { token },
    });
    return response.data.isSuccess;
  } catch (error) {
    console.error("⚠️ Token doğrulama hatası:", error);
    return false;
  }
};

const fetchNewToken = async () => {
  try {
    console.log("🔄 Yeni token alınıyor...");
    const response = await authApi.get(
      `/Account/authenticate?username=IGMO_2802_User&password=01@b1d!de*7`
    );

    if (response.status !== 200) {
      console.error(`❌ API Hata Döndürdü: ${response.status}`);
      storeRef.dispatch(logout());
      return null;
    }

    const newToken = response.data;

    if (newToken) {
      console.log("✅ Yeni Token Alındı:", newToken);
      if (storeRef) {
        storeRef.dispatch(setIgsasToken(newToken));
      }
      return newToken;
    } else {
      console.error("❌ Token yenileme başarısız!");
      if (storeRef) {
        storeRef.dispatch(logout());
      }
      return null;
    }
  } catch (error) {
    console.error("❌ Token alma hatası:", error);
    if (storeRef) {
      storeRef.dispatch(logout());
    }
    return null;
  }
};

// *REDUX TOOLKIT QUERY İÇİN AXIOS TABANLI CUSTOM BASE QUERY*
export const axiosBaseQuery = async ({ url, method, data, params }) => {
  if (!storeRef) {
    console.error("⚠️ Store henüz enjekte edilmedi!");
    return { error: { status: 500, data: "Store enjekte edilmedi" } };
  }

  let token = storeRef.getState().global.igsasToken;

  if (!token || !(await validateToken(token))) {
    token = await fetchNewToken();
  }

  if (!token) {
    console.error("⚠️ Token yok, çıkış yapılıyor.");
    return { error: { status: 401, data: "Token yok" } };
  }

  try {
    const config = {
      url: url,
      method,
      data,
      params,
      headers: { Authorization: `Bearer ${token}` },
    };

    const result = await api(config);
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError;
    console.error("❌ API Hatası:", {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
      code: err.code,
    });

    if (err.response?.status === 401) {
      console.warn(
        "⚠️ 401 hatası alındı, tekrar token yenilemeye çalışılmayacak."
      );
      if (storeRef) storeRef.dispatch(logout());
      return {
        error: { status: 401, data: "Oturum süresi doldu, çıkış yapıldı." },
      };
    }

    return {
      error: { status: err.response?.status, data: err.response?.data },
    };
  }
};
