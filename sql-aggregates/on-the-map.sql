select count(*) as "numberOfCities",
       "countries"."name" as "country"
from "cities"
join "countries" using ("countryId")
group by "countries"."countryId";
