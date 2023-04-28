import { loadStripe } from "@stripe/stripe-js"

let pro : any
export const getStripe = () => {
    if (!pro) {
        pro = loadStripe('pk_test_51MMp6hDzFn2nyuHSzacZ1xnQKYcO42OzmcT6C1i4OZ64kd8AYgLWu9U5azHDj9TVIhYgW63UJo9uWLbkWvHGz0zy00haoA6NPj')
    }
    return pro
}
