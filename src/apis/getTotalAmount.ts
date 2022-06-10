import API from "./API";

export default function getTotalAmount(order: { [key: string]: any }) {
    var totalAmount = 0;
    const api = new API();
    Object.keys(order).forEach((item) => {
        totalAmount += api.getPrice(item) * order[item];
    });
    return totalAmount;
}
