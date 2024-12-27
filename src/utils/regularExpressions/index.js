export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
export const MOBILE_REGEX = /^[6-9]\d{9}$/
export const NAME_WITH_CHARACTERS_REGEX = /^[A-Za-z0-9&\s.]+$/
export const COMPANY_NAME_REGEX = /^[A-Za-z0-9&\s.]+$/
export const ADDRESS_REGEX = /^[a-zA-Z0-9\s.,-/]+$/
export const PINCODE_REGEX = /^[1-9][0-9]{5}$/
export const AMOUNTS_REGEX = /^\d+$/
export const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/
export const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/
export const UPIID_REGEX = /[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/
export const ACCOUNTNUMBER_REGEX = /^[0-9]{10,16}$/
export const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/
export const CIN_NO_REGEX = /^[A-Z][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/
export const COMPANY_WEBSITE_REGEX = /^(https?:\/\/)?(www\.)?([A-Za-z0-9.-]+\.[A-Za-z]{2,})(\/[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/
export const ALPHA_NUMERIC_REGEX = /^[A-Za-z0-9 ]*$/
export const NUMERIC_DECIMAL_REGEX = /^\d+(\.\d+)?$/
export const DRIVER_LICENSE = /^[A-Za-z0-9]{6,10}$/
export const FLOORS_REGEX = /^[0-9a-zA-Z- ]+$/
export const INSURANCE_PERCENTAGE_REGEX = /^[0-9]+(\.[0-9]+)?$/