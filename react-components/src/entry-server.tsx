// import React from 'react';
// import { renderToPipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server';
// import { Provider } from 'react-redux';
// import { StaticRouter } from 'react-router-dom/server';
// import { AppContextProvider } from './context/app-context';
// import { AppRoutes } from './AppRoutes';
// import { store } from './store/store';

// export function render(url: string, opts: RenderToPipeableStreamOptions) {
//   const stream = renderToPipeableStream(
//     <React.StrictMode>
//       <Provider store={store}>
//         <AppContextProvider>
//           <StaticRouter location={url}>
//             <AppRoutes />
//           </StaticRouter>
//         </AppContextProvider>
//       </Provider>
//     </React.StrictMode>,
//     opts
//   );
//   return stream;
// }

// export type Render = typeof render;
