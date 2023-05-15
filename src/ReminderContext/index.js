import React, { createContext, useState } from 'react';

export const ReminderContext = createContext();

export const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);

  const addReminder = (reminder) => {
    setReminders([...reminders, reminder]);
  };

  return (
    <ReminderContext.Provider value={{ reminders, addReminder }}>
      {children}
    </ReminderContext.Provider>
  );
};