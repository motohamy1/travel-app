import { useLocation, Link } from 'react-router'; 
import { ChipListComponent, ChipsDirective, ChipDirective } from '@syncfusion/ej2-react-buttons';
import { cn, getFirstWord } from '~/lib/utils';

interface TripCardProps {
  id: string;
  name: string;
  imageUrls: string;
  location: string; // This is your custom prop for the trip's location
  tags: string[];
  price: number;
}

const TripCard = ({ id, name, imageUrls, location: tripLocation, tags, price }
  : TripCardProps) => {
  const reactRouterLocation = useLocation();


  const currentPath = reactRouterLocation ? reactRouterLocation.pathname : '/';

  return (
    <article className="trip-card">
      <Link to={`/admin/trips/${id}`} className='trip-card'> 
        <img src={imageUrls} alt={name} />
        <div className="trip-card-pill">${price.toFixed(2)}</div>
        <article>
          <h2>{name}</h2>
          <figure>
            <img src="/assets/icons/location-mark.svg" alt="location" className="size-4" />
            <figcaption>{tripLocation}</figcaption>
          </figure>
        </article>
        <div className='mt-5 pl=[18px] pr-3.5 pb-5'>
          <div className="chip-list" id='travel-chip'></div>
          <ChipListComponent>
            <ChipsDirective>
              {tags.map((tag, index)=>(
                <ChipDirective
                  key={index}
                  text={getFirstWord(tag)}
                  cssClass={cn(index===1?'!bg-pink-50 !text-pink-500'
                    : '!bg-success-50  !text-success-700')}
                />
              ))}
            </ChipsDirective>
          </ChipListComponent>
        </div>
        <article className='tripCard-pill'>{price}</article>
      </Link>
    </article>
  );
};

export default TripCard;