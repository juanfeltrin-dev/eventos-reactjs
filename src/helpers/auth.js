import { Redirect } from "react-router-dom";
import React from "react";

export const TOKEN_KEY = "access_token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const lougout = () => {
  localStorage.removeItem(TOKEN_KEY);
  return <Redirect to="/admin/login" />
}