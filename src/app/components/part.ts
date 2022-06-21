import { Vendor } from "./vendor"

export interface Part {
    id: number,
    partName: string,
    description: string,
    unit: Unit,
    vendor: Vendor
}

export interface PartsReturned {
    partName: string,
    description: string,
    unitId: number,
    vendorId: number
}


export interface Unit {
    id: number,
    unitName: string
}