const convertTime = (time) => {
  const dateArray = new Date(time).toDateString().split(" ");
  return `${dateArray[2]} ${dateArray[1]} ${dateArray[3]}`;
};

export default convertTime;
