import { useRouter } from "next/router";

export function useLogoutAdmin() {
  const router = useRouter();

  function logoutAdmin() {
    document.cookie = "adminAccess=; Max-Age=0; path=/; secure; samesite=strict";
    router.push("/");
  }

  return logoutAdmin;
}
