import { useContext, useState } from 'react';
import APIContext from '../Contexts/APIContext.js';

/*
 const message = {
  id(added in server), autor, text, channelId
 } 
 */
export const useApi = () => useContext(APIContext);

const createApi = (io) => {
    const sendNewMessage = (message) => {
      return new Promise((resolve, rejected) => {
        io.emit(
          'newMessage',
          message,
          (res) => {
            if (res.status === 'ok') resolve(res);
          });
      });
    };
  return { sendNewMessage };
};

export const implementApi = (io) => {
  console.log('Start to create Api');
  return createApi(io);
};
