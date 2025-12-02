import Swal from "sweetalert2";

export const swalToast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    customClass: {
        title: "custom_toast_title",
    },
});
