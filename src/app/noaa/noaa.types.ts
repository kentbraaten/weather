export interface Location {
    mindate: string;
    maxdate: string;
    name: string;
    datacoverage?: number;
    id: string;
}

export interface AverageTempData {
    date: string;
    datatype: string;
    station: string;
    attributes: string;
    value: number;
}

export interface DateRange {
    startDate: string;
    endDate: string;
}

export interface ResultSet {
    offset: number;
    count: number;
    limit: number;
}

export interface MetaData {
    resultset: ResultSet;
}


export interface ServiceReturnValue {
    metadata: MetaData;
    results: Location[];
}

export interface AverageTempServiceReturnValue {
    metadata: MetaData;
    results: AverageTempData[];
}