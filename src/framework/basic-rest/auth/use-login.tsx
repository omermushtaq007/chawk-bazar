import { useUI } from "@contexts/ui.context";
import { NODE_API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/node-http";
import Cookies from "js-cookie";
import { useMutation } from "react-query";

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}
async function login(input: LoginInputType) {
  const response  = http.post(NODE_API_ENDPOINTS.LOGIN, input);
  if (await response) {
      const { data } = await response;
      return data;
  } else {
    throw new Error("Login failed");
  }
}
export const useLoginMutation = () => {
  const { authorize, closeModal, setErrorMessage } = useUI();
  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: (data) => {
      Cookies.set("auth_token", data.user_token.token );
      authorize();
      closeModal();
      setErrorMessage("");
    },
    onError: (data) => {
      console.log(data, "login error response");
      setErrorMessage("Incorrect email or password");
    },
  });
};
