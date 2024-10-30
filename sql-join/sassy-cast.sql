select "actors"."firstName",
       "actors"."lastName"
  from "films"
  join "castMembers" using ("filmId")
  join "actors" using ("actorId")
 where "title" = 'Jersey Sassy'
