export default function inBillion(money:number) {
    const inBillions = Math.round(money / 1000);
    return inBillions;
  }
  