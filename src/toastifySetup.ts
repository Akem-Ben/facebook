import { toast } from 'react-toastify';

export const showToast = (message:any) => {
    return toast(message)
}

export const showSuccessToast = (message:any) => {
    return toast.success(message)
}

export const showErrorToast = (message:any) => {
    return toast.error(message)
}

export { toast };