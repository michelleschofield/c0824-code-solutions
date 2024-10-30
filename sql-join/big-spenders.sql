select "payments"."amount",
       "c"."firstName",
       "c"."lastName"
from   "payments"
join   "customers" as "c" using ("customerId")
order by "amount" desc
limit 10;
