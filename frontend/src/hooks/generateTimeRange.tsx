type TTime = {
    startTime: string,
    endTime: string,
}
const generateTimeRange = (startTime: string,endTime: string) => {
    const timeArray = [];
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    // Loop to push times into the array at 1-hour intervals
    while (start <= end) {
      const hours = start.getHours().toString().padStart(2, "0");
      const minutes = start.getMinutes().toString().padStart(2, "0");
      timeArray.push(`${hours}:${minutes}`);

      // Add 1 hour
      start.setHours(start.getHours() + 1);
    }
    console.log(timeArray);
    return timeArray;
};

export default generateTimeRange;