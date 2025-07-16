type TransitionOptions = {
  delay?: number;
  duration?: number;
  ease?: [number, number, number, number];
};

export const motionTransition = (options: TransitionOptions = {}) => {
  return {
    ease: [0.25, 0.1, 0.25, 1],
    duration: 0.5,
    ...options,
  };
};



export const teacherId = "68346f1d072bff8578362b6b";