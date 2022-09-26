export interface Inventario {
    _id:             string;
    serial:          string;
    model:           string;
    description:     string;
    image:           string;
    purchaseDate:    Date;
    price:           number;
    user:            Features;
    brand:           Features;
    equipmentStatus: Features;
    equipmentType:   Features;
}

export interface Features {
    _id:       string;
    name:      string;
    status:    Status;
    createdAt: Date;
    updatedAt: Date;
    email?:    string;
}

export enum Status {
    Active = "Active",
    Inactive = "Inactive",
}
