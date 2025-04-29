import { Carousel } from "@material-tailwind/react";
import DayCard from "./DayCard"; // Adjust the path if needed

function DayCarousel({ data }) {
  return (
    <Carousel
      className="rounded-xl"
      autoplay={false}
      loop={false}
      navigation={true}
    >
      {data.map((dayData, index) => (
        <div key={index} className="flex justify-center">
          <DayCard
            dayName={dayData.dayName}
            userName={dayData.userName}
            tasks={dayData.tasks}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default DayCarousel;
