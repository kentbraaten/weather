import { ɵMetadataOverrider } from '@angular/core/testing';
import { getToken } from './token';

const nooaBaseAddress = "https://www.ncdc.noaa.gov/cdo-web/api/v2/";
const locationEndpoint = "locations";
const dataEndpoint="data";
const dataSetRange = "startdate=2018-01-01&enddate=1900-01-01"

export var cityLocationsFunc = (limit: number) => {
    return (page: number ) : string => {
        const args = `limit=${limit}&offset=${(page - 1) * limit}&locationcategoryid=CITY&startdate=2018-01-01&enddate=1950-01-01&datasetid=GSOY&datacoverage=1`;
        return `${nooaBaseAddress}${locationEndpoint}?${args}`;
    }
}

//https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datatatypeid=TMAX, TMIN&limit=100&units=standard&startdate=2010-01-01&enddate=2018-01-01&locationid=CITY:US270013
export var averageTempDataFunc = (locationId: string, startDate: string, endDate:string) => {
    const args = `datasetid=GSOY&datatypeid=TMAX&limit=1000&units=standard&startdate=${startDate}&enddate=${endDate}&locationid=${locationId}`
    return `${nooaBaseAddress}${dataEndpoint}?${args}`
}

export const requestHeader = () => {
    return {
        headers: {
            token: getToken()
          }
    }
}