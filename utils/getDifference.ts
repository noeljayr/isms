type dataTyeps = {
  value: number;
  differenceInPercentage: number | null;
  year: string;
};

export const getDifference = (
  currentYear: dataTyeps | undefined,
  prevYear: dataTyeps | undefined
) => {
  let difference = "stale";
  if (currentYear && currentYear.differenceInPercentage) {
    if (currentYear?.differenceInPercentage > 0) {
      difference = "growth";
    } else if (currentYear?.differenceInPercentage < 0) {
      difference = "decline";
    } else {
      difference = "stale";
    }
  }

  return difference;
};
