type SetFunc = (value: string) => void;

export const enterValueSlowly = (
  setValueFunc: SetFunc,
  value: string,
  delay = 100
) => {
  [...value].forEach((_, index) => {
    setTimeout(() => {
      setValueFunc(value.substring(0, index + 1));
    }, index * delay);
  });
};
