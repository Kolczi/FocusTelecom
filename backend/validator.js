module.exports = {
  isPhoneNumber: (number) => {
    if (number.length != 9) return false;
    for (let i = 0; i < number.length; i++) {
      const element = number[i];
      if (!(element <= "9" && element >= "0")) {
        return false;
      }
    }
    return true;
  },
};
