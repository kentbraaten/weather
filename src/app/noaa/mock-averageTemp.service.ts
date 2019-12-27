import { Observable, of } from 'rxjs';
import { AverageTempData } from './noaa.types';

const averageTemps = {
    metadata: {
        resultset: {
            offset: 1,
            count: 75,
            limit: 1000
        }
    },
    results: [
        {
            date: "2000-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00211448",
            attributes: "0",
            value: 54.1
        },
        {
            date: "2000-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00214884",
            attributes: "0",
            value: 58.1
        },
        {
            date: "2000-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00215838",
            attributes: "0",
            value: 55.3
        },
        {
            date: "2000-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00218450",
            attributes: "0",
            value: 56.5
        },
        {
            date: "2000-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00014922",
            attributes: "0",
            value: 55.1
        },
        {
            date: "2000-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00094960",
            attributes: "W",
            value: 54.8
        },
        {
            date: "2001-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00211448",
            attributes: "0",
            value: 55.3
        },
        {
            date: "2001-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00218450",
            attributes: "0",
            value: 57.5
        },
        {
            date: "2001-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00014922",
            attributes: "0",
            value: 56.2
        },
        {
            date: "2001-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00094960",
            attributes: "W",
            value: 55.6
        },
        {
            date: "2001-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00094963",
            attributes: "W",
            value: 56.1
        },
        {
            date: "2002-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00211448",
            attributes: "0",
            value: 54.3
        },
        {
            date: "2002-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00215838",
            attributes: "0",
            value: 54.9
        },
        {
            date: "2002-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00218450",
            attributes: "0",
            value: 56.3
        },
        {
            date: "2002-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00014922",
            attributes: "0",
            value: 55.1
        },
        {
            date: "2002-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00014927",
            attributes: "W",
            value: 55.2
        },
        {
            date: "2002-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00094960",
            attributes: "W",
            value: 54.4
        },
        {
            date: "2002-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00094963",
            attributes: "W",
            value: 55.5
        },
        {
            date: "2003-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00211448",
            attributes: "0",
            value: 54.4
        },
        {
            date: "2003-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00214884",
            attributes: "0",
            value: 57.2
        },
        {
            date: "2003-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00218450",
            attributes: "0",
            value: 56.4
        },
        {
            date: "2003-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00014922",
            attributes: "0",
            value: 55.1
        },
        {
            date: "2003-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00014927",
            attributes: "W",
            value: 55.8
        },
        {
            date: "2003-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00094960",
            attributes: "W",
            value: 54.9
        },
        {
            date: "2003-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00094963",
            attributes: "W",
            value: 55.6
        },
        {
            date: "2004-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00211448",
            attributes: "0",
            value: 54.0
        },
        {
            date: "2004-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00215838",
            attributes: "0",
            value: 55.0
        },
        {
            date: "2004-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00218450",
            attributes: "0",
            value: 56.1
        },
        {
            date: "2004-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00014922",
            attributes: "0",
            value: 55.1
        },
        {
            date: "2004-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00014927",
            attributes: "W",
            value: 55.8
        },
        {
            date: "2004-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00094960",
            attributes: "W",
            value: 54.6
        },
        {
            date: "2004-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00094963",
            attributes: "W",
            value: 55.1
        },
        {
            date: "2005-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00211448",
            attributes: "0",
            value: 55.8
        },
        {
            date: "2005-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00214884",
            attributes: "0",
            value: 58.4
        },
        {
            date: "2005-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00215838",
            attributes: "0",
            value: 56.4
        },
        {
            date: "2005-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00218450",
            attributes: "0",
            value: 57.6
        },
        {
            date: "2005-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00014922",
            attributes: "0",
            value: 56.7
        },
        {
            date: "2005-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00014927",
            attributes: "B",
            value: 56.9
        },
        {
            date: "2005-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00094960",
            attributes: "B",
            value: 56.2
        },
        {
            date: "2005-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00094963",
            attributes: "B",
            value: 57.3
        },
        {
            date: "2006-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00211448",
            attributes: "0",
            value: 56.5
        },
        {
            date: "2006-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00214884",
            attributes: "0",
            value: 58.9
        },
        {
            date: "2006-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00215838",
            attributes: "0",
            value: 57.2
        },
        {
            date: "2006-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00218450",
            attributes: "0",
            value: 58.5
        },
        {
            date: "2006-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00014922",
            attributes: "0",
            value: 57.8
        },
        {
            date: "2006-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00014927",
            attributes: "M",
            value: 58.2
        },
        {
            date: "2006-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00094960",
            attributes: "M",
            value: 57.1
        },
        {
            date: "2006-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00094963",
            attributes: "M",
            value: 57.1
        },
        {
            date: "2007-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00211448",
            attributes: "0",
            value: 55.0
        },
        {
            date: "2007-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00214884",
            attributes: "0",
            value: 57.7
        },
        {
            date: "2007-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00215838",
            attributes: "0",
            value: 56.0
        },
        {
            date: "2007-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00217379",
            attributes: "0",
            value: 55.3
        },
        {
            date: "2007-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00218450",
            attributes: "0",
            value: 57.3
        },
        {
            date: "2007-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00014922",
            attributes: "0",
            value: 56.5
        },
        {
            date: "2008-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00211448",
            attributes: "0",
            value: 52.4
        },
        {
            date: "2008-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00214884",
            attributes: "0",
            value: 55.0
        },
        {
            date: "2008-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00215838",
            attributes: "0",
            value: 53.3
        },
        {
            date: "2008-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00217379",
            attributes: "0",
            value: 52.6
        },
        {
            date: "2008-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00218450",
            attributes: "0",
            value: 54.5
        },
        {
            date: "2008-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00014922",
            attributes: "0",
            value: 53.6
        },
        {
            date: "2009-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00211448",
            attributes: "0",
            value: 52.9
        },
        {
            date: "2009-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00214884",
            attributes: "0",
            value: 54.7
        },
        {
            date: "2009-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00215838",
            attributes: "0",
            value: 53.7
        },
        {
            date: "2009-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00014922",
            attributes: "0",
            value: 54.1
        },
        {
            date: "2009-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00014927",
            attributes: "X",
            value: 54.4
        },
        {
            date: "2009-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00094960",
            attributes: "0",
            value: 54.1
        },
        {
            date: "2009-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00094963",
            attributes: "0",
            value: 53.9
        },
        {
            date: "2010-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00211448",
            attributes: "0",
            value: 55.2
        },
        {
            date: "2010-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00215838",
            attributes: "0",
            value: 56.2
        },
        {
            date: "2010-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00218450",
            attributes: "0",
            value: 54.8
        },
        {
            date: "2010-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USC00218477",
            attributes: "0",
            value: 57.8
        },
        {
            date: "2010-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00014922",
            attributes: "0",
            value: 56.7
        },
        {
            date: "2010-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00014927",
            attributes: "X",
            value: 56.9
        },
        {
            date: "2010-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00094960",
            attributes: "0",
            value: 56.9
        },
        {
            date: "2010-01-01T00:00:00",
            datatype: "TMAX",
            station: "GHCND:USW00094963",
            attributes: "0",
            value: 56.6
        }
    ]
}

export class MockAverageTempService {
    constructor() { }
  
    getData(): Observable<AverageTempData[]> {
      return of(averageTemps.results);
    }
}