export interface User {
    employeeId: number,
    employeePrefix: string,
    employeeName: string,
    employeeCode: number,
    employeeGender: string,
    employeeCurp: string,
    employeeEmail: string,
    employeePicture: string,
    direction: string,
    area: string,
    NIVE_NIVEL: number,
    employeePosition: string,
    employeeRegime: string,
    available: boolean,
    [key: string]: any; // Índice dinámico para claves adicionales
}