import { createContext } from "react";

const LibraryContext = createContext();

export default LibraryContext;

// import React, { createContext } from "react";
// export const LibraryContext = createContext();

// const LibraryProvider = () => {
//     return (
//         <LibraryContext.Provider value="">

//         </LibraryContext.Provider>
//     );
// };

// export default LibraryProvider;

// The consumer
// export const LibraryConsumer = ({children}) => {
//     return (
//         <LibraryContext.Consumer>
//             {context =>
//                  {

//                  }
//             }
//         </LibraryContext>
//
//     )
// }
