export interface Plant {
    id?: number;
    name: string;
    harvest_date?: Date;
    temperature: number;
    humidity: number;
    co2: number;
    airQuality: number;
}