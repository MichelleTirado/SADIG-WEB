import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'  // <-- IMPORTANTE
})

export class SweetDialogs {

    confirmDialog(title: string, message: string, onConfirm: () => void) {
        Swal.fire({
            title: title,
            text: message,
            icon: "question",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Confirmar",
            buttonsStyling: false,
            customClass: {
                confirmButton: "gobBtn altern",
                cancelButton: "gobBtn base",
                actions: "sweetActions"
            }
        }).then((result) => {
            if (result.isConfirmed) {
                onConfirm();
            }
        });
    }

    promptDialog(title: string, inputLabel: string, inputType: "text" | "number" | "email" | "password" = "text"): Promise<string | null> {
        return Swal.fire({
            title: title,
            input: inputType,
            inputLabel: inputLabel,
            inputPlaceholder: 'Captura tu ' + inputLabel,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Aceptar",
            buttonsStyling: false,
            customClass: {
                confirmButton: "gobBtn altern",
                cancelButton: "gobBtn base",
                actions: "sweetActions"
            }
        }).then((result) => {
            if (result.isConfirmed) {
                return result.value;
            }
            return null;
        });
    }

    alertDialog(title: string, message: string, icon: "success" | "error" | "warning" | "info") {
        Swal.fire({
            title: title,
            text: message,
            icon: icon,
            showConfirmButton: false,
            timer: 2000,
            buttonsStyling: false,
            customClass: {
                confirmButton: "goBtn altern",
                actions: "sweetActions"
            }
        });
    }
}