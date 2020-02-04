/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const APP_KEY = 'app';

export const LOAD_LIBRARY = 'web-app/App/LOAD_LIBRARY';
export const LOAD_LIBRARY_SUCCESS = 'web-app/App/LOAD_LIBRARY_SUCCESS';
export const LOAD_LIBRARY_FAILURE = 'web-app/App/LOAD_LIBRARY_FAILURE';
