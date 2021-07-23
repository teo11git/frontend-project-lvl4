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
            if (res.status === 'ok') resolve(res.data);
          });
      });
    };
  
  const createNewChannel = () => {
    return new Promise((resolve, rejected) => {
      io.emit(
        'newChannel',
        channel,
        (res) => {
          if (res.status === 'ok') resolve(res.data);
        }
      );
    });
  };

  const renameChannel = () => {
    return new Promise((resolve, rejected) => {
      io.emit(
        'renameChannel',
        data /* id, newName */,
        (res) => {
          if (res.status === 'ok') resolve(res.data);
        }
      );
    });
  };

  const removeChannel = () => {
    return new Promise(resolve, rejected) => {
      io.emit(
        'remiveChannel',
        data /* id */,
        (res) => {
          if (res.status === 'ok') resolve(res.data);
        }
      )
    }
  };

  return { sendNewMessage };
};

export const implementApi = (io) => {
  console.log('Start to create Api');
  return createApi(io);
};
