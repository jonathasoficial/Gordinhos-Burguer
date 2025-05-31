import Toastify from "toastify-js";

export function toastSuccess(message: string) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "#16a34a",
        },
    }).showToast();
}

export function toastError(message: string) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "#ef4444",
        },
    }).showToast();
}
