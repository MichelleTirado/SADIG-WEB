export interface correspondeceType {
    pkCorrespondenceType: number;
    correspondenceType: string;
    description: string;
    available: boolean;
    [key: string]: any; // Índice dinámico para claves adicionales
}