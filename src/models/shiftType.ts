export interface shiftType {
    pkShiftType: number;
    shiftType: string;
    description: string;
    available: boolean;
    [key: string]: any; // Índice dinámico para claves adicionales
}