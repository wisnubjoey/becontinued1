import { getHotelById } from "@/actions/getHotelById";
import AddHotelForm from "@/components/hotel/AddHotelForm";
import { auth } from "@clerk/nextjs/server";

interface HotelPageProps {
  params: {
    hotelId: string;
  };
}

const createHotel = async ({ params }: HotelPageProps) => {
  const hotel = await getHotelById(params.hotelId);
  const { userId } = auth();

  if (!userId)
    return (
      <div>
        <h1>Not Authenticated</h1>
      </div>
    );

  if (hotel && hotel.userId === userId)
    return (
      <div>
        <h1>Access Denied</h1>
      </div>
    );

  return (
    <>
      <AddHotelForm hotel={hotel} />
    </>
  );
};

export default createHotel;
