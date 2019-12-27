import { HttpClient } from '@angular/common/http';
import { Observable, of, merge, interval } from 'rxjs';
import { ServiceReturnValue, Location } from './noaa.types';

const locations =
    {
        metadata: {
            resultset: {
                offset: 1,
                count: 772,
                limit: 1000
            }
        },
        results: [
            {
                mindate: "1877-04-07",
               maxdate: "2019-11-16",
                name: "Algiers, AG",
                datacoverage: 1,
                id: "CITY:AG000001"
            },
            {
                mindate: "1880-05-18",
               maxdate: "2019-11-16",
                name: "Constantine, AG",
                datacoverage: 0.7634,
                id: "CITY:AG000006"
            },
            {
                mindate: "1888-01-01",
               maxdate: "2019-11-16",
                name: "Laghouat, AG",
                datacoverage: 0.4398,
                id: "CITY:AG000008"
            },
            {
                mindate: "1885-06-01",
               maxdate: "2019-11-16",
                name: "Yerevan, AM",
                datacoverage: 1,
                id: "CITY:AM000001"
            },
            {
                mindate: "1839-01-01",
               maxdate: "2019-11-16",
                name: "Adelaide, AS",
                datacoverage: 1,
                id: "CITY:AS000001"
            },
            {
                mindate: "1841-07-01",
               maxdate: "2019-11-16",
                name: "Brisbane, AS",
                datacoverage: 1,
                id: "CITY:AS000002"
            },
            {
                mindate: "1882-06-01",
               maxdate: "2019-11-16",
                name: "Cairns, AS",
                datacoverage: 1,
                id: "CITY:AS000003"
            },
            {
                mindate: "1870-10-01",
               maxdate: "2019-11-16",
                name: "Canberra, AS",
                datacoverage: 1,
                id: "CITY:AS000004"
            },
            {
                mindate: "1869-03-01",
               maxdate: "2019-11-16",
                name: "Darwin, AS",
                datacoverage: 1,
                id: "CITY:AS000005"
            },
            {
                mindate: "1855-04-01",
               maxdate: "2019-11-16",
                name: "Melbourne, AS",
                datacoverage: 1,
                id: "CITY:AS000006"
            },
            {
                mindate: "1862-01-01",
               maxdate: "2019-11-16",
                name: "Newcastle, AS",
                datacoverage: 1,
                id: "CITY:AS000007"
            },
            {
                mindate: "1852-12-01",
               maxdate: "2019-11-16",
                name: "Perth, AS",
                datacoverage: 1,
                id: "CITY:AS000008"
            },
            {
                mindate: "1872-09-01",
               maxdate: "2019-11-16",
                name: "Rockhampton, AS",
                datacoverage: 1,
                id: "CITY:AS000009"
            },
            {
                mindate: "1832-01-01",
               maxdate: "2019-11-16",
                name: "Sydney, AS",
                datacoverage: 1,
                id: "CITY:AS000010"
            },
            {
                mindate: "1873-07-01",
               maxdate: "2019-11-16",
                name: "Townsville, AS",
                datacoverage: 1,
                id: "CITY:AS000011"
            },
            {
                mindate: "1894-01-01",
               maxdate: "2019-11-16",
                name: "Graz, AU",
                datacoverage: 0.995,
                id: "CITY:AU000001"
            },
            {
                mindate: "1877-01-01",
               maxdate: "2019-11-16",
                name: "Innsbruck, AU",
                datacoverage: 0.9963,
                id: "CITY:AU000002"
            },
            {
                mindate: "1874-01-01",
               maxdate: "2019-11-16",
                name: "Salzburg, AU",
                datacoverage: 1,
                id: "CITY:AU000005"
            },
            {
                mindate: "1855-02-01",
               maxdate: "2019-11-16",
                name: "Vienna, AU",
                datacoverage: 1,
                id: "CITY:AU000006"
            },
            {
                mindate: "1833-01-01",
               maxdate: "2019-11-16",
                name: "Brussels, BE",
                datacoverage: 0.9819,
                id: "CITY:BE000002"
            },
            {
                mindate: "1897-10-01",
               maxdate: "2019-11-16",
                name: "Sarajevo, BK",
                datacoverage: 1,
                id: "CITY:BK000001"
            },
            {
                mindate: "1891-04-01",
               maxdate: "2019-11-16",
                name: "Minsk, BO",
                datacoverage: 0.8915,
                id: "CITY:BO000005"
            },
            {
                mindate: "1881-10-26",
               maxdate: "2019-11-18",
                name: "Calgary, CA",
                datacoverage: 1,
                id: "CITY:CA000001"
            },
            {
                mindate: "1880-07-11",
               maxdate: "2019-11-18",
                name: "Edmonton, CA",
                datacoverage: 1,
                id: "CITY:CA000002"
            },
            {
                mindate: "1871-12-01",
               maxdate: "2019-11-18",
                name: "Fredericton, CA",
                datacoverage: 1,
                id: "CITY:CA000003"
            },
            {
                mindate: "1871-04-01",
               maxdate: "2019-11-18",
                name: "Halifax, CA",
                datacoverage: 1,
                id: "CITY:CA000004"
            },
            {
                mindate: "1871-07-01",
               maxdate: "2019-11-18",
                name: "Montreal, CA",
                datacoverage: 1,
                id: "CITY:CA000005"
            },
            {
                mindate: "1870-04-01",
               maxdate: "2019-11-18",
                name: "Ottawa, CA",
                datacoverage: 1,
                id: "CITY:CA000006"
            },
            {
                mindate: "1872-06-01",
               maxdate: "2019-11-17",
                name: "Quebec, CA",
                datacoverage: 1,
                id: "CITY:CA000007"
            },
            {
                mindate: "1883-12-01",
               maxdate: "2019-11-18",
                name: "Regina, CA",
                datacoverage: 1,
                id: "CITY:CA000008"
            },
            {
                mindate: "1871-01-01",
               maxdate: "2019-11-17",
                name: "Saint John, CA",
                datacoverage: 1,
                id: "CITY:CA000009"
            },
            {
                mindate: "1892-03-01",
               maxdate: "2019-11-18",
                name: "Saskatoon, CA",
                datacoverage: 1,
                id: "CITY:CA000010"
            },
            {
                mindate: "1840-03-01",
               maxdate: "2019-11-18",
                name: "Toronto, CA",
                datacoverage: 1,
                id: "CITY:CA000011"
            },
            {
                mindate: "1874-09-01",
               maxdate: "2019-11-18",
                name: "Vancouver, CA",
                datacoverage: 1,
                id: "CITY:CA000012"
            },
            {
                mindate: "1872-01-01",
               maxdate: "2019-11-18",
                name: "Victoria, CA",
                datacoverage: 1,
                id: "CITY:CA000013"
            },
            {
                mindate: "1872-03-01",
               maxdate: "2019-11-18",
                name: "Winnipeg, CA",
                datacoverage: 1,
                id: "CITY:CA000014"
            },
            {
                mindate: "1873-12-31",
               maxdate: "2019-09-30",
                name: "Copenhagen, DA",
                datacoverage: 1,
                id: "CITY:DA000003"
            },
            {
                mindate: "1867-01-01",
               maxdate: "2019-11-16",
                name: "Dublin, EI",
                datacoverage: 1,
                id: "CITY:EI000002"
            },
            {
                mindate: "1870-06-30",
               maxdate: "2019-11-16",
                name: "Tallinn, EN",
                datacoverage: 0.9931,
                id: "CITY:EN000001"
            },
            {
                mindate: "1775-01-01",
               maxdate: "2019-11-16",
                name: "Prague, EZ",
                datacoverage: 1,
                id: "CITY:EZ000006"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-11-16",
                name: "Marseille, FR",
                datacoverage: 1,
                id: "CITY:FR000013"
            },
            {
                mindate: "1892-02-29",
               maxdate: "2019-11-16",
                name: "Paris, FR",
                datacoverage: 1,
                id: "CITY:FR000018"
            },
            {
                mindate: "1880-02-29",
               maxdate: "2019-11-03",
                name: "Toulouse, FR",
                id: "CITY:FR000024"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-11-16",
                name: "T'Bilisi, GG",
                datacoverage: 1,
                id: "CITY:GG000003"
            },
            {
                mindate: "1876-01-01",
               maxdate: "2019-11-16",
                name: "Berlin, GM",
                datacoverage: 1,
                id: "CITY:GM000001"
            },
            {
                mindate: "1890-01-01",
               maxdate: "2019-11-16",
                name: "Bremen, GM",
                datacoverage: 1,
                id: "CITY:GM000003"
            },
            {
                mindate: "1893-11-01",
               maxdate: "2019-09-30",
                name: "Bremerhaven, GM",
                datacoverage: 1,
                id: "CITY:GM000004"
            },
            {
                mindate: "1891-01-01",
               maxdate: "2019-09-30",
                name: "Dortmund, GM",
                datacoverage: 1,
                id: "CITY:GM000006"
            },
            {
                mindate: "1870-01-01",
               maxdate: "2019-11-16",
                name: "Frankfurt, GM",
                datacoverage: 1,
                id: "CITY:GM000012"
            },
            {
                mindate: "1891-01-01",
               maxdate: "2019-11-16",
                name: "Hamburg, GM",
                datacoverage: 1,
                id: "CITY:GM000013"
            },
            {
                mindate: "1863-12-01",
               maxdate: "2019-11-16",
                name: "Leipzig, GM",
                datacoverage: 1,
                id: "CITY:GM000016"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-09-30",
                name: "Magdeburg, GM",
                datacoverage: 0.9862,
                id: "CITY:GM000017"
            },
            {
                mindate: "1884-07-01",
               maxdate: "2019-11-16",
                name: "Mainz, GM",
                datacoverage: 1,
                id: "CITY:GM000018"
            },
            {
                mindate: "1879-01-01",
               maxdate: "2019-11-16",
                name: "Munich, GM",
                datacoverage: 1,
                id: "CITY:GM000019"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-09-30",
                name: "Potsdam, GM",
                datacoverage: 1,
                id: "CITY:GM000020"
            },
            {
                mindate: "1890-01-01",
               maxdate: "2019-09-30",
                name: "Schwerin, GM",
                datacoverage: 0.9716,
                id: "CITY:GM000022"
            },
            {
                mindate: "1887-12-01",
               maxdate: "2019-11-16",
                name: "Stuttgart, GM",
                datacoverage: 1,
                id: "CITY:GM000023"
            },
            {
                mindate: "1884-07-01",
               maxdate: "2019-11-16",
                name: "Wiesbaden, GM",
                datacoverage: 1,
                id: "CITY:GM000024"
            },
            {
                mindate: "1860-12-30",
               maxdate: "2019-11-16",
                name: "Zagreb, HR",
                datacoverage: 1,
                id: "CITY:HR000002"
            },
            {
                mindate: "1763-01-01",
               maxdate: "2019-11-15",
                name: "Milan, IT",
                datacoverage: 0.9994,
                id: "CITY:IT000010"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-16",
                name: "Trento, IT",
                datacoverage: 1,
                id: "CITY:IT000016"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-11-16",
                name: "Astana, KZ",
                datacoverage: 0.9405,
                id: "CITY:KZ000003"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-11-16",
                name: "Atyrau, KZ",
                datacoverage: 0.9516,
                id: "CITY:KZ000004"
            },
            {
                mindate: "1895-02-01",
               maxdate: "2019-11-16",
                name: "Kokshetau, KZ",
                datacoverage: 0.9819,
                id: "CITY:KZ000007"
            },
            {
                mindate: "1890-11-19",
               maxdate: "2019-11-16",
                name: "Petropavlovsk, KZ",
                datacoverage: 0.9109,
                id: "CITY:KZ000011"
            },
            {
                mindate: "1900-01-01",
               maxdate: "2019-11-16",
                name: "Ural'sk, KZ",
                datacoverage: 0.9458,
                id: "CITY:KZ000015"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-11-16",
                name: "Vilnius, LH",
                datacoverage: 0.9599,
                id: "CITY:LH000001"
            },
            {
                mindate: "1886-11-01",
               maxdate: "2019-11-16",
                name: "Chisinau, MD",
                datacoverage: 0.9554,
                id: "CITY:MD000001"
            },
            {
                mindate: "1866-12-31",
               maxdate: "2019-11-16",
                name: "Amsterdam, NL",
                datacoverage: 1,
                id: "CITY:NL000002"
            },
            {
                mindate: "1846-12-31",
               maxdate: "2019-11-16",
                name: "Assen, NL",
                datacoverage: 1,
                id: "CITY:NL000004"
            },
            {
                mindate: "1846-12-31",
               maxdate: "2019-11-16",
                name: "Groningen, NL",
                datacoverage: 1,
                id: "CITY:NL000005"
            },
            {
                mindate: "1866-12-31",
               maxdate: "2019-09-30",
                name: "Haarlem, NL",
                datacoverage: 1,
                id: "CITY:NL000006"
            },
            {
                mindate: "1866-12-31",
               maxdate: "2019-09-30",
                name: "Rotterdam, NL",
                datacoverage: 1,
                id: "CITY:NL000009"
            },
            {
                mindate: "1876-12-31",
               maxdate: "2019-09-30",
                name: "The Hague, NL",
                datacoverage: 1,
                id: "CITY:NL000010"
            },
            {
                mindate: "1892-08-31",
               maxdate: "2019-09-30",
                name: "Zwolle, NL",
                datacoverage: 1,
                id: "CITY:NL000012"
            },
            {
                mindate: "1875-01-01",
               maxdate: "2019-09-29",
                name: "Kristiansand, NO",
                datacoverage: 1,
                id: "CITY:NO000003"
            },
            {
                mindate: "1882-12-31",
               maxdate: "2019-11-16",
                name: "Oslo, NO",
                datacoverage: 1,
                id: "CITY:NO000004"
            },
            {
                mindate: "1895-06-30",
               maxdate: "2019-11-16",
                name: "Stavanger, NO",
                datacoverage: 1,
                id: "CITY:NO000005"
            },
            {
                mindate: "1895-01-01",
               maxdate: "2019-11-16",
                name: "Bucharest, RO",
                datacoverage: 0.9985,
                id: "CITY:RO000009"
            },
            {
                mindate: "1896-01-01",
               maxdate: "2019-11-16",
                name: "Buzau, RO",
                datacoverage: 0.9984,
                id: "CITY:RO000010"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-11-16",
                name: "Arkangel'sk, RS",
                datacoverage: 0.9955,
                id: "CITY:RS000002"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-11-16",
                name: "Astrakhan, RS",
                datacoverage: 1,
                id: "CITY:RS000003"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-11-16",
                name: "Blagoveshchensk, RS",
                datacoverage: 0.9958,
                id: "CITY:RS000007"
            },
            {
                mindate: "1896-07-18",
               maxdate: "2019-11-16",
                name: "Chelyabinsk, RS",
                datacoverage: 0.9125,
                id: "CITY:RS000009"
            },
            {
                mindate: "1890-05-15",
               maxdate: "2019-11-16",
                name: "Chita, RS",
                datacoverage: 1,
                id: "CITY:RS000011"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-11-16",
                name: "Gor'kiy, RS",
                datacoverage: 0.9741,
                id: "CITY:RS000013"
            },
            {
                mindate: "1882-01-01",
               maxdate: "2019-11-16",
                name: "Irkutsk, RS",
                datacoverage: 1,
                id: "CITY:RS000016"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-11-16",
                name: "Kazan', RS",
                datacoverage: 0.9916,
                id: "CITY:RS000021"
            },
            {
                mindate: "1892-10-01",
               maxdate: "2019-11-16",
                name: "Khanty-Mansiysk, RS",
                datacoverage: 0.9721,
                id: "CITY:RS000024"
            },
            {
                mindate: "1893-11-01",
               maxdate: "2019-11-16",
                name: "Kurgan, RS",
                datacoverage: 0.9959,
                id: "CITY:RS000030"
            },
            {
                mindate: "1882-01-01",
               maxdate: "2019-11-16",
                name: "Machackala, RS",
                datacoverage: 0.9752,
                id: "CITY:RS000035"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-11-16",
                name: "Murmansk, RS",
                datacoverage: 1,
                id: "CITY:RS000039"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-10-10",
                name: "Nazran, RS",
                datacoverage: 0.6543,
                id: "CITY:RS000041"
            },
            {
                mindate: "1900-01-01",
               maxdate: "2019-11-16",
                name: "Novosibirsk, RS",
                datacoverage: 1,
                id: "CITY:RS000045"
            },
            {
                mindate: "1886-02-01",
               maxdate: "2019-11-16",
                name: "Orenburg, RS",
                datacoverage: 0.9993,
                id: "CITY:RS000048"
            },
            {
                mindate: "1882-09-01",
               maxdate: "2019-11-16",
                name: "Perm', RS",
                datacoverage: 0.9854,
                id: "CITY:RS000050"
            },
            {
                mindate: "1894-01-01",
               maxdate: "2019-11-01",
                name: "Petropavloski-Kamchatskiy, RS",
                datacoverage: 0.9588,
                id: "CITY:RS000051"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-11-16",
                name: "Saint Petersburg, RS",
                datacoverage: 0.9995,
                id: "CITY:RS000056"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-11-16",
                name: "Saratov, RS",
                datacoverage: 0.999,
                id: "CITY:RS000058"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-11-16",
                name: "Sverdlovsk, RS",
                datacoverage: 1,
                id: "CITY:RS000061"
            },
            {
                mindate: "1888-04-01",
               maxdate: "2019-11-16",
                name: "Syktyvkar, RS",
                datacoverage: 0.9787,
                id: "CITY:RS000062"
            },
            {
                mindate: "1900-01-01",
               maxdate: "2019-11-16",
                name: "Ufa, RS",
                datacoverage: 0.965,
                id: "CITY:RS000068"
            },
            {
                mindate: "1886-04-01",
               maxdate: "2019-11-16",
                name: "Ulan Ude, RS",
                datacoverage: 0.981,
                id: "CITY:RS000070"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-10-10",
                name: "Vladikavkaz, RS",
                datacoverage: 0.6543,
                id: "CITY:RS000071"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-11-16",
                name: "Vyatka, RS",
                datacoverage: 0.9703,
                id: "CITY:RS000078"
            },
            {
                mindate: "1888-03-01",
               maxdate: "2019-11-16",
                name: "Yakutsk, RS",
                datacoverage: 0.9776,
                id: "CITY:RS000079"
            },
            {
                mindate: "1850-01-01",
               maxdate: "2019-11-16",
                name: "Cape Town, SF",
                datacoverage: 1,
                id: "CITY:SF000003"
            },
            {
                mindate: "1871-01-01",
               maxdate: "2019-11-16",
                name: "Durban, SF",
                datacoverage: 0.9939,
                id: "CITY:SF000004"
            },
            {
                mindate: "1893-09-01",
               maxdate: "2019-11-16",
                name: "Johannesburg, SF",
                datacoverage: 1,
                id: "CITY:SF000005"
            },
            {
                mindate: "1897-01-01",
               maxdate: "2019-11-16",
                name: "Kimberley, SF",
                datacoverage: 1,
                id: "CITY:SF000006"
            },
            {
                mindate: "1898-01-01",
               maxdate: "2019-11-16",
                name: "MMabatho (Mafikeng), SF",
                datacoverage: 1,
                id: "CITY:SF000007"
            },
            {
                mindate: "1881-10-01",
               maxdate: "2019-11-16",
                name: "Port Elizabeth, SF",
                datacoverage: 1,
                id: "CITY:SF000011"
            },
            {
                mindate: "1899-12-31",
               maxdate: "2019-11-16",
                name: "Ljubljana, SI",
                datacoverage: 0.9992,
                id: "CITY:SI000001"
            },
            {
                mindate: "1860-02-29",
               maxdate: "2019-10-06",
                name: "Karlstad, SW",
                id: "CITY:SW000005"
            },
            {
                mindate: "1860-01-01",
               maxdate: "2019-11-16",
                name: "Vaxjo, SW",
                datacoverage: 1,
                id: "CITY:SW000013"
            },
            {
                mindate: "1882-09-01",
               maxdate: "2019-11-16",
                name: "Saint Gallen, SZ",
                datacoverage: 0.999,
                id: "CITY:SZ000006"
            },
            {
                mindate: "1887-01-01",
               maxdate: "2019-11-16",
                name: "Gabes, TS",
                datacoverage: 1,
                id: "CITY:TS000003"
            },
            {
                mindate: "1886-03-05",
               maxdate: "2019-11-16",
                name: "Tunis, TS",
                datacoverage: 1,
                id: "CITY:TS000012"
            },
            {
                mindate: "1898-07-17",
               maxdate: "2019-11-16",
                name: "Ashgabat, TX",
                datacoverage: 0.9164,
                id: "CITY:TX000001"
            },
            {
                mindate: "1879-02-06",
               maxdate: "2019-11-16",
                name: "Kherson, UP",
                datacoverage: 1,
                id: "CITY:UP000008"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-11-16",
                name: "Kyiv, UP",
                datacoverage: 1,
                id: "CITY:UP000012"
            },
            {
                mindate: "1894-01-01",
               maxdate: "2019-11-16",
                name: "Odesa, UP",
                datacoverage: 0.9697,
                id: "CITY:UP000016"
            },
            {
                mindate: "1900-01-01",
               maxdate: "2019-11-16",
                name: "Poltava, UP",
                datacoverage: 0.9716,
                id: "CITY:UP000017"
            },
            {
                mindate: "1870-11-01",
               maxdate: "2019-11-18",
                name: "Washington D.C., US",
                datacoverage: 1,
                id: "CITY:US000001"
            },
            {
                mindate: "1895-11-01",
               maxdate: "2019-11-18",
                name: "Alexander City, AL US",
                datacoverage: 1,
                id: "CITY:US010001"
            },
            {
                mindate: "1892-06-01",
               maxdate: "2019-09-30",
                name: "Eufaula, AL US",
                datacoverage: 1,
                id: "CITY:US010008"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Florence, AL US",
                datacoverage: 1,
                id: "CITY:US010009"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Fort Payne, AL US",
                datacoverage: 1,
                id: "CITY:US010010"
            },
            {
                mindate: "1893-07-01",
               maxdate: "2019-11-17",
                name: "Gadsden, AL US",
                datacoverage: 1,
                id: "CITY:US010011"
            },
            {
                mindate: "1894-02-01",
               maxdate: "2019-11-18",
                name: "Huntsville, AL US",
                datacoverage: 1,
                id: "CITY:US010012"
            },
            {
                mindate: "1891-10-01",
               maxdate: "2019-11-18",
                name: "Jasper, AL US",
                datacoverage: 1,
                id: "CITY:US010013"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Montgomery, AL US",
                datacoverage: 1,
                id: "CITY:US010015"
            },
            {
                mindate: "1895-01-01",
               maxdate: "2019-11-18",
                name: "Selma, AL US",
                datacoverage: 1,
                id: "CITY:US010016"
            },
            {
                mindate: "1888-02-01",
               maxdate: "2019-11-18",
                name: "Talladega, AL US",
                datacoverage: 1,
                id: "CITY:US010017"
            },
            {
                mindate: "1900-01-01",
               maxdate: "2019-11-18",
                name: "Tuscaloosa, AL US",
                datacoverage: 1,
                id: "CITY:US010019"
            },
            {
                mindate: "1898-06-01",
               maxdate: "2019-11-18",
                name: "Casa Grande, AZ US",
                datacoverage: 1,
                id: "CITY:US040002"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Flagstaff, AZ US",
                datacoverage: 1,
                id: "CITY:US040004"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Mesa, AZ US",
                datacoverage: 1,
                id: "CITY:US040008"
            },
            {
                mindate: "1892-12-01",
               maxdate: "2019-11-18",
                name: "Nogales, AZ US",
                datacoverage: 1,
                id: "CITY:US040009"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Payson, AZ US",
                datacoverage: 1,
                id: "CITY:US040010"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Phoenix, AZ US",
                datacoverage: 1,
                id: "CITY:US040011"
            },
            {
                mindate: "1898-05-01",
               maxdate: "2019-11-18",
                name: "Prescott, AZ US",
                datacoverage: 1,
                id: "CITY:US040012"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Tucson, AZ US",
                datacoverage: 1,
                id: "CITY:US040014"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Yuma, AZ US",
                datacoverage: 1,
                id: "CITY:US040015"
            },
            {
                mindate: "1891-03-18",
               maxdate: "2019-11-18",
                name: "Arkadelphia, AR US",
                datacoverage: 1,
                id: "CITY:US050001"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-16",
                name: "Blytheville, AR US",
                datacoverage: 1,
                id: "CITY:US050002"
            },
            {
                mindate: "1886-01-15",
               maxdate: "2019-11-18",
                name: "Camden, AR US",
                datacoverage: 1,
                id: "CITY:US050003"
            },
            {
                mindate: "1890-08-01",
               maxdate: "2019-11-18",
                name: "Conway, AR US",
                datacoverage: 1,
                id: "CITY:US050004"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Fayetteville, AR US",
                datacoverage: 1,
                id: "CITY:US050006"
            },
            {
                mindate: "1891-11-01",
               maxdate: "2019-11-18",
                name: "Harrison, AR US",
                datacoverage: 1,
                id: "CITY:US050009"
            },
            {
                mindate: "1890-05-01",
               maxdate: "2019-11-18",
                name: "Hope, AR US",
                datacoverage: 1,
                id: "CITY:US050010"
            },
            {
                mindate: "1875-08-01",
               maxdate: "2019-11-18",
                name: "Hot Springs, AR US",
                datacoverage: 1,
                id: "CITY:US050011"
            },
            {
                mindate: "1896-02-12",
               maxdate: "2019-11-18",
                name: "Jonesboro, AR US",
                datacoverage: 1,
                id: "CITY:US050012"
            },
            {
                mindate: "1874-06-28",
               maxdate: "2019-11-18",
                name: "Little Rock, AR US",
                datacoverage: 1,
                id: "CITY:US050013"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Paragould, AR US",
                datacoverage: 1,
                id: "CITY:US050016"
            },
            {
                mindate: "1884-05-14",
               maxdate: "2019-11-17",
                name: "Pine Bluff, AR US",
                datacoverage: 1,
                id: "CITY:US050017"
            },
            {
                mindate: "1886-06-20",
               maxdate: "2019-11-18",
                name: "Russellville, AR US",
                datacoverage: 1,
                id: "CITY:US050018"
            },
            {
                mindate: "1892-09-01",
               maxdate: "2019-11-18",
                name: "Searcy, AR US",
                datacoverage: 1,
                id: "CITY:US050019"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Bakersfield, CA US",
                datacoverage: 1,
                id: "CITY:US060002"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Grass Valley, CA US",
                datacoverage: 1,
                id: "CITY:US060011"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Los Angeles, CA US",
                datacoverage: 1,
                id: "CITY:US060013"
            },
            {
                mindate: "1899-06-01",
               maxdate: "2019-11-18",
                name: "Merced, CA US",
                datacoverage: 1,
                id: "CITY:US060014"
            },
            {
                mindate: "1899-06-01",
               maxdate: "2019-11-18",
                name: "Modesto, CA US",
                datacoverage: 1,
                id: "CITY:US060015"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Napa, CA US",
                datacoverage: 1,
                id: "CITY:US060017"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Oakland, CA US",
                datacoverage: 1,
                id: "CITY:US060018"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Oceanside, CA US",
                datacoverage: 1,
                id: "CITY:US060019"
            },
            {
                mindate: "1894-05-01",
               maxdate: "2019-11-17",
                name: "Oxnard, CA US",
                datacoverage: 1,
                id: "CITY:US060020"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Red Bluff, CA US",
                datacoverage: 1,
                id: "CITY:US060022"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Redding, CA US",
                datacoverage: 1,
                id: "CITY:US060023"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Riverside, CA US",
                datacoverage: 1,
                id: "CITY:US060025"
            },
            {
                mindate: "1856-01-01",
               maxdate: "2019-11-18",
                name: "Sacramento, CA US",
                datacoverage: 1,
                id: "CITY:US060027"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "San Bernardino, CA US",
                datacoverage: 1,
                id: "CITY:US060029"
            },
            {
                mindate: "1850-10-01",
               maxdate: "2019-11-18",
                name: "San Diego, CA US",
                datacoverage: 1,
                id: "CITY:US060030"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "San Francisco, CA US",
                datacoverage: 1,
                id: "CITY:US060031"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "San Jose, CA US",
                datacoverage: 1,
                id: "CITY:US060032"
            },
            {
                mindate: "1893-02-01",
               maxdate: "2019-11-18",
                name: "San Luis Obispo, CA US",
                datacoverage: 1,
                id: "CITY:US060033"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-17",
                name: "Santa Barbara, CA US",
                datacoverage: 1,
                id: "CITY:US060035"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Santa Cruz, CA US",
                datacoverage: 1,
                id: "CITY:US060037"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Santa Maria, CA US",
                datacoverage: 1,
                id: "CITY:US060038"
            },
            {
                mindate: "1893-02-01",
               maxdate: "2019-11-18",
                name: "Santa Rosa, CA US",
                datacoverage: 1,
                id: "CITY:US060039"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Stockton, CA US",
                datacoverage: 1,
                id: "CITY:US060042"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Susanville, CA US",
                datacoverage: 1,
                id: "CITY:US060043"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Ukiah, CA US",
                datacoverage: 1,
                id: "CITY:US060044"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Vallejo, CA US",
                datacoverage: 1,
                id: "CITY:US060045"
            },
            {
                mindate: "1895-02-01",
               maxdate: "2019-11-18",
                name: "Visalia, CA US",
                datacoverage: 1,
                id: "CITY:US060046"
            },
            {
                mindate: "1885-01-01",
               maxdate: "2019-11-18",
                name: "Yuba City, CA US",
                datacoverage: 1,
                id: "CITY:US060047"
            },
            {
                mindate: "1893-10-01",
               maxdate: "2019-11-18",
                name: "Boulder, CO US",
                datacoverage: 1,
                id: "CITY:US080001"
            },
            {
                mindate: "1893-03-01",
               maxdate: "2019-11-18",
                name: "Canon City, CO US",
                datacoverage: 1,
                id: "CITY:US080002"
            },
            {
                mindate: "1894-05-11",
               maxdate: "2019-11-18",
                name: "Colorado Springs, CO US",
                datacoverage: 1,
                id: "CITY:US080003"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Denver, CO US",
                datacoverage: 1,
                id: "CITY:US080004"
            },
            {
                mindate: "1894-10-01",
               maxdate: "2019-11-18",
                name: "Durango, CO US",
                datacoverage: 1,
                id: "CITY:US080005"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Fort Collins, CO US",
                datacoverage: 1,
                id: "CITY:US080006"
            },
            {
                mindate: "1896-12-01",
               maxdate: "2019-11-18",
                name: "Fort Morgan, CO US",
                datacoverage: 1,
                id: "CITY:US080007"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Grand Junction, CO US",
                datacoverage: 1,
                id: "CITY:US080008"
            },
            {
                mindate: "1895-10-01",
               maxdate: "2019-11-18",
                name: "Montrose, CO US",
                datacoverage: 1,
                id: "CITY:US080009"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Sterling, CO US",
                datacoverage: 1,
                id: "CITY:US080011"
            },
            {
                mindate: "1884-11-01",
               maxdate: "2019-11-18",
                name: "Bridgeport, CT US",
                datacoverage: 1,
                id: "CITY:US090001"
            },
            {
                mindate: "1888-01-01",
               maxdate: "2019-11-18",
                name: "Danbury, CT US",
                datacoverage: 1,
                id: "CITY:US090002"
            },
            {
                mindate: "1884-11-01",
               maxdate: "2019-11-18",
                name: "Hartford, CT US",
                datacoverage: 1,
                id: "CITY:US090003"
            },
            {
                mindate: "1884-11-01",
               maxdate: "2019-11-18",
                name: "New Haven, CT US",
                datacoverage: 1,
                id: "CITY:US090004"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "New London, CT US",
                datacoverage: 1,
                id: "CITY:US090005"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Norwalk, CT US",
                datacoverage: 1,
                id: "CITY:US090006"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Norwich, CT US",
                datacoverage: 1,
                id: "CITY:US090007"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Stamford, CT US",
                datacoverage: 1,
                id: "CITY:US090008"
            },
            {
                mindate: "1884-11-01",
               maxdate: "2019-11-18",
                name: "Torrington, CT US",
                datacoverage: 1,
                id: "CITY:US090009"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Waterbury, CT US",
                datacoverage: 1,
                id: "CITY:US090010"
            },
            {
                mindate: "1888-06-01",
               maxdate: "2019-11-18",
                name: "Willimantic, CT US",
                datacoverage: 1,
                id: "CITY:US090011"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Dover, DE US",
                datacoverage: 1,
                id: "CITY:US100001"
            },
            {
                mindate: "1894-01-01",
               maxdate: "2019-11-18",
                name: "Newark, DE US",
                datacoverage: 1,
                id: "CITY:US100002"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Boca Raton, FL US",
                datacoverage: 1,
                id: "CITY:US120002"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Boynton Beach, FL US",
                datacoverage: 1,
                id: "CITY:US120003"
            },
            {
                mindate: "1892-02-01",
               maxdate: "2019-11-18",
                name: "Bradenton, FL US",
                datacoverage: 1,
                id: "CITY:US120004"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Cape Coral, FL US",
                datacoverage: 1,
                id: "CITY:US120005"
            },
            {
                mindate: "1893-01-17",
               maxdate: "2019-11-18",
                name: "Cocoa, FL US",
                datacoverage: 1,
                id: "CITY:US120006"
            },
            {
                mindate: "1897-04-01",
               maxdate: "2019-11-18",
                name: "Coral Springs, FL US",
                datacoverage: 1,
                id: "CITY:US120007"
            },
            {
                mindate: "1892-11-01",
               maxdate: "2019-11-18",
                name: "Daytona Beach, FL US",
                datacoverage: 1,
                id: "CITY:US120009"
            },
            {
                mindate: "1895-10-01",
               maxdate: "2019-11-18",
                name: "Deltona, FL US",
                datacoverage: 1,
                id: "CITY:US120010"
            },
            {
                mindate: "1897-04-01",
               maxdate: "2019-11-18",
                name: "Fort Lauderdale, FL US",
                datacoverage: 1,
                id: "CITY:US120012"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Fort Myers, FL US",
                datacoverage: 1,
                id: "CITY:US120013"
            },
            {
                mindate: "1890-07-13",
               maxdate: "2019-11-18",
                name: "Gainesville, FL US",
                datacoverage: 1,
                id: "CITY:US120015"
            },
            {
                mindate: "1899-02-01",
               maxdate: "2019-11-18",
                name: "Homosassa Springs, FL US",
                datacoverage: 1,
                id: "CITY:US120016"
            },
            {
                mindate: "1871-10-01",
               maxdate: "2019-11-18",
                name: "Jacksonville, FL US",
                datacoverage: 1,
                id: "CITY:US120018"
            },
            {
                mindate: "1892-04-01",
               maxdate: "2019-11-18",
                name: "Kissimmee, FL US",
                datacoverage: 1,
                id: "CITY:US120022"
            },
            {
                mindate: "1893-01-17",
               maxdate: "2019-11-18",
                name: "Melbourne, FL US",
                datacoverage: 1,
                id: "CITY:US120024"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Ocala, FL US",
                datacoverage: 1,
                id: "CITY:US120027"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Palatka, FL US",
                datacoverage: 1,
                id: "CITY:US120029"
            },
            {
                mindate: "1897-04-01",
               maxdate: "2019-11-18",
                name: "Pompano Beach, FL US",
                datacoverage: 1,
                id: "CITY:US120033"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Spring Hill, FL US",
                datacoverage: 1,
                id: "CITY:US120037"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "St. Augustine, FL US",
                datacoverage: 1,
                id: "CITY:US120038"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "St. Petersburg, FL US",
                datacoverage: 1,
                id: "CITY:US120039"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Tallahassee, FL US",
                datacoverage: 1,
                id: "CITY:US120040"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Tampa, FL US",
                datacoverage: 1,
                id: "CITY:US120041"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "West Palm Beach, FL US",
                datacoverage: 1,
                id: "CITY:US120043"
            },
            {
                mindate: "1891-11-05",
               maxdate: "2019-11-18",
                name: "Albany, GA US",
                datacoverage: 1,
                id: "CITY:US130001"
            },
            {
                mindate: "1876-05-01",
               maxdate: "2019-11-18",
                name: "Americus, GA US",
                datacoverage: 1,
                id: "CITY:US130002"
            },
            {
                mindate: "1849-01-01",
               maxdate: "2019-11-18",
                name: "Athens, GA US",
                datacoverage: 1,
                id: "CITY:US130003"
            },
            {
                mindate: "1899-06-01",
               maxdate: "2019-11-18",
                name: "Atlanta, GA US",
                datacoverage: 1,
                id: "CITY:US130004"
            },
            {
                mindate: "1891-07-01",
               maxdate: "2019-11-18",
                name: "Augusta, GA US",
                datacoverage: 1,
                id: "CITY:US130005"
            },
            {
                mindate: "1892-06-01",
               maxdate: "2019-11-16",
                name: "Bainbridge, GA US",
                datacoverage: 1,
                id: "CITY:US130006"
            },
            {
                mindate: "1892-02-01",
               maxdate: "2019-11-17",
                name: "Brunswick, GA US",
                datacoverage: 1,
                id: "CITY:US130007"
            },
            {
                mindate: "1893-03-01",
               maxdate: "2019-11-18",
                name: "Carrollton, GA US",
                datacoverage: 1,
                id: "CITY:US130008"
            },
            {
                mindate: "1891-10-01",
               maxdate: "2019-11-18",
                name: "Columbus, GA US",
                datacoverage: 1,
                id: "CITY:US130009"
            },
            {
                mindate: "1891-09-01",
               maxdate: "2019-11-18",
                name: "Dalton, GA US",
                datacoverage: 1,
                id: "CITY:US130010"
            },
            {
                mindate: "1892-03-19",
               maxdate: "2019-11-18",
                name: "Dublin, GA US",
                datacoverage: 1,
                id: "CITY:US130012"
            },
            {
                mindate: "1891-10-01",
               maxdate: "2019-11-18",
                name: "Fort Benning South, GA US",
                datacoverage: 1,
                id: "CITY:US130013"
            },
            {
                mindate: "1891-10-01",
               maxdate: "2019-11-18",
                name: "Gainesville, GA US",
                datacoverage: 1,
                id: "CITY:US130014"
            },
            {
                mindate: "1892-05-05",
               maxdate: "2019-11-18",
                name: "Griffin, GA US",
                datacoverage: 1,
                id: "CITY:US130015"
            },
            {
                mindate: "1892-03-20",
               maxdate: "2019-11-18",
                name: "Hinesville, GA US",
                datacoverage: 1,
                id: "CITY:US130016"
            },
            {
                mindate: "1887-03-01",
               maxdate: "2019-11-18",
                name: "LaGrange, GA US",
                datacoverage: 1,
                id: "CITY:US130017"
            },
            {
                mindate: "1893-01-21",
               maxdate: "2019-11-18",
                name: "Macon, GA US",
                datacoverage: 1,
                id: "CITY:US130018"
            },
            {
                mindate: "1891-10-01",
               maxdate: "2019-11-18",
                name: "Milledgeville, GA US",
                datacoverage: 1,
                id: "CITY:US130019"
            },
            {
                mindate: "1891-10-03",
               maxdate: "2019-11-18",
                name: "Peachtree City, GA US",
                datacoverage: 1,
                id: "CITY:US130020"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Rome, GA US",
                datacoverage: 1,
                id: "CITY:US130021"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "St. Marys, GA US",
                datacoverage: 1,
                id: "CITY:US130023"
            },
            {
                mindate: "1892-05-01",
               maxdate: "2019-11-18",
                name: "Statesboro, GA US",
                datacoverage: 1,
                id: "CITY:US130024"
            },
            {
                mindate: "1892-10-01",
               maxdate: "2019-11-18",
                name: "Thomasville, GA US",
                datacoverage: 1,
                id: "CITY:US130025"
            },
            {
                mindate: "1892-12-01",
               maxdate: "2019-09-30",
                name: "Vidalia, GA US",
                datacoverage: 1,
                id: "CITY:US130028"
            },
            {
                mindate: "1892-04-15",
               maxdate: "2019-11-15",
                name: "Waycross, GA US",
                datacoverage: 1,
                id: "CITY:US130029"
            },
            {
                mindate: "1895-09-01",
               maxdate: "2019-11-18",
                name: "Coeur d'Alene, ID US",
                datacoverage: 1,
                id: "CITY:US160002"
            },
            {
                mindate: "1894-02-01",
               maxdate: "2019-11-18",
                name: "Lewiston, ID US",
                datacoverage: 1,
                id: "CITY:US160004"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Moscow, ID US",
                datacoverage: 1,
                id: "CITY:US160005"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Aurora, IL US",
                datacoverage: 1,
                id: "CITY:US170001"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Bloomington, IL US",
                datacoverage: 1,
                id: "CITY:US170002"
            },
            {
                mindate: "1893-06-01",
               maxdate: "2019-11-18",
                name: "Carbondale, IL US",
                datacoverage: 1,
                id: "CITY:US170003"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Champaign, IL US",
                datacoverage: 1,
                id: "CITY:US170004"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Charleston, IL US",
                datacoverage: 1,
                id: "CITY:US170005"
            },
            {
                mindate: "1870-10-15",
               maxdate: "2019-11-18",
                name: "Chicago, IL US",
                datacoverage: 1,
                id: "CITY:US170006"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Crystal Lake, IL US",
                datacoverage: 1,
                id: "CITY:US170007"
            },
            {
                mindate: "1895-04-23",
               maxdate: "2019-11-18",
                name: "Danville, IL US",
                datacoverage: 1,
                id: "CITY:US170008"
            },
            {
                mindate: "1893-01-04",
               maxdate: "2019-11-18",
                name: "DeKalb, IL US",
                datacoverage: 1,
                id: "CITY:US170009"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-17",
                name: "Decatur, IL US",
                datacoverage: 1,
                id: "CITY:US170010"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Dixon, IL US",
                datacoverage: 1,
                id: "CITY:US170011"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Effingham, IL US",
                datacoverage: 1,
                id: "CITY:US170012"
            },
            {
                mindate: "1895-05-01",
               maxdate: "2019-11-18",
                name: "Elgin, IL US",
                datacoverage: 1,
                id: "CITY:US170013"
            },
            {
                mindate: "1895-01-06",
               maxdate: "2019-11-18",
                name: "Galesburg, IL US",
                datacoverage: 1,
                id: "CITY:US170015"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Joliet, IL US",
                datacoverage: 1,
                id: "CITY:US170016"
            },
            {
                mindate: "1896-05-15",
               maxdate: "2019-11-18",
                name: "Kankakee, IL US",
                datacoverage: 1,
                id: "CITY:US170017"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Kewanee, IL US",
                datacoverage: 1,
                id: "CITY:US170018"
            },
            {
                mindate: "1895-05-01",
               maxdate: "2019-11-18",
                name: "Mount Vernon, IL US",
                datacoverage: 1,
                id: "CITY:US170021"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Naperville, IL US",
                datacoverage: 1,
                id: "CITY:US170022"
            },
            {
                mindate: "1892-05-01",
               maxdate: "2019-11-18",
                name: "Ottawa, IL US",
                datacoverage: 1,
                id: "CITY:US170023"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Peoria, IL US",
                datacoverage: 1,
                id: "CITY:US170024"
            },
            {
                mindate: "1892-04-01",
               maxdate: "2019-11-18",
                name: "Quincy, IL US",
                datacoverage: 1,
                id: "CITY:US170026"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Rockford, IL US",
                datacoverage: 1,
                id: "CITY:US170027"
            },
            {
                mindate: "1895-04-01",
               maxdate: "2019-11-18",
                name: "Springfield, IL US",
                datacoverage: 1,
                id: "CITY:US170028"
            },
            {
                mindate: "1893-04-01",
               maxdate: "2019-11-18",
                name: "Streator, IL US",
                datacoverage: 1,
                id: "CITY:US170029"
            },
            {
                mindate: "1895-12-01",
               maxdate: "2019-11-18",
                name: "Bloomington, IN US",
                datacoverage: 1,
                id: "CITY:US180001"
            },
            {
                mindate: "1894-01-01",
               maxdate: "2019-11-18",
                name: "Evansville, IN US",
                datacoverage: 1,
                id: "CITY:US180002"
            },
            {
                mindate: "1897-02-01",
               maxdate: "2019-11-18",
                name: "Fort Wayne, IN US",
                datacoverage: 1,
                id: "CITY:US180003"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Indianapolis, IN US",
                datacoverage: 1,
                id: "CITY:US180004"
            },
            {
                mindate: "1895-11-23",
               maxdate: "2019-11-18",
                name: "Kokomo, IN US",
                datacoverage: 1,
                id: "CITY:US180005"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Madison, IN US",
                datacoverage: 1,
                id: "CITY:US180007"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Michigan City, IN US",
                datacoverage: 1,
                id: "CITY:US180008"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Muncie, IN US",
                datacoverage: 1,
                id: "CITY:US180009"
            },
            {
                mindate: "1896-07-01",
               maxdate: "2019-11-18",
                name: "Richmond, IN US",
                datacoverage: 1,
                id: "CITY:US180010"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Shelbyville, IN US",
                datacoverage: 1,
                id: "CITY:US180011"
            },
            {
                mindate: "1893-12-01",
               maxdate: "2019-11-18",
                name: "South Bend, IN US",
                datacoverage: 1,
                id: "CITY:US180012"
            },
            {
                mindate: "1894-04-01",
               maxdate: "2019-11-18",
                name: "Vincennes, IN US",
                datacoverage: 1,
                id: "CITY:US180014"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Ames, IA US",
                datacoverage: 1,
                id: "CITY:US190001"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Carroll, IA US",
                datacoverage: 1,
                id: "CITY:US190003"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Cedar Falls, IA US",
                datacoverage: 1,
                id: "CITY:US190004"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Cedar Rapids, IA US",
                datacoverage: 1,
                id: "CITY:US190005"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Clinton, IA US",
                datacoverage: 1,
                id: "CITY:US190006"
            },
            {
                mindate: "1893-05-01",
               maxdate: "2019-11-18",
                name: "Davenport, IA US",
                datacoverage: 1,
                id: "CITY:US190007"
            },
            {
                mindate: "1894-10-01",
               maxdate: "2019-11-18",
                name: "Des Moines, IA US",
                datacoverage: 1,
                id: "CITY:US190008"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Dubuque, IA US",
                datacoverage: 1,
                id: "CITY:US190009"
            },
            {
                mindate: "1893-05-01",
               maxdate: "2019-11-18",
                name: "Fort Dodge, IA US",
                datacoverage: 1,
                id: "CITY:US190010"
            },
            {
                mindate: "1893-01-07",
               maxdate: "2019-11-18",
                name: "Iowa City, IA US",
                datacoverage: 1,
                id: "CITY:US190011"
            },
            {
                mindate: "1891-07-01",
               maxdate: "2019-11-18",
                name: "Keokuk, IA US",
                datacoverage: 1,
                id: "CITY:US190012"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Marshalltown, IA US",
                datacoverage: 1,
                id: "CITY:US190013"
            },
            {
                mindate: "1893-06-01",
               maxdate: "2019-11-18",
                name: "Mason City, IA US",
                datacoverage: 1,
                id: "CITY:US190014"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Oskaloosa, IA US",
                datacoverage: 1,
                id: "CITY:US190015"
            },
            {
                mindate: "1894-01-01",
               maxdate: "2019-11-18",
                name: "Ottumwa, IA US",
                datacoverage: 1,
                id: "CITY:US190016"
            },
            {
                mindate: "1895-02-01",
               maxdate: "2019-11-17",
                name: "Spencer, IA US",
                datacoverage: 1,
                id: "CITY:US190018"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Storm Lake, IA US",
                datacoverage: 1,
                id: "CITY:US190019"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Waterloo, IA US",
                datacoverage: 1,
                id: "CITY:US190020"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Coffeyville, KS US",
                datacoverage: 1,
                id: "CITY:US200001"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Emporia, KS US",
                datacoverage: 1,
                id: "CITY:US200003"
            },
            {
                mindate: "1893-09-01",
               maxdate: "2019-11-18",
                name: "Garden City, KS US",
                datacoverage: 1,
                id: "CITY:US200004"
            },
            {
                mindate: "1894-12-01",
               maxdate: "2019-11-18",
                name: "Great Bend, KS US",
                datacoverage: 1,
                id: "CITY:US200005"
            },
            {
                mindate: "1892-07-01",
               maxdate: "2019-11-18",
                name: "Hays, KS US",
                datacoverage: 1,
                id: "CITY:US200006"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Hutchinson, KS US",
                datacoverage: 1,
                id: "CITY:US200007"
            },
            {
                mindate: "1857-04-01",
               maxdate: "2019-11-18",
                name: "Lawrence, KS US",
                datacoverage: 1,
                id: "CITY:US200008"
            },
            {
                mindate: "1891-12-01",
               maxdate: "2019-11-18",
                name: "Leavenworth, KS US",
                datacoverage: 1,
                id: "CITY:US200009"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-15",
                name: "Liberal, KS US",
                datacoverage: 1,
                id: "CITY:US200010"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Manhattan, KS US",
                datacoverage: 1,
                id: "CITY:US200011"
            },
            {
                mindate: "1895-01-01",
               maxdate: "2019-11-18",
                name: "Pittsburg, KS US",
                datacoverage: 1,
                id: "CITY:US200012"
            },
            {
                mindate: "1896-02-01",
               maxdate: "2019-11-18",
                name: "Salina, KS US",
                datacoverage: 1,
                id: "CITY:US200013"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Topeka, KS US",
                datacoverage: 1,
                id: "CITY:US200014"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Winfield, KS US",
                datacoverage: 1,
                id: "CITY:US200016"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Bowling Green, KY US",
                datacoverage: 1,
                id: "CITY:US210001"
            },
            {
                mindate: "1889-01-05",
               maxdate: "2019-11-08",
                name: "Campbellsville, KY US",
                datacoverage: 1,
                id: "CITY:US210002"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Danville, KY US",
                datacoverage: 1,
                id: "CITY:US210003"
            },
            {
                mindate: "1896-03-01",
               maxdate: "2019-11-18",
                name: "Elizabethtown, KY US",
                datacoverage: 1,
                id: "CITY:US210004"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Fort Knox, KY US",
                datacoverage: 1,
                id: "CITY:US210005"
            },
            {
                mindate: "1895-04-01",
               maxdate: "2019-11-18",
                name: "Frankfort, KY US",
                datacoverage: 1,
                id: "CITY:US210006"
            },
            {
                mindate: "1896-05-01",
               maxdate: "2019-11-18",
                name: "Hopkinsville, KY US",
                datacoverage: 1,
                id: "CITY:US210007"
            },
            {
                mindate: "1872-10-11",
               maxdate: "2019-11-18",
                name: "Lexington, KY US",
                datacoverage: 1,
                id: "CITY:US210008"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Louisville, KY US",
                datacoverage: 1,
                id: "CITY:US210009"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Madisonville, KY US",
                datacoverage: 1,
                id: "CITY:US210010"
            },
            {
                mindate: "1892-12-01",
               maxdate: "2019-11-18",
                name: "Middlesborough, KY US",
                datacoverage: 1,
                id: "CITY:US210011"
            },
            {
                mindate: "1896-07-01",
               maxdate: "2019-11-18",
                name: "Owensboro, KY US",
                datacoverage: 1,
                id: "CITY:US210013"
            },
            {
                mindate: "1891-09-04",
               maxdate: "2019-11-18",
                name: "Paducah, KY US",
                datacoverage: 1,
                id: "CITY:US210014"
            },
            {
                mindate: "1893-06-02",
               maxdate: "2019-11-18",
                name: "Somerset, KY US",
                datacoverage: 1,
                id: "CITY:US210015"
            },
            {
                mindate: "1892-06-01",
               maxdate: "2019-11-18",
                name: "Alexandria, LA US",
                datacoverage: 1,
                id: "CITY:US220001"
            },
            {
                mindate: "1893-12-01",
               maxdate: "2019-11-17",
                name: "Bastrop, LA US",
                datacoverage: 1,
                id: "CITY:US220002"
            },
            {
                mindate: "1892-02-01",
               maxdate: "2019-11-18",
                name: "Baton Rouge, LA US",
                datacoverage: 1,
                id: "CITY:US220003"
            },
            {
                mindate: "1892-05-01",
               maxdate: "2019-11-17",
                name: "Hammond, LA US",
                datacoverage: 1,
                id: "CITY:US220006"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Houma, LA US",
                datacoverage: 1,
                id: "CITY:US220007"
            },
            {
                mindate: "1891-02-01",
               maxdate: "2019-11-18",
                name: "Jennings, LA US",
                datacoverage: 1,
                id: "CITY:US220008"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Lafayette, LA US",
                datacoverage: 1,
                id: "CITY:US220009"
            },
            {
                mindate: "1893-04-16",
               maxdate: "2019-11-18",
                name: "Minden, LA US",
                datacoverage: 1,
                id: "CITY:US220011"
            },
            {
                mindate: "1892-12-01",
               maxdate: "2019-11-18",
                name: "Monroe, LA US",
                datacoverage: 1,
                id: "CITY:US220012"
            },
            {
                mindate: "1893-03-01",
               maxdate: "2019-11-18",
                name: "Natchitoches, LA US",
                datacoverage: 1,
                id: "CITY:US220014"
            },
            {
                mindate: "1891-02-01",
               maxdate: "2019-11-18",
                name: "New Iberia, LA US",
                datacoverage: 1,
                id: "CITY:US220015"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "New Orleans, LA US",
                datacoverage: 1,
                id: "CITY:US220016"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Opelousas, LA US",
                datacoverage: 1,
                id: "CITY:US220017"
            },
            {
                mindate: "1897-07-01",
               maxdate: "2019-11-18",
                name: "Ruston, LA US",
                datacoverage: 1,
                id: "CITY:US220018"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Thibodaux, LA US",
                datacoverage: 1,
                id: "CITY:US220020"
            },
            {
                mindate: "1886-09-01",
               maxdate: "2019-11-18",
                name: "Augusta, ME US",
                datacoverage: 1,
                id: "CITY:US230001"
            },
            {
                mindate: "1893-08-01",
               maxdate: "2019-11-18",
                name: "Bangor, ME US",
                datacoverage: 1,
                id: "CITY:US230002"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Lewiston, ME US",
                datacoverage: 1,
                id: "CITY:US230003"
            },
            {
                mindate: "1885-08-01",
               maxdate: "2019-11-18",
                name: "Portland, ME US",
                datacoverage: 1,
                id: "CITY:US230004"
            },
            {
                mindate: "1886-02-01",
               maxdate: "2019-11-18",
                name: "Waterville, ME US",
                datacoverage: 1,
                id: "CITY:US230005"
            },
            {
                mindate: "1894-07-01",
               maxdate: "2019-11-18",
                name: "Annapolis, MD US",
                datacoverage: 1,
                id: "CITY:US240001"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Baltimore, MD US",
                datacoverage: 1,
                id: "CITY:US240002"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Cambridge, MD US",
                datacoverage: 1,
                id: "CITY:US240003"
            },
            {
                mindate: "1891-07-01",
               maxdate: "2019-11-18",
                name: "Cumberland, MD US",
                datacoverage: 1,
                id: "CITY:US240004"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Easton, MD US",
                datacoverage: 1,
                id: "CITY:US240005"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Frederick, MD US",
                datacoverage: 1,
                id: "CITY:US240006"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Hagerstown, MD US",
                datacoverage: 1,
                id: "CITY:US240007"
            },
            {
                mindate: "1898-04-01",
               maxdate: "2019-11-18",
                name: "Ocean Pines, MD US",
                datacoverage: 1,
                id: "CITY:US240008"
            },
            {
                mindate: "1894-01-01",
               maxdate: "2019-11-18",
                name: "Salisbury, MD US",
                datacoverage: 1,
                id: "CITY:US240009"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Westminster, MD US",
                datacoverage: 1,
                id: "CITY:US240010"
            },
            {
                mindate: "1885-01-01",
               maxdate: "2019-11-18",
                name: "Barnstable Town, MA US",
                datacoverage: 1,
                id: "CITY:US250001"
            },
            {
                mindate: "1884-11-01",
               maxdate: "2019-11-18",
                name: "Boston, MA US",
                datacoverage: 1,
                id: "CITY:US250002"
            },
            {
                mindate: "1884-11-01",
               maxdate: "2019-11-18",
                name: "Brockton, MA US",
                datacoverage: 1,
                id: "CITY:US250003"
            },
            {
                mindate: "1884-11-01",
               maxdate: "2019-11-18",
                name: "Fall River, MA US",
                datacoverage: 1,
                id: "CITY:US250004"
            },
            {
                mindate: "1885-05-01",
               maxdate: "2019-11-18",
                name: "Gloucester, MA US",
                datacoverage: 1,
                id: "CITY:US250005"
            },
            {
                mindate: "1887-04-01",
               maxdate: "2019-11-18",
                name: "Greenfield, MA US",
                datacoverage: 1,
                id: "CITY:US250006"
            },
            {
                mindate: "1884-12-06",
               maxdate: "2019-11-18",
                name: "Leominster, MA US",
                datacoverage: 1,
                id: "CITY:US250007"
            },
            {
                mindate: "1885-08-01",
               maxdate: "2019-11-18",
                name: "Lowell, MA US",
                datacoverage: 1,
                id: "CITY:US250008"
            },
            {
                mindate: "1885-01-01",
               maxdate: "2019-11-18",
                name: "New Bedford, MA US",
                datacoverage: 1,
                id: "CITY:US250009"
            },
            {
                mindate: "1884-11-04",
               maxdate: "2019-11-18",
                name: "North Adams, MA US",
                datacoverage: 1,
                id: "CITY:US250010"
            },
            {
                mindate: "1885-09-01",
               maxdate: "2019-11-18",
                name: "Northampton, MA US",
                datacoverage: 1,
                id: "CITY:US250011"
            },
            {
                mindate: "1885-01-01",
               maxdate: "2019-11-18",
                name: "Pittsfield, MA US",
                datacoverage: 1,
                id: "CITY:US250012"
            },
            {
                mindate: "1885-01-01",
               maxdate: "2019-11-18",
                name: "Springfield, MA US",
                datacoverage: 1,
                id: "CITY:US250013"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Worcester, MA US",
                datacoverage: 1,
                id: "CITY:US250014"
            },
            {
                mindate: "1891-10-01",
               maxdate: "2019-11-18",
                name: "Ann Arbor, MI US",
                datacoverage: 1,
                id: "CITY:US260002"
            },
            {
                mindate: "1892-04-02",
               maxdate: "2019-11-18",
                name: "Benton Harbor, MI US",
                datacoverage: 1,
                id: "CITY:US260003"
            },
            {
                mindate: "1891-09-01",
               maxdate: "2019-11-18",
                name: "Big Rapids, MI US",
                datacoverage: 1,
                id: "CITY:US260004"
            },
            {
                mindate: "1891-09-01",
               maxdate: "2019-11-18",
                name: "Cadillac, MI US",
                datacoverage: 1,
                id: "CITY:US260005"
            },
            {
                mindate: "1866-06-01",
               maxdate: "2019-11-18",
                name: "Detroit, MI US",
                datacoverage: 1,
                id: "CITY:US260006"
            },
            {
                mindate: "1891-09-01",
               maxdate: "2019-11-18",
                name: "Flint, MI US",
                datacoverage: 1,
                id: "CITY:US260008"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Grand Rapids, MI US",
                datacoverage: 1,
                id: "CITY:US260009"
            },
            {
                mindate: "1889-09-01",
               maxdate: "2019-11-18",
                name: "Jackson, MI US",
                datacoverage: 1,
                id: "CITY:US260011"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Kalamazoo, MI US",
                datacoverage: 1,
                id: "CITY:US260012"
            },
            {
                mindate: "1889-07-01",
               maxdate: "2019-11-18",
                name: "Lansing, MI US",
                datacoverage: 1,
                id: "CITY:US260013"
            },
            {
                mindate: "1891-12-01",
               maxdate: "2019-11-18",
                name: "Marquette, MI US",
                datacoverage: 1,
                id: "CITY:US260014"
            },
            {
                mindate: "1896-06-01",
               maxdate: "2019-11-18",
                name: "Midland, MI US",
                datacoverage: 1,
                id: "CITY:US260015"
            },
            {
                mindate: "1895-08-15",
               maxdate: "2019-11-18",
                name: "Mount Pleasant, MI US",
                datacoverage: 1,
                id: "CITY:US260016"
            },
            {
                mindate: "1893-02-01",
               maxdate: "2019-11-17",
                name: "Muskegon, MI US",
                datacoverage: 1,
                id: "CITY:US260017"
            },
            {
                mindate: "1891-09-01",
               maxdate: "2019-11-18",
                name: "Owosso, MI US",
                datacoverage: 1,
                id: "CITY:US260018"
            },
            {
                mindate: "1891-09-01",
               maxdate: "2019-11-18",
                name: "Pontiac, MI US",
                datacoverage: 1,
                id: "CITY:US260019"
            },
            {
                mindate: "1882-07-01",
               maxdate: "2019-11-18",
                name: "Port Huron, MI US",
                datacoverage: 1,
                id: "CITY:US260020"
            },
            {
                mindate: "1891-09-01",
               maxdate: "2019-11-18",
                name: "Saginaw, MI US",
                datacoverage: 1,
                id: "CITY:US260021"
            },
            {
                mindate: "1889-03-01",
               maxdate: "2019-11-18",
                name: "Sault Ste. Marie, MI US",
                datacoverage: 1,
                id: "CITY:US260022"
            },
            {
                mindate: "1891-09-01",
               maxdate: "2019-11-18",
                name: "Sturgis, MI US",
                datacoverage: 1,
                id: "CITY:US260023"
            },
            {
                mindate: "1894-02-01",
               maxdate: "2019-11-18",
                name: "Traverse City, MI US",
                datacoverage: 1,
                id: "CITY:US260024"
            },
            {
                mindate: "1896-02-01",
               maxdate: "2019-11-18",
                name: "Bemidji, MN US",
                datacoverage: 1,
                id: "CITY:US270002"
            },
            {
                mindate: "1889-01-01",
               maxdate: "2019-11-18",
                name: "Brainerd, MN US",
                datacoverage: 1,
                id: "CITY:US270003"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Fairmont, MN US",
                datacoverage: 1,
                id: "CITY:US270006"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Faribault, MN US",
                datacoverage: 1,
                id: "CITY:US270007"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-17",
                name: "Fergus Falls, MN US",
                datacoverage: 1,
                id: "CITY:US270008"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Hutchinson, MN US",
                datacoverage: 1,
                id: "CITY:US270010"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Mankato, MN US",
                datacoverage: 1,
                id: "CITY:US270011"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Marshall, MN US",
                datacoverage: 1,
                id: "CITY:US270012"
            },
            {
                mindate: "1891-01-01",
               maxdate: "2019-11-18",
                name: "Minneapolis, MN US",
                datacoverage: 1,
                id: "CITY:US270013"
            },
            {
                mindate: "1893-08-08",
               maxdate: "2019-11-18",
                name: "New Ulm, MN US",
                datacoverage: 1,
                id: "CITY:US270014"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Owatonna, MN US",
                datacoverage: 1,
                id: "CITY:US270015"
            },
            {
                mindate: "1891-01-01",
               maxdate: "2019-11-18",
                name: "Saint Paul, MN US",
                datacoverage: 1,
                id: "CITY:US270017"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "St. Cloud, MN US",
                datacoverage: 1,
                id: "CITY:US270018"
            },
            {
                mindate: "1893-03-01",
               maxdate: "2019-11-18",
                name: "Willmar, MN US",
                datacoverage: 1,
                id: "CITY:US270019"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-17",
                name: "Worthington, MN US",
                datacoverage: 1,
                id: "CITY:US270020"
            },
            {
                mindate: "1893-05-01",
               maxdate: "2019-11-18",
                name: "Biloxi, MS US",
                datacoverage: 1,
                id: "CITY:US280001"
            },
            {
                mindate: "1892-11-01",
               maxdate: "2019-11-18",
                name: "Clarksdale, MS US",
                datacoverage: 1,
                id: "CITY:US280002"
            },
            {
                mindate: "1892-07-01",
               maxdate: "2019-11-18",
                name: "Columbus, MS US",
                datacoverage: 1,
                id: "CITY:US280004"
            },
            {
                mindate: "1895-08-01",
               maxdate: "2019-11-16",
                name: "Corinth, MS US",
                datacoverage: 1,
                id: "CITY:US280005"
            },
            {
                mindate: "1893-05-01",
               maxdate: "2019-11-18",
                name: "Gulfport, MS US",
                datacoverage: 1,
                id: "CITY:US280009"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Hattiesburg, MS US",
                datacoverage: 1,
                id: "CITY:US280010"
            },
            {
                mindate: "1897-04-01",
               maxdate: "2019-11-18",
                name: "Laurel, MS US",
                datacoverage: 1,
                id: "CITY:US280012"
            },
            {
                mindate: "1895-05-01",
               maxdate: "2019-11-18",
                name: "McComb, MS US",
                datacoverage: 1,
                id: "CITY:US280013"
            },
            {
                mindate: "1891-02-01",
               maxdate: "2019-11-18",
                name: "Meridian, MS US",
                datacoverage: 1,
                id: "CITY:US280014"
            },
            {
                mindate: "1891-02-01",
               maxdate: "2019-11-18",
                name: "Natchez, MS US",
                datacoverage: 1,
                id: "CITY:US280015"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Oxford, MS US",
                datacoverage: 1,
                id: "CITY:US280016"
            },
            {
                mindate: "1891-03-01",
               maxdate: "2019-11-18",
                name: "Vicksburg, MS US",
                datacoverage: 1,
                id: "CITY:US280019"
            },
            {
                mindate: "1891-10-01",
               maxdate: "2018-11-07",
                name: "Yazoo City, MS US",
                datacoverage: 1,
                id: "CITY:US280020"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Cape Girardeau, MO US",
                datacoverage: 1,
                id: "CITY:US290001"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Columbia, MO US",
                datacoverage: 1,
                id: "CITY:US290002"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Excelsior Springs, MO US",
                datacoverage: 1,
                id: "CITY:US290003"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Farmington, MO US",
                datacoverage: 1,
                id: "CITY:US290004"
            },
            {
                mindate: "1892-04-01",
               maxdate: "2019-11-18",
                name: "Fort Leonard Wood, MO US",
                datacoverage: 1,
                id: "CITY:US290005"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Jefferson City, MO US",
                datacoverage: 1,
                id: "CITY:US290006"
            },
            {
                mindate: "1892-09-01",
               maxdate: "2019-11-18",
                name: "Kansas City, MO US",
                datacoverage: 1,
                id: "CITY:US290008"
            },
            {
                mindate: "1893-02-01",
               maxdate: "2019-11-18",
                name: "Kirksville, MO US",
                datacoverage: 1,
                id: "CITY:US290010"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Lebanon, MO US",
                datacoverage: 1,
                id: "CITY:US290011"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Marshall, MO US",
                datacoverage: 1,
                id: "CITY:US290012"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Maryville, MO US",
                datacoverage: 1,
                id: "CITY:US290013"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Moberly, MO US",
                datacoverage: 1,
                id: "CITY:US290014"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Poplar Bluff, MO US",
                datacoverage: 1,
                id: "CITY:US290015"
            },
            {
                mindate: "1892-04-01",
               maxdate: "2019-11-18",
                name: "Rolla, MO US",
                datacoverage: 1,
                id: "CITY:US290016"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Sedalia, MO US",
                datacoverage: 1,
                id: "CITY:US290017"
            },
            {
                mindate: "1894-05-01",
               maxdate: "2019-11-18",
                name: "Sikeston, MO US",
                datacoverage: 1,
                id: "CITY:US290018"
            },
            {
                mindate: "1892-10-09",
               maxdate: "2019-11-18",
                name: "St. Joseph, MO US",
                datacoverage: 1,
                id: "CITY:US290020"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "St. Louis, MO US",
                datacoverage: 1,
                id: "CITY:US290021"
            },
            {
                mindate: "1893-01-02",
               maxdate: "2019-11-18",
                name: "Warrensburg, MO US",
                datacoverage: 1,
                id: "CITY:US290022"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Washington, MO US",
                datacoverage: 1,
                id: "CITY:US290023"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "West Plains, MO US",
                datacoverage: 1,
                id: "CITY:US290024"
            },
            {
                mindate: "1892-04-08",
               maxdate: "2019-11-18",
                name: "Bozeman, MT US",
                datacoverage: 1,
                id: "CITY:US300002"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Great Falls, MT US",
                datacoverage: 1,
                id: "CITY:US300004"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Helena, MT US",
                datacoverage: 1,
                id: "CITY:US300005"
            },
            {
                mindate: "1893-03-04",
               maxdate: "2019-11-18",
                name: "Kalispell, MT US",
                datacoverage: 1,
                id: "CITY:US300006"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Beatrice, NE US",
                datacoverage: 1,
                id: "CITY:US310001"
            },
            {
                mindate: "1893-07-01",
               maxdate: "2019-11-17",
                name: "Columbus, NE US",
                datacoverage: 1,
                id: "CITY:US310002"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Fremont, NE US",
                datacoverage: 1,
                id: "CITY:US310003"
            },
            {
                mindate: "1895-01-01",
               maxdate: "2019-11-18",
                name: "Grand Island, NE US",
                datacoverage: 1,
                id: "CITY:US310004"
            },
            {
                mindate: "1894-11-01",
               maxdate: "2019-11-18",
                name: "Hastings, NE US",
                datacoverage: 1,
                id: "CITY:US310005"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Kearney, NE US",
                datacoverage: 1,
                id: "CITY:US310006"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Lexington, NE US",
                datacoverage: 1,
                id: "CITY:US310007"
            },
            {
                mindate: "1882-01-01",
               maxdate: "2019-11-18",
                name: "Lincoln, NE US",
                datacoverage: 1,
                id: "CITY:US310008"
            },
            {
                mindate: "1893-02-01",
               maxdate: "2019-11-17",
                name: "Norfolk, NE US",
                datacoverage: 1,
                id: "CITY:US310009"
            },
            {
                mindate: "1893-07-01",
               maxdate: "2019-11-18",
                name: "Omaha, NE US",
                datacoverage: 1,
                id: "CITY:US310011"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Scottsbluff, NE US",
                datacoverage: 1,
                id: "CITY:US310012"
            },
            {
                mindate: "1887-12-01",
               maxdate: "2019-11-18",
                name: "Carson City, NV US",
                datacoverage: 1,
                id: "CITY:US320002"
            },
            {
                mindate: "1888-02-01",
               maxdate: "2019-11-18",
                name: "Elko, NV US",
                datacoverage: 1,
                id: "CITY:US320003"
            },
            {
                mindate: "1894-03-07",
               maxdate: "2019-11-18",
                name: "Reno, NV US",
                datacoverage: 1,
                id: "CITY:US320006"
            },
            {
                mindate: "1886-06-01",
               maxdate: "2019-11-18",
                name: "Berlin, NH US",
                datacoverage: 1,
                id: "CITY:US330001"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Claremont, NH US",
                datacoverage: 1,
                id: "CITY:US330002"
            },
            {
                mindate: "1868-01-01",
               maxdate: "2019-11-18",
                name: "Concord, NH US",
                datacoverage: 1,
                id: "CITY:US330003"
            },
            {
                mindate: "1885-05-02",
               maxdate: "2019-11-18",
                name: "Keene, NH US",
                datacoverage: 1,
                id: "CITY:US330004"
            },
            {
                mindate: "1890-01-01",
               maxdate: "2019-11-18",
                name: "Laconia, NH US",
                datacoverage: 1,
                id: "CITY:US330005"
            },
            {
                mindate: "1885-02-01",
               maxdate: "2019-11-18",
                name: "Manchester, NH US",
                datacoverage: 1,
                id: "CITY:US330006"
            },
            {
                mindate: "1885-08-01",
               maxdate: "2019-11-18",
                name: "Nashua, NH US",
                datacoverage: 1,
                id: "CITY:US330007"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Portsmouth, NH US",
                datacoverage: 1,
                id: "CITY:US330008"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Rochester, NH US",
                datacoverage: 1,
                id: "CITY:US330009"
            },
            {
                mindate: "1869-01-01",
               maxdate: "2019-11-18",
                name: "Jersey City, NJ US",
                datacoverage: 1,
                id: "CITY:US340001"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Lakewood, NJ US",
                datacoverage: 1,
                id: "CITY:US340002"
            },
            {
                mindate: "1869-01-01",
               maxdate: "2019-11-18",
                name: "Newark, NJ US",
                datacoverage: 1,
                id: "CITY:US340003"
            },
            {
                mindate: "1873-12-10",
               maxdate: "2019-11-18",
                name: "Pleasantville, NJ US",
                datacoverage: 1,
                id: "CITY:US340004"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Toms River, NJ US",
                datacoverage: 1,
                id: "CITY:US340005"
            },
            {
                mindate: "1865-06-08",
               maxdate: "2019-11-18",
                name: "Trenton, NJ US",
                datacoverage: 1,
                id: "CITY:US340006"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Vineland, NJ US",
                datacoverage: 1,
                id: "CITY:US340007"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Alamogordo, NM US",
                datacoverage: 1,
                id: "CITY:US350001"
            },
            {
                mindate: "1892-12-01",
               maxdate: "2019-11-18",
                name: "Albuquerque, NM US",
                datacoverage: 1,
                id: "CITY:US350002"
            },
            {
                mindate: "1892-10-01",
               maxdate: "2019-11-18",
                name: "Deming, NM US",
                datacoverage: 1,
                id: "CITY:US350005"
            },
            {
                mindate: "1892-12-01",
               maxdate: "2019-11-18",
                name: "Farmington, NM US",
                datacoverage: 1,
                id: "CITY:US350006"
            },
            {
                mindate: "1897-03-01",
               maxdate: "2019-11-18",
                name: "Gallup, NM US",
                datacoverage: 1,
                id: "CITY:US350007"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Las Cruces, NM US",
                datacoverage: 1,
                id: "CITY:US350008"
            },
            {
                mindate: "1894-05-01",
               maxdate: "2019-11-18",
                name: "Roswell, NM US",
                datacoverage: 1,
                id: "CITY:US350009"
            },
            {
                mindate: "1871-11-18",
               maxdate: "2019-11-18",
                name: "Santa Fe, NM US",
                datacoverage: 1,
                id: "CITY:US350010"
            },
            {
                mindate: "1897-02-01",
               maxdate: "2019-11-18",
                name: "Silver City, NM US",
                datacoverage: 1,
                id: "CITY:US350011"
            },
            {
                mindate: "1898-11-01",
               maxdate: "2019-11-18",
                name: "Albany, NY US",
                datacoverage: 1,
                id: "CITY:US360001"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Amsterdam, NY US",
                datacoverage: 1,
                id: "CITY:US360002"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Binghamton, NY US",
                datacoverage: 1,
                id: "CITY:US360003"
            },
            {
                mindate: "1885-08-01",
               maxdate: "2019-11-18",
                name: "Brentwood, NY US",
                datacoverage: 1,
                id: "CITY:US360004"
            },
            {
                mindate: "1869-01-01",
               maxdate: "2019-11-18",
                name: "Brooklyn, NY US",
                datacoverage: 1,
                id: "CITY:US360005"
            },
            {
                mindate: "1871-01-01",
               maxdate: "2019-11-18",
                name: "Buffalo, NY US",
                datacoverage: 1,
                id: "CITY:US360006"
            },
            {
                mindate: "1885-08-01",
               maxdate: "2019-11-18",
                name: "Commack, NY US",
                datacoverage: 1,
                id: "CITY:US360007"
            },
            {
                mindate: "1885-08-01",
               maxdate: "2019-11-18",
                name: "Coram, NY US",
                datacoverage: 1,
                id: "CITY:US360008"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Elmira, NY US",
                datacoverage: 1,
                id: "CITY:US360009"
            },
            {
                mindate: "1890-03-01",
               maxdate: "2019-11-18",
                name: "Hempstead, NY US",
                datacoverage: 1,
                id: "CITY:US360010"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Huntington Station, NY US",
                datacoverage: 1,
                id: "CITY:US360011"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Ithaca, NY US",
                datacoverage: 1,
                id: "CITY:US360012"
            },
            {
                mindate: "1895-11-01",
               maxdate: "2019-11-18",
                name: "Jamestown, NY US",
                datacoverage: 1,
                id: "CITY:US360013"
            },
            {
                mindate: "1893-02-01",
               maxdate: "2019-11-18",
                name: "Kingston, NY US",
                datacoverage: 1,
                id: "CITY:US360014"
            },
            {
                mindate: "1890-04-01",
               maxdate: "2019-11-18",
                name: "Levittown, NY US",
                datacoverage: 1,
                id: "CITY:US360015"
            },
            {
                mindate: "1867-01-01",
               maxdate: "2019-11-18",
                name: "Massena, NY US",
                datacoverage: 1,
                id: "CITY:US360016"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Middletown, NY US",
                datacoverage: 1,
                id: "CITY:US360017"
            },
            {
                mindate: "1899-06-01",
               maxdate: "2019-11-18",
                name: "New City, NY US",
                datacoverage: 1,
                id: "CITY:US360018"
            },
            {
                mindate: "1869-01-01",
               maxdate: "2019-11-18",
                name: "New York, NY US",
                datacoverage: 1,
                id: "CITY:US360019"
            },
            {
                mindate: "1872-10-01",
               maxdate: "2019-11-18",
                name: "Niagara Falls, NY US",
                datacoverage: 1,
                id: "CITY:US360020"
            },
            {
                mindate: "1871-10-01",
               maxdate: "2019-11-18",
                name: "Ogdensburg, NY US",
                datacoverage: 1,
                id: "CITY:US360021"
            },
            {
                mindate: "1893-03-01",
               maxdate: "2019-11-18",
                name: "Oneonta, NY US",
                datacoverage: 1,
                id: "CITY:US360022"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Oswego, NY US",
                datacoverage: 1,
                id: "CITY:US360023"
            },
            {
                mindate: "1898-03-01",
               maxdate: "2019-11-18",
                name: "Plattsburgh, NY US",
                datacoverage: 1,
                id: "CITY:US360024"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Poughkeepsie, NY US",
                datacoverage: 1,
                id: "CITY:US360025"
            },
            {
                mindate: "1895-02-01",
               maxdate: "2019-11-18",
                name: "Saratoga Springs, NY US",
                datacoverage: 1,
                id: "CITY:US360027"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Syracuse, NY US",
                datacoverage: 1,
                id: "CITY:US360028"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Utica, NY US",
                datacoverage: 1,
                id: "CITY:US360029"
            },
            {
                mindate: "1890-04-01",
               maxdate: "2019-11-17",
                name: "Watertown, NY US",
                datacoverage: 1,
                id: "CITY:US360030"
            },
            {
                mindate: "1869-01-01",
               maxdate: "2019-11-18",
                name: "Yonkers, NY US",
                datacoverage: 1,
                id: "CITY:US360031"
            },
            {
                mindate: "1869-03-01",
               maxdate: "2019-11-18",
                name: "Asheville, NC US",
                datacoverage: 1,
                id: "CITY:US370002"
            },
            {
                mindate: "1892-10-01",
               maxdate: "2019-11-18",
                name: "Charlotte, NC US",
                datacoverage: 1,
                id: "CITY:US370005"
            },
            {
                mindate: "1891-01-01",
               maxdate: "2019-11-18",
                name: "Durham, NC US",
                datacoverage: 1,
                id: "CITY:US370006"
            },
            {
                mindate: "1871-11-01",
               maxdate: "2019-11-18",
                name: "Fayetteville, NC US",
                datacoverage: 1,
                id: "CITY:US370008"
            },
            {
                mindate: "1871-11-01",
               maxdate: "2019-11-18",
                name: "Fort Bragg, NC US",
                datacoverage: 1,
                id: "CITY:US370009"
            },
            {
                mindate: "1892-10-01",
               maxdate: "2019-11-18",
                name: "Gastonia, NC US",
                datacoverage: 1,
                id: "CITY:US370010"
            },
            {
                mindate: "1892-04-15",
               maxdate: "2019-11-18",
                name: "Greensboro, NC US",
                datacoverage: 1,
                id: "CITY:US370011"
            },
            {
                mindate: "1875-03-01",
               maxdate: "2019-11-18",
                name: "Greenville, NC US",
                datacoverage: 1,
                id: "CITY:US370012"
            },
            {
                mindate: "1898-06-01",
               maxdate: "2019-11-18",
                name: "Hendersonville, NC US",
                datacoverage: 1,
                id: "CITY:US370013"
            },
            {
                mindate: "1890-09-01",
               maxdate: "2019-11-18",
                name: "New Bern, NC US",
                datacoverage: 1,
                id: "CITY:US370016"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Roanoke Rapids, NC US",
                datacoverage: 1,
                id: "CITY:US370018"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Salisbury, NC US",
                datacoverage: 1,
                id: "CITY:US370020"
            },
            {
                mindate: "1870-12-12",
               maxdate: "2019-11-18",
                name: "Wilmington, NC US",
                datacoverage: 1,
                id: "CITY:US370022"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Winston-Salem, NC US",
                datacoverage: 1,
                id: "CITY:US370023"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Dickinson, ND US",
                datacoverage: 1,
                id: "CITY:US380002"
            },
            {
                mindate: "1900-01-01",
               maxdate: "2019-11-18",
                name: "Fargo, ND US",
                datacoverage: 1,
                id: "CITY:US380003"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Grand Forks, ND US",
                datacoverage: 1,
                id: "CITY:US380004"
            },
            {
                mindate: "1891-07-01",
               maxdate: "2019-11-18",
                name: "Jamestown, ND US",
                datacoverage: 1,
                id: "CITY:US380005"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Akron, OH US",
                datacoverage: 1,
                id: "CITY:US390001"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Ashland, OH US",
                datacoverage: 1,
                id: "CITY:US390002"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-16",
                name: "Ashtabula, OH US",
                datacoverage: 1,
                id: "CITY:US390003"
            },
            {
                mindate: "1893-06-01",
               maxdate: "2019-11-18",
                name: "Bowling Green, OH US",
                datacoverage: 1,
                id: "CITY:US390005"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Cambridge, OH US",
                datacoverage: 1,
                id: "CITY:US390006"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Canton, OH US",
                datacoverage: 1,
                id: "CITY:US390007"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Chillicothe, OH US",
                datacoverage: 1,
                id: "CITY:US390008"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Cincinnati, OH US",
                datacoverage: 1,
                id: "CITY:US390009"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Cleveland, OH US",
                datacoverage: 1,
                id: "CITY:US390010"
            },
            {
                mindate: "1897-04-15",
               maxdate: "2019-11-18",
                name: "Columbus, OH US",
                datacoverage: 1,
                id: "CITY:US390011"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Dayton, OH US",
                datacoverage: 1,
                id: "CITY:US390012"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Defiance, OH US",
                datacoverage: 1,
                id: "CITY:US390013"
            },
            {
                mindate: "1894-09-10",
               maxdate: "2019-11-18",
                name: "Delaware, OH US",
                datacoverage: 1,
                id: "CITY:US390014"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Lima, OH US",
                datacoverage: 1,
                id: "CITY:US390015"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Mansfield, OH US",
                datacoverage: 1,
                id: "CITY:US390016"
            },
            {
                mindate: "1892-12-01",
               maxdate: "2019-11-18",
                name: "Marion, OH US",
                datacoverage: 1,
                id: "CITY:US390017"
            },
            {
                mindate: "1894-07-02",
               maxdate: "2019-11-18",
                name: "Mentor, OH US",
                datacoverage: 1,
                id: "CITY:US390018"
            },
            {
                mindate: "1893-06-01",
               maxdate: "2019-11-18",
                name: "New Philadelphia, OH US",
                datacoverage: 1,
                id: "CITY:US390019"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Newark, OH US",
                datacoverage: 1,
                id: "CITY:US390020"
            },
            {
                mindate: "1893-02-01",
               maxdate: "2019-11-18",
                name: "Portsmouth, OH US",
                datacoverage: 1,
                id: "CITY:US390021"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Salem, OH US",
                datacoverage: 1,
                id: "CITY:US390022"
            },
            {
                mindate: "1893-04-01",
               maxdate: "2019-11-18",
                name: "Sandusky, OH US",
                datacoverage: 1,
                id: "CITY:US390023"
            },
            {
                mindate: "1878-02-01",
               maxdate: "2019-11-18",
                name: "Steubenville, OH US",
                datacoverage: 1,
                id: "CITY:US390024"
            },
            {
                mindate: "1893-02-01",
               maxdate: "2019-11-18",
                name: "Toledo, OH US",
                datacoverage: 1,
                id: "CITY:US390025"
            },
            {
                mindate: "1894-04-01",
               maxdate: "2019-11-18",
                name: "Urbana, OH US",
                datacoverage: 1,
                id: "CITY:US390026"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Wooster, OH US",
                datacoverage: 1,
                id: "CITY:US390027"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Youngstown, OH US",
                datacoverage: 1,
                id: "CITY:US390028"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Zanesville, OH US",
                datacoverage: 1,
                id: "CITY:US390029"
            },
            {
                mindate: "1893-05-15",
               maxdate: "2019-11-18",
                name: "Durant, OK US",
                datacoverage: 1,
                id: "CITY:US400006"
            },
            {
                mindate: "1894-02-01",
               maxdate: "2019-11-18",
                name: "Enid, OK US",
                datacoverage: 1,
                id: "CITY:US400008"
            },
            {
                mindate: "1893-05-19",
               maxdate: "2019-11-17",
                name: "Guymon, OK US",
                datacoverage: 1,
                id: "CITY:US400009"
            },
            {
                mindate: "1870-04-01",
               maxdate: "2019-11-18",
                name: "Lawton, OK US",
                datacoverage: 1,
                id: "CITY:US400010"
            },
            {
                mindate: "1899-04-01",
               maxdate: "2019-11-17",
                name: "McAlester, OK US",
                datacoverage: 1,
                id: "CITY:US400011"
            },
            {
                mindate: "1895-04-01",
               maxdate: "2019-11-17",
                name: "Muskogee, OK US",
                datacoverage: 1,
                id: "CITY:US400012"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Oklahoma City, OK US",
                datacoverage: 1,
                id: "CITY:US400013"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Ponca City, OK US",
                datacoverage: 1,
                id: "CITY:US400015"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Shawnee, OK US",
                datacoverage: 1,
                id: "CITY:US400016"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Stillwater, OK US",
                datacoverage: 1,
                id: "CITY:US400017"
            },
            {
                mindate: "1900-01-01",
               maxdate: "2019-11-18",
                name: "Tahlequah, OK US",
                datacoverage: 1,
                id: "CITY:US400018"
            },
            {
                mindate: "1889-01-01",
               maxdate: "2019-11-18",
                name: "Tulsa, OK US",
                datacoverage: 1,
                id: "CITY:US400019"
            },
            {
                mindate: "1893-02-01",
               maxdate: "2019-11-18",
                name: "Woodward, OK US",
                datacoverage: 1,
                id: "CITY:US400020"
            },
            {
                mindate: "1892-07-01",
               maxdate: "2019-11-18",
                name: "City of The Dalles, OR US",
                datacoverage: 1,
                id: "CITY:US410002"
            },
            {
                mindate: "1897-08-01",
               maxdate: "2019-11-18",
                name: "Coos Bay, OR US",
                datacoverage: 1,
                id: "CITY:US410003"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Corvallis, OR US",
                datacoverage: 1,
                id: "CITY:US410004"
            },
            {
                mindate: "1899-06-01",
               maxdate: "2019-11-18",
                name: "Eugene, OR US",
                datacoverage: 1,
                id: "CITY:US410005"
            },
            {
                mindate: "1892-05-16",
               maxdate: "2019-11-18",
                name: "Grants Pass, OR US",
                datacoverage: 1,
                id: "CITY:US410006"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Hermiston, OR US",
                datacoverage: 1,
                id: "CITY:US410007"
            },
            {
                mindate: "1871-11-19",
               maxdate: "2019-11-18",
                name: "Hillsboro, OR US",
                datacoverage: 1,
                id: "CITY:US410008"
            },
            {
                mindate: "1887-05-11",
               maxdate: "2019-11-18",
                name: "Klamath Falls, OR US",
                datacoverage: 1,
                id: "CITY:US410009"
            },
            {
                mindate: "1892-07-01",
               maxdate: "2019-11-18",
                name: "Medford, OR US",
                datacoverage: 1,
                id: "CITY:US410011"
            },
            {
                mindate: "1892-07-01",
               maxdate: "2019-11-18",
                name: "Ontario, OR US",
                datacoverage: 1,
                id: "CITY:US410012"
            },
            {
                mindate: "1892-09-01",
               maxdate: "2019-11-18",
                name: "Pendleton, OR US",
                datacoverage: 1,
                id: "CITY:US410013"
            },
            {
                mindate: "1856-01-01",
               maxdate: "2019-11-18",
                name: "Portland, OR US",
                datacoverage: 1,
                id: "CITY:US410014"
            },
            {
                mindate: "1899-06-01",
               maxdate: "2019-11-18",
                name: "Roseburg, OR US",
                datacoverage: 1,
                id: "CITY:US410015"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Salem, OR US",
                datacoverage: 1,
                id: "CITY:US410016"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "St. Helens, OR US",
                datacoverage: 1,
                id: "CITY:US410017"
            },
            {
                mindate: "1884-09-01",
               maxdate: "2019-11-18",
                name: "Allentown, PA US",
                datacoverage: 1,
                id: "CITY:US420001"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Altoona, PA US",
                datacoverage: 1,
                id: "CITY:US420002"
            },
            {
                mindate: "1884-09-01",
               maxdate: "2019-11-18",
                name: "Bethlehem, PA US",
                datacoverage: 1,
                id: "CITY:US420003"
            },
            {
                mindate: "1894-01-01",
               maxdate: "2019-11-18",
                name: "Bloomsburg, PA US",
                datacoverage: 1,
                id: "CITY:US420004"
            },
            {
                mindate: "1894-01-01",
               maxdate: "2019-11-18",
                name: "Chambersburg, PA US",
                datacoverage: 1,
                id: "CITY:US420005"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Chester, PA US",
                datacoverage: 1,
                id: "CITY:US420006"
            },
            {
                mindate: "1892-11-01",
               maxdate: "2019-11-18",
                name: "Hanover, PA US",
                datacoverage: 1,
                id: "CITY:US420008"
            },
            {
                mindate: "1849-04-01",
               maxdate: "2019-11-18",
                name: "Harrisburg, PA US",
                datacoverage: 1,
                id: "CITY:US420009"
            },
            {
                mindate: "1893-11-01",
               maxdate: "2019-11-18",
                name: "Hazleton, PA US",
                datacoverage: 1,
                id: "CITY:US420010"
            },
            {
                mindate: "1892-03-01",
               maxdate: "2019-11-18",
                name: "Johnstown, PA US",
                datacoverage: 1,
                id: "CITY:US420011"
            },
            {
                mindate: "1894-01-01",
               maxdate: "2019-11-18",
                name: "Lancaster, PA US",
                datacoverage: 1,
                id: "CITY:US420012"
            },
            {
                mindate: "1894-01-01",
               maxdate: "2019-11-18",
                name: "Lebanon, PA US",
                datacoverage: 1,
                id: "CITY:US420013"
            },
            {
                mindate: "1893-01-14",
               maxdate: "2019-11-18",
                name: "Meadville, PA US",
                datacoverage: 1,
                id: "CITY:US420014"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Philadelphia, PA US",
                datacoverage: 1,
                id: "CITY:US420015"
            },
            {
                mindate: "1891-01-01",
               maxdate: "2019-11-18",
                name: "Pittsburgh, PA US",
                datacoverage: 1,
                id: "CITY:US420016"
            },
            {
                mindate: "1866-08-01",
               maxdate: "2019-11-18",
                name: "Reading, PA US",
                datacoverage: 1,
                id: "CITY:US420017"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Scranton, PA US",
                datacoverage: 1,
                id: "CITY:US420018"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "St. Marys, PA US",
                datacoverage: 1,
                id: "CITY:US420019"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "State College, PA US",
                datacoverage: 1,
                id: "CITY:US420020"
            },
            {
                mindate: "1888-10-01",
               maxdate: "2019-11-18",
                name: "Uniontown, PA US",
                datacoverage: 1,
                id: "CITY:US420021"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Wilkes-Barre, PA US",
                datacoverage: 1,
                id: "CITY:US420022"
            },
            {
                mindate: "1895-02-01",
               maxdate: "2019-11-18",
                name: "Williamsport, PA US",
                datacoverage: 1,
                id: "CITY:US420023"
            },
            {
                mindate: "1894-01-01",
               maxdate: "2019-11-18",
                name: "York, PA US",
                datacoverage: 1,
                id: "CITY:US420024"
            },
            {
                mindate: "1890-01-01",
               maxdate: "2019-11-18",
                name: "Newport, RI US",
                datacoverage: 1,
                id: "CITY:US440001"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Providence, RI US",
                datacoverage: 1,
                id: "CITY:US440002"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Charleston, SC US",
                datacoverage: 1,
                id: "CITY:US450001"
            },
            {
                mindate: "1896-05-01",
               maxdate: "2019-11-18",
                name: "Clemson, SC US",
                datacoverage: 1,
                id: "CITY:US450002"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Columbia, SC US",
                datacoverage: 1,
                id: "CITY:US450003"
            },
            {
                mindate: "1893-05-01",
               maxdate: "2019-11-18",
                name: "Florence, SC US",
                datacoverage: 1,
                id: "CITY:US450004"
            },
            {
                mindate: "1884-04-01",
               maxdate: "2019-11-18",
                name: "Greenville, SC US",
                datacoverage: 1,
                id: "CITY:US450005"
            },
            {
                mindate: "1894-05-01",
               maxdate: "2019-11-18",
                name: "Greenwood, SC US",
                datacoverage: 1,
                id: "CITY:US450006"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Hilton Head Island, SC US",
                datacoverage: 1,
                id: "CITY:US450007"
            },
            {
                mindate: "1898-10-01",
               maxdate: "2019-11-18",
                name: "Orangeburg, SC US",
                datacoverage: 1,
                id: "CITY:US450009"
            },
            {
                mindate: "1899-12-01",
               maxdate: "2019-11-18",
                name: "Rock Hill, SC US",
                datacoverage: 1,
                id: "CITY:US450010"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Sumter, SC US",
                datacoverage: 1,
                id: "CITY:US450012"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Aberdeen, SD US",
                datacoverage: 1,
                id: "CITY:US460001"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Brookings, SD US",
                datacoverage: 1,
                id: "CITY:US460002"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Huron, SD US",
                datacoverage: 1,
                id: "CITY:US460003"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Mitchell, SD US",
                datacoverage: 1,
                id: "CITY:US460004"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Pierre, SD US",
                datacoverage: 1,
                id: "CITY:US460005"
            },
            {
                mindate: "1898-01-01",
               maxdate: "2019-11-18",
                name: "Rapid City, SD US",
                datacoverage: 1,
                id: "CITY:US460006"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Watertown, SD US",
                datacoverage: 1,
                id: "CITY:US460008"
            },
            {
                mindate: "1888-12-01",
               maxdate: "2019-11-18",
                name: "Bristol, TN US",
                datacoverage: 1,
                id: "CITY:US470001"
            },
            {
                mindate: "1879-01-01",
               maxdate: "2019-11-18",
                name: "Chattanooga, TN US",
                datacoverage: 1,
                id: "CITY:US470002"
            },
            {
                mindate: "1890-05-01",
               maxdate: "2019-11-18",
                name: "Clarksville, TN US",
                datacoverage: 1,
                id: "CITY:US470003"
            },
            {
                mindate: "1890-05-01",
               maxdate: "2019-11-18",
                name: "Columbia, TN US",
                datacoverage: 1,
                id: "CITY:US470004"
            },
            {
                mindate: "1891-08-01",
               maxdate: "2019-11-18",
                name: "Jackson, TN US",
                datacoverage: 1,
                id: "CITY:US470007"
            },
            {
                mindate: "1895-09-01",
               maxdate: "2019-11-18",
                name: "Johnson City, TN US",
                datacoverage: 1,
                id: "CITY:US470008"
            },
            {
                mindate: "1896-09-01",
               maxdate: "2019-11-18",
                name: "Knoxville, TN US",
                datacoverage: 1,
                id: "CITY:US470010"
            },
            {
                mindate: "1890-05-01",
               maxdate: "2019-11-18",
                name: "Lebanon, TN US",
                datacoverage: 1,
                id: "CITY:US470011"
            },
            {
                mindate: "1891-08-01",
               maxdate: "2019-11-18",
                name: "McMinnville, TN US",
                datacoverage: 1,
                id: "CITY:US470012"
            },
            {
                mindate: "1893-05-01",
               maxdate: "2019-11-18",
                name: "Memphis, TN US",
                datacoverage: 1,
                id: "CITY:US470013"
            },
            {
                mindate: "1890-05-01",
               maxdate: "2019-11-18",
                name: "Murfreesboro, TN US",
                datacoverage: 1,
                id: "CITY:US470015"
            },
            {
                mindate: "1890-05-01",
               maxdate: "2019-11-18",
                name: "Nashville, TN US",
                datacoverage: 1,
                id: "CITY:US470016"
            },
            {
                mindate: "1891-08-01",
               maxdate: "2019-11-18",
                name: "Union City, TN US",
                datacoverage: 1,
                id: "CITY:US470017"
            },
            {
                mindate: "1894-01-01",
               maxdate: "2019-11-18",
                name: "Arlington, TX US",
                datacoverage: 1,
                id: "CITY:US480003"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Austin, TX US",
                datacoverage: 1,
                id: "CITY:US480005"
            },
            {
                mindate: "1895-08-01",
               maxdate: "2019-11-18",
                name: "Beeville, TX US",
                datacoverage: 1,
                id: "CITY:US480008"
            },
            {
                mindate: "1897-01-01",
               maxdate: "2019-11-18",
                name: "Brenham, TX US",
                datacoverage: 1,
                id: "CITY:US480009"
            },
            {
                mindate: "1882-05-01",
               maxdate: "2019-11-18",
                name: "Bryan, TX US",
                datacoverage: 1,
                id: "CITY:US480011"
            },
            {
                mindate: "1882-05-01",
               maxdate: "2019-11-18",
                name: "College Station, TX US",
                datacoverage: 1,
                id: "CITY:US480012"
            },
            {
                mindate: "1897-08-16",
               maxdate: "2019-11-18",
                name: "Conroe, TX US",
                datacoverage: 1,
                id: "CITY:US480013"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Corpus Christi, TX US",
                datacoverage: 1,
                id: "CITY:US480014"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Corsicana, TX US",
                datacoverage: 1,
                id: "CITY:US480015"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Dallas, TX US",
                datacoverage: 1,
                id: "CITY:US480016"
            },
            {
                mindate: "1891-01-01",
               maxdate: "2019-11-16",
                name: "Eagle Pass, TX US",
                datacoverage: 1,
                id: "CITY:US480019"
            },
            {
                mindate: "1896-03-01",
               maxdate: "2019-11-18",
                name: "El Campo, TX US",
                datacoverage: 1,
                id: "CITY:US480020"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "El Paso, TX US",
                datacoverage: 1,
                id: "CITY:US480021"
            },
            {
                mindate: "1894-01-01",
               maxdate: "2019-11-18",
                name: "Fort Worth, TX US",
                datacoverage: 1,
                id: "CITY:US480023"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Freeport, TX US",
                datacoverage: 1,
                id: "CITY:US480024"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-16",
                name: "Gainesville, TX US",
                datacoverage: 1,
                id: "CITY:US480025"
            },
            {
                mindate: "1897-01-01",
               maxdate: "2019-11-18",
                name: "Galveston, TX US",
                datacoverage: 1,
                id: "CITY:US480026"
            },
            {
                mindate: "1889-01-01",
               maxdate: "2019-11-18",
                name: "Harlingen, TX US",
                datacoverage: 1,
                id: "CITY:US480029"
            },
            {
                mindate: "1883-04-01",
               maxdate: "2019-11-18",
                name: "Houston, TX US",
                datacoverage: 1,
                id: "CITY:US480031"
            },
            {
                mindate: "1894-01-01",
               maxdate: "2019-11-18",
                name: "Irving, TX US",
                datacoverage: 1,
                id: "CITY:US480033"
            },
            {
                mindate: "1897-09-01",
               maxdate: "2019-11-18",
                name: "Jacksonville, TX US",
                datacoverage: 1,
                id: "CITY:US480034"
            },
            {
                mindate: "1897-01-01",
               maxdate: "2019-11-18",
                name: "Kerrville, TX US",
                datacoverage: 1,
                id: "CITY:US480036"
            },
            {
                mindate: "1899-05-01",
               maxdate: "2019-11-18",
                name: "Kingsville, TX US",
                datacoverage: 1,
                id: "CITY:US480038"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Lake Jackson, TX US",
                datacoverage: 1,
                id: "CITY:US480039"
            },
            {
                mindate: "1897-01-01",
               maxdate: "2019-11-18",
                name: "Laredo, TX US",
                datacoverage: 1,
                id: "CITY:US480040"
            },
            {
                mindate: "1889-01-01",
               maxdate: "2019-11-18",
                name: "McAllen, TX US",
                datacoverage: 1,
                id: "CITY:US480044"
            },
            {
                mindate: "1894-04-13",
               maxdate: "2019-11-18",
                name: "Midland, TX US",
                datacoverage: 1,
                id: "CITY:US480045"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "New Braunfels, TX US",
                datacoverage: 1,
                id: "CITY:US480049"
            },
            {
                mindate: "1891-04-01",
               maxdate: "2019-11-18",
                name: "Paris, TX US",
                datacoverage: 1,
                id: "CITY:US480052"
            },
            {
                mindate: "1898-11-10",
               maxdate: "2019-11-18",
                name: "Port Arthur, TX US",
                datacoverage: 1,
                id: "CITY:US480054"
            },
            {
                mindate: "1892-07-01",
               maxdate: "2019-11-17",
                name: "Rio Grande City, TX US",
                datacoverage: 1,
                id: "CITY:US480055"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Round Rock, TX US",
                datacoverage: 1,
                id: "CITY:US480056"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "San Antonio, TX US",
                datacoverage: 1,
                id: "CITY:US480057"
            },
            {
                mindate: "1893-04-01",
               maxdate: "2019-11-18",
                name: "San Marcos, TX US",
                datacoverage: 1,
                id: "CITY:US480058"
            },
            {
                mindate: "1897-05-01",
               maxdate: "2019-11-18",
                name: "Sherman, TX US",
                datacoverage: 1,
                id: "CITY:US480059"
            },
            {
                mindate: "1897-01-01",
               maxdate: "2019-11-18",
                name: "Stephenville, TX US",
                datacoverage: 1,
                id: "CITY:US480060"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Sulphur Springs, TX US",
                datacoverage: 1,
                id: "CITY:US480061"
            },
            {
                mindate: "1897-08-16",
               maxdate: "2019-11-18",
                name: "The Woodlands, TX US",
                datacoverage: 1,
                id: "CITY:US480063"
            },
            {
                mindate: "1895-05-01",
               maxdate: "2019-11-15",
                name: "Vernon, TX US",
                datacoverage: 1,
                id: "CITY:US480066"
            },
            {
                mindate: "1879-05-05",
               maxdate: "2019-11-18",
                name: "Waco, TX US",
                datacoverage: 1,
                id: "CITY:US480068"
            },
            {
                mindate: "1897-05-01",
               maxdate: "2019-11-18",
                name: "Waxahachie, TX US",
                datacoverage: 1,
                id: "CITY:US480069"
            },
            {
                mindate: "1896-02-02",
               maxdate: "2019-11-18",
                name: "Brigham City, UT US",
                datacoverage: 1,
                id: "CITY:US490001"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Logan, UT US",
                datacoverage: 1,
                id: "CITY:US490003"
            },
            {
                mindate: "1899-03-01",
               maxdate: "2019-11-18",
                name: "Ogden, UT US",
                datacoverage: 1,
                id: "CITY:US490004"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "St. George, UT US",
                datacoverage: 1,
                id: "CITY:US490007"
            },
            {
                mindate: "1883-12-01",
               maxdate: "2019-11-18",
                name: "Burlington, VT US",
                datacoverage: 1,
                id: "CITY:US500001"
            },
            {
                mindate: "1887-03-01",
               maxdate: "2019-11-18",
                name: "Montpelier, VT US",
                datacoverage: 1,
                id: "CITY:US500002"
            },
            {
                mindate: "1870-11-01",
               maxdate: "2019-11-18",
                name: "Alexandria, VA US",
                datacoverage: 1,
                id: "CITY:US510001"
            },
            {
                mindate: "1870-11-01",
               maxdate: "2019-11-18",
                name: "Arlington, VA US",
                datacoverage: 1,
                id: "CITY:US510002"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Blacksburg, VA US",
                datacoverage: 1,
                id: "CITY:US510003"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Centreville, VA US",
                datacoverage: 1,
                id: "CITY:US510004"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Charlottesville, VA US",
                datacoverage: 1,
                id: "CITY:US510005"
            },
            {
                mindate: "1891-04-01",
               maxdate: "2019-11-18",
                name: "Danville, VA US",
                datacoverage: 1,
                id: "CITY:US510007"
            },
            {
                mindate: "1893-04-17",
               maxdate: "2019-11-18",
                name: "Fredericksburg, VA US",
                datacoverage: 1,
                id: "CITY:US510008"
            },
            {
                mindate: "1893-03-03",
               maxdate: "2019-11-18",
                name: "Hampton, VA US",
                datacoverage: 1,
                id: "CITY:US510009"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Harrisonburg, VA US",
                datacoverage: 1,
                id: "CITY:US510010"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Lynchburg, VA US",
                datacoverage: 1,
                id: "CITY:US510012"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Newport News, VA US",
                datacoverage: 1,
                id: "CITY:US510013"
            },
            {
                mindate: "1893-03-03",
               maxdate: "2019-11-18",
                name: "Norfolk, VA US",
                datacoverage: 1,
                id: "CITY:US510014"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Richmond, VA US",
                datacoverage: 1,
                id: "CITY:US510015"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Roanoke, VA US",
                datacoverage: 1,
                id: "CITY:US510016"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Winchester, VA US",
                datacoverage: 1,
                id: "CITY:US510018"
            },
            {
                mindate: "1891-07-01",
               maxdate: "2019-11-18",
                name: "Aberdeen, WA US",
                datacoverage: 1,
                id: "CITY:US530001"
            },
            {
                mindate: "1891-07-01",
               maxdate: "2019-11-18",
                name: "Anacortes, WA US",
                datacoverage: 1,
                id: "CITY:US530002"
            },
            {
                mindate: "1894-01-01",
               maxdate: "2019-11-18",
                name: "Bellevue, WA US",
                datacoverage: 1,
                id: "CITY:US530003"
            },
            {
                mindate: "1893-07-01",
               maxdate: "2019-11-18",
                name: "Bellingham, WA US",
                datacoverage: 1,
                id: "CITY:US530004"
            },
            {
                mindate: "1894-01-01",
               maxdate: "2019-11-18",
                name: "Bremerton, WA US",
                datacoverage: 1,
                id: "CITY:US530005"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Centralia, WA US",
                datacoverage: 1,
                id: "CITY:US530006"
            },
            {
                mindate: "1893-02-01",
               maxdate: "2019-11-16",
                name: "Ellensburg, WA US",
                datacoverage: 1,
                id: "CITY:US530007"
            },
            {
                mindate: "1894-02-01",
               maxdate: "2019-11-18",
                name: "Everett, WA US",
                datacoverage: 1,
                id: "CITY:US530008"
            },
            {
                mindate: "1891-08-01",
               maxdate: "2019-11-18",
                name: "Federal Way, WA US",
                datacoverage: 1,
                id: "CITY:US530009"
            },
            {
                mindate: "1894-02-01",
               maxdate: "2019-11-18",
                name: "Kennewick, WA US",
                datacoverage: 1,
                id: "CITY:US530010"
            },
            {
                mindate: "1893-05-01",
               maxdate: "2019-11-18",
                name: "Mount Vernon, WA US",
                datacoverage: 1,
                id: "CITY:US530012"
            },
            {
                mindate: "1891-10-01",
               maxdate: "2019-11-18",
                name: "Oak Harbor, WA US",
                datacoverage: 1,
                id: "CITY:US530013"
            },
            {
                mindate: "1877-07-01",
               maxdate: "2019-11-18",
                name: "Olympia, WA US",
                datacoverage: 1,
                id: "CITY:US530014"
            },
            {
                mindate: "1892-02-01",
               maxdate: "2019-11-18",
                name: "Pullman, WA US",
                datacoverage: 1,
                id: "CITY:US530016"
            },
            {
                mindate: "1894-01-01",
               maxdate: "2019-11-18",
                name: "Redmond, WA US",
                datacoverage: 1,
                id: "CITY:US530017"
            },
            {
                mindate: "1891-08-01",
               maxdate: "2019-11-18",
                name: "Seattle, WA US",
                datacoverage: 1,
                id: "CITY:US530018"
            },
            {
                mindate: "1889-08-01",
               maxdate: "2019-11-18",
                name: "Spokane, WA US",
                datacoverage: 1,
                id: "CITY:US530019"
            },
            {
                mindate: "1894-09-14",
               maxdate: "2019-11-18",
                name: "Sunnyside, WA US",
                datacoverage: 1,
                id: "CITY:US530020"
            },
            {
                mindate: "1891-08-01",
               maxdate: "2019-11-18",
                name: "Tacoma, WA US",
                datacoverage: 1,
                id: "CITY:US530021"
            },
            {
                mindate: "1856-01-01",
               maxdate: "2019-11-18",
                name: "Vancouver, WA US",
                datacoverage: 1,
                id: "CITY:US530022"
            },
            {
                mindate: "1899-04-10",
               maxdate: "2019-11-18",
                name: "Wenatchee, WA US",
                datacoverage: 1,
                id: "CITY:US530024"
            },
            {
                mindate: "1892-03-12",
               maxdate: "2019-11-18",
                name: "Yakima, WA US",
                datacoverage: 1,
                id: "CITY:US530025"
            },
            {
                mindate: "1893-12-01",
               maxdate: "2019-11-18",
                name: "Beckley, WV US",
                datacoverage: 1,
                id: "CITY:US540001"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Bluefield, WV US",
                datacoverage: 1,
                id: "CITY:US540002"
            },
            {
                mindate: "1892-04-01",
               maxdate: "2019-11-18",
                name: "Charleston, WV US",
                datacoverage: 1,
                id: "CITY:US540003"
            },
            {
                mindate: "1873-01-01",
               maxdate: "2019-11-18",
                name: "Fairmont, WV US",
                datacoverage: 1,
                id: "CITY:US540004"
            },
            {
                mindate: "1887-07-01",
               maxdate: "2019-11-18",
                name: "Huntington, WV US",
                datacoverage: 1,
                id: "CITY:US540005"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Martinsburg, WV US",
                datacoverage: 1,
                id: "CITY:US540006"
            },
            {
                mindate: "1873-01-01",
               maxdate: "2019-11-18",
                name: "Morgantown, WV US",
                datacoverage: 1,
                id: "CITY:US540007"
            },
            {
                mindate: "1894-01-01",
               maxdate: "2019-11-18",
                name: "Parkersburg, WV US",
                datacoverage: 1,
                id: "CITY:US540008"
            },
            {
                mindate: "1878-02-01",
               maxdate: "2019-11-18",
                name: "Wheeling, WV US",
                datacoverage: 1,
                id: "CITY:US540009"
            },
            {
                mindate: "1889-01-01",
               maxdate: "2019-11-18",
                name: "Eau Claire, WI US",
                datacoverage: 1,
                id: "CITY:US550001"
            },
            {
                mindate: "1886-09-01",
               maxdate: "2019-11-18",
                name: "Green Bay, WI US",
                datacoverage: 1,
                id: "CITY:US550002"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Janesville, WI US",
                datacoverage: 1,
                id: "CITY:US550003"
            },
            {
                mindate: "1896-05-01",
               maxdate: "2019-11-18",
                name: "Kenosha, WI US",
                datacoverage: 1,
                id: "CITY:US550004"
            },
            {
                mindate: "1883-01-04",
               maxdate: "2019-11-18",
                name: "La Crosse, WI US",
                datacoverage: 1,
                id: "CITY:US550005"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Manitowoc, WI US",
                datacoverage: 1,
                id: "CITY:US550007"
            },
            {
                mindate: "1899-05-01",
               maxdate: "2019-11-18",
                name: "Marinette, WI US",
                datacoverage: 1,
                id: "CITY:US550008"
            },
            {
                mindate: "1871-01-01",
               maxdate: "2019-11-18",
                name: "Milwaukee, WI US",
                datacoverage: 1,
                id: "CITY:US550009"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Oshkosh, WI US",
                datacoverage: 1,
                id: "CITY:US550010"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "Racine, WI US",
                datacoverage: 1,
                id: "CITY:US550011"
            },
            {
                mindate: "1893-01-01",
               maxdate: "2019-11-18",
                name: "River Falls, WI US",
                datacoverage: 1,
                id: "CITY:US550012"
            },
            {
                mindate: "1899-09-01",
               maxdate: "2019-11-18",
                name: "Sheboygan, WI US",
                datacoverage: 1,
                id: "CITY:US550013"
            },
            {
                mindate: "1895-04-01",
               maxdate: "2019-11-18",
                name: "Wausau, WI US",
                datacoverage: 1,
                id: "CITY:US550014"
            },
            {
                mindate: "1890-12-03",
               maxdate: "2019-11-17",
                name: "Evanston, WY US",
                datacoverage: 1,
                id: "CITY:US560003"
            },
            {
                mindate: "1892-01-01",
               maxdate: "2019-11-18",
                name: "Laramie, WY US",
                datacoverage: 1,
                id: "CITY:US560005"
            },
            {
                mindate: "1897-04-01",
               maxdate: "2019-11-18",
                name: "Rock Springs, WY US",
                datacoverage: 1,
                id: "CITY:US560006"
            },
            {
                mindate: "1893-02-01",
               maxdate: "2019-11-18",
                name: "Sheridan, WY US",
                datacoverage: 1,
                id: "CITY:US560007"
            },
            {
                mindate: "1881-04-01",
               maxdate: "2019-11-16",
                name: "Fergana, UZ",
                datacoverage: 0.9544,
                id: "CITY:UZ000004"
            },
            {
                mindate: "1881-01-01",
               maxdate: "2019-11-16",
                name: "Tashkent, UZ",
                datacoverage: 1,
                id: "CITY:UZ000011"
            }
        ]
    };

export class MockLocationsService {
    constructor() { }
  
    getData(): Observable<Location[]> {
      return of(locations.results);
    }
}