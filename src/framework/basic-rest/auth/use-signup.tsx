import { useUI } from "@contexts/ui.context";
import { NODE_API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/node-http";
import Cookies from "js-cookie";
import { useMutation } from "react-query";

export interface SignUpInputType {
  email: string;
  password: string;
  verifyPassword: string;   
  fullname: string;
}
async function signUp(input: SignUpInputType) {
  const response =  http.post(NODE_API_ENDPOINTS.REGISTER, input);
  if (await response) {
    const { data } = await response;
    return data;
  } else {
    throw new Error("Sign up failed");
  }
}
export const useSignUpMutation = () => {
  const { authorize, closeModal } = useUI();
  return useMutation((input: SignUpInputType) => signUp(input), {
    onSuccess: (data) => {
      Cookies.set("auth_token", data.token);
      authorize();
      closeModal();
    },
    onError: (data) => {
      console.log(data, "login error response");
    },
  });
};
