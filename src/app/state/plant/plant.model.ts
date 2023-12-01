export interface Plant {
    id?: number;
    name: string;
    harvest_date?: Date;
    min_temperature: number;
    max_temperature: number;
    min_humidity: number;
    max_humidity: number;
    min_co2: number;
    max_co2: number;
    min_air_quality: number;
    max_air_quality: number;
}