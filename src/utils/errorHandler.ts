import { error } from "console";
import { toast } from "sonner";


 export const handleErrors = (err: any) => {
    const response = err.response;
    switch (response?.status) {
        case 500:
             if(response.data.message) {
            toast.error(response.data.message);
        }else{
            toast.error(response.data.error);

        }
            break;

        case 400:
        case 401:
        case 404:
        case 403:
        case 422:
            if (response.data.errors) {
                Object.keys(response.data.errors).forEach((field) => {
                    const errors = response.data.errors[field];
                    errors.forEach((errorMessage: any) => {
                        toast.error(`${field}: ${errorMessage}`);
                    });
                });
            } else if(response.data.message) {
                toast.error(response.data.message);
            }else{
                toast.error(response.data.error);

            }
            break;

        default:
            toast.error(err.message);
            break;
    }
};
