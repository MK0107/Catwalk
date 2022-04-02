export const REQUIRED_FIELD = "This field is required";
export const INVALID_EMAIL = 'Please enter a valid email';
export const REVIEW_LENGTH = 'Your review must be longer than 50 characters';

import { validate as validateEmail } from "email-validator";

export const validators = {
  EMPTY: field => !field && REQUIRED_FIELD,
  INVALID_EMAIL: email => !validateEmail(email) && INVALID_EMAIL,
  REVIEW_LENGTH: field => field.length < 50 && REVIEW_LENGTH
};

