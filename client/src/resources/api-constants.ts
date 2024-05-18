import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';
export const api = axios.create({ baseURL: baseUrl, withCredentials: true });
export const getData = (userId: number): string => {
  return baseUrl + '/data/' + userId;
};
export const sendOauth2Code = (): string => {
  return baseUrl + '/users/oauth2callback/';
};
export const createAnonymousUser = (): string => {
  return baseUrl + '/users';
};
export const createBoardApi = (): string => {
  return baseUrl + '/board';
};
