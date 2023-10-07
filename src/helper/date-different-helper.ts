export function dateDiff(deadLineTime: number, deliveryTime: number) {
  const date1 = new Date(deadLineTime);
  const date2 = new Date(deliveryTime);

  const day1 = date1.getDate();
  const day2 = date2.getDate();
  let month1 = date1.getMonth() + 1;
  let month2 = date2.getMonth() + 1;
  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();

  if (month1 >= 1 && month1 <= 6) {
    month1 *= 31;
  }
  if (month1 >= 7 && month1 <= 12) {
    month1 = (month1 - 6) * 30;
    month1 += 6 * 31;
  }
  if (month2 >= 1 && month2 <= 6) {
    month2 *= 31;
  }
  if (month2 >= 7 && month2 <= 12) {
    month2 = (month2 - 6) * 30;
    month2 += 6 * 31;
  }

  const resday = day1 - day2;
  const resmonth = month1 - month2;
  const resyear = (year1 - year2) * 365;
  const res = resyear + resmonth + resday;
  if (res < 0) {
    return false;
  }
  return true;
}
