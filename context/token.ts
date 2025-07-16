// store/tokenStore.ts
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { deleteCookie, getCookie } from "cookies-next";
import { TOKEN_COOKIE_NAME } from "@/middleware";

type TokenState = {
  token: string;
  UserId: string;
  Id: string;
  SchoolId: string;
  role: string;
  SchoolName: string;
  refresh: () => void;
  logout: () => void;
};

const getInitialToken = () =>
  typeof window !== "undefined"
    ? getCookie(TOKEN_COOKIE_NAME)?.toString() ?? ""
    : "";

export const useTokenStore = create<TokenState>()(
  persist(
    (set, get, api) => ({
      // <-- note we now have `api` available to call persist methods
      token: getInitialToken(),
      Id: "",
      UserId: "",
      role: "",
      SchoolName: "",
      SchoolId: "",

      // re‑read the cookie and decode
      refresh: () => {
        const cookie = getCookie(TOKEN_COOKIE_NAME)?.toString();
        if (!cookie) {
          set({
            token: "",
            Id: "",
            UserId: "",
            role: "",
            SchoolName: "",
            SchoolId: "",
          });
          return;
        }
        try {
          const { token, ...data } = jwtDecode<TokenState>(cookie);
          set({ token: cookie, ...data });
        } catch {
          // invalid JWT → clear all fields
          set({
            token: "",
            SchoolName: "",
            SchoolId: "",
            role: "",
            UserId: "",
            Id: "",
          });
        }
      },

      // wipe cookie + clear persisted storage + reset in-memory state
      logout: () => {
        // 1) Remove the cookie
        deleteCookie(TOKEN_COOKIE_NAME);

        // 2) Clear the persisted storage entry
        api.persist.clearStorage();

        // 3) Reset state to initial empty values
        set({
          token: "",
          SchoolName: "",
          SchoolId: "",
          role: "",
          UserId: "",
          Id: "",
        });
      },
    }),
    {
      name: "code-waves-token-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state) state.refresh();
      },
    }
  )
);
