import { createContext, FC, useCallback, useState } from 'react';
import Popup from '../components/Popup';

type TState = {
  message: null | string;
  onConfirm: null | (() => void);
};

type TOpenPopup = (args: TState) => void;

type TContext = TOpenPopup;

export const PopupContext = createContext<TContext>(null!);

export const PopupProvider: FC = ({ children }) => {
  const [message, setMessage] = useState<TState['message']>(null);
  const [onConfirm, setOnConfirm] = useState<TState['onConfirm']>(null);

  const openPopup: TOpenPopup = ({ message, onConfirm }) => {
    setMessage(message);
    setOnConfirm(onConfirm);
  };

  const closePopup = () => {
    setMessage(null);
    setOnConfirm(null);
  };

  return (
    <PopupContext.Provider value={openPopup}>
      {message && onConfirm && (
        <Popup message={message} confirm={onConfirm} close={closePopup} />
      )}
      {children}
    </PopupContext.Provider>
  );
};
