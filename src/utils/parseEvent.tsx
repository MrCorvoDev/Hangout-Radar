import {ClassificationType, EventType, ImageType} from '../types/ticketmaster';

const findImage = (images: ImageType[], ratio: string, width: number) => {
   const bestImage = images.find(
      image => image.ratio === ratio && image.width >= width,
   );
   if (bestImage) return bestImage;

   const widthImage = images.find(image => image.width >= width);
   if (widthImage) return widthImage;

   const ratioImage = images.find(image => image.ratio === ratio);
   if (ratioImage) return ratioImage;

   return images[0];
};
const getGenres = (classification: ClassificationType) => {
   const classificationsKeys = Object.keys(
      classification,
   ) as (keyof ClassificationType)[];

   return [
      ...new Set(
         classificationsKeys
            .filter(key => key.match(/genre|subGenre|segment/g))
            .map(key => {
               const item = classification[key];

               if (
                  item &&
                  typeof item === 'object' &&
                  'name' in item &&
                  item.name !== 'Undefined'
               ) {
                  return item.name;
               }

               return '';
            }),
      ),
   ];
};
function formatDate(dateString: string) {
   const [year, month, day] = dateString.split('-').map(Number);
   const date = new Date(year, month - 1, day);

   return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
   });
}
const PLACEHOLDER_IMAGE: ImageType = {
   ratio: '16_9',
   url: 'https://placehold.co/600x400',
   width: 600,
   height: 400,
   fallback: false,
};

const parseEvent = (event: EventType) => {
   const image = event.images
      ? findImage(event.images, '16_9', 500)
      : PLACEHOLDER_IMAGE;
   const genres = event.classifications?.[0]
      ? getGenres(event.classifications[0])
      : [];
   const date = event.dates?.start?.localDate
      ? formatDate(event.dates.start.localDate)
      : 'Unknown Date';
   const city = event._embedded?.venues[0]?.city?.name ?? 'Unknown City';

   return {
      id: event.id,
      name: event.name,
      image,
      genres,
      date,
      city,
   };
};

export default parseEvent;
