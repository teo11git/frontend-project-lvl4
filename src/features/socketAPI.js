import { useContext, useState } from 'react';
import APIContext from '../Contexts/APIContext.js';

export const useApi = () => useContext(APIContext);

const createApi = (io) => {
  const makeRequestWithSocket = (command, data) => {
    console.log(`try to send ${command}`);
    return new Promise((resolve, rejected) => {
      io.emit(
        command,
        data,
        (res) => {
          if (res.status === 'ok') resolve(res.data);
        }
      );
    });
  };

  const sendNewMessage = (message) =>
    makeRequestWithSocket('newMessage', message);
  const createNewChannel = (channel) =>
    makeRequestWithSocket('newChannel', channel);
  const renameChannel = (channel) =>
    makeRequestWithSocket('renameChannel', channel);
  const removeChannel = (data) =>
    makeRequestWithSocket('removeChannel', data);

  return { 
    sendNewMessage,
    createNewChannel,
    renameChannel,
    removeChannel,
  };
};


export const implementApi = (io) => {
  return createApi(io);
};

// i want share this object
export let myApi = {};

export const initApi = (io) => myApi = createApi(io);
