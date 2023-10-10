import { Price } from '@prisma/client';

const PriceComponent = ({ price }: { price: Price }) => {
  const renderPrice = () => {
    if (price === Price.CHEAP) {
      return (
        <>
          <span>$$</span>
          <span className='text-gray-400'>$$</span>
        </>
      );
    } else if (price === Price.REGULAR) {
      return (
        <>
          <span>$$$</span>
          <span className='text-gray-400'>$</span>
        </>
      );
    } else {
      return (
        <>
          <span>$$$$</span>
        </>
      );
    }
  };
  return <p className='mr-3  flex'>{renderPrice()}</p>;
};

export default PriceComponent;
