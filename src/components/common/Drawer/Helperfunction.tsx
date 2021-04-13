export const isMobileValidNumber = (mobileNumber: any) => {
    if (mobileNumber.length > 10) {
        return false;
    }
    mobileNumber = parseInt(mobileNumber, 10);
    const mob = /^\d{10}$/;
    return mob.test(mobileNumber);
};